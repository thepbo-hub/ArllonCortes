const { chromium } = require('/root/.bun/install/global/node_modules/playwright-core');
const fs = require('node:fs');

async function main() {
  console.log('Launching browser with --disable-web-security to fetch video directly in page context...');
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/ms-playwright/chromium-1248/chrome-linux64/chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();

  console.log('Navigating to https://yourimageshare.com/ib/CufIM3MjZf ...');
  await page.goto('https://yourimageshare.com/ib/CufIM3MjZf', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  console.log('Waiting for video element readyState >= 3...');
  await page.waitForFunction(() => {
    const v = document.querySelector('video');
    return v && v.readyState >= 3;
  }, { timeout: 20000 });

  console.log('Video is ready in page! Trying fetch() with CORS disabled...');
  const fetchResult = await page.evaluate(async () => {
    const v = document.querySelector('video');
    const url = v.currentSrc || v.src;
    try {
      const res = await fetch(url, {
        headers: {
          'Range': 'bytes=0-'
        }
      });
      console.log('Fetch response status:', res.status);
      const arrayBuffer = await res.arrayBuffer();
      // Convert to base64
      let binary = '';
      const bytes = new Uint8Array(arrayBuffer);
      const len = bytes.byteLength;
      const chunkSize = 0x8000;
      for (let i = 0; i < len; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
      }
      return { success: true, base64: btoa(binary), size: len };
    } catch (e) {
      return { success: false, error: e.message };
    }
  });

  console.log('Fetch result:', fetchResult.success, fetchResult.size || fetchResult.error);

  if (fetchResult.success && fetchResult.size > 10000) {
    const buf = Buffer.from(fetchResult.base64, 'base64');
    fs.writeFileSync('public/videos/logo-arllon.mp4', buf);
    console.log(`SUCCESSFULLY SAVED ORIGINAL MP4! Size: ${buf.length} bytes`);
  } else {
    // Fallback: If fetch inside page was blocked, use MediaRecorder on video.captureStream()
    console.log('Attempting MediaRecorder stream capture fallback...');
    const recordedBase64 = await page.evaluate(() => {
      return new Promise(async (resolve, reject) => {
        try {
          const v = document.querySelector('video');
          v.currentTime = 0;
          v.muted = true;
          
          const stream = v.captureStream ? v.captureStream(30) : v.mozCaptureStream(30);
          const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
            ? 'video/webm;codecs=vp9'
            : (MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : 'video/webm');
          
          const recorder = new MediaRecorder(stream, { mimeType: mime });
          const chunks = [];
          recorder.ondataavailable = e => { if (e.data && e.data.size > 0) chunks.push(e.data); };
          recorder.onstop = async () => {
            const blob = new Blob(chunks, { type: mime });
            const reader = new FileReader();
            reader.onloadend = () => resolve({ mime, data: reader.result });
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          };

          recorder.start();
          await v.play();
          
          v.onended = () => {
            recorder.stop();
          };
          
          setTimeout(() => {
            if (recorder.state === 'recording') {
              recorder.stop();
            }
          }, (v.duration || 8.5) * 1000 + 1000);
        } catch (err) {
          reject(err);
        }
      });
    });

    if (recordedBase64 && recordedBase64.data) {
      const b64 = recordedBase64.data.split(',')[1];
      const buf = Buffer.from(b64, 'base64');
      console.log(`MediaRecorder captured: ${buf.length} bytes, format: ${recordedBase64.mime}`);
      fs.writeFileSync('public/videos/logo-arllon-recorded.webm', buf);
    }
  }

  await browser.close();
  console.log('Finished. logo-arllon.mp4 exists:', fs.existsSync('public/videos/logo-arllon.mp4'));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
