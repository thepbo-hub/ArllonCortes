const { chromium } = require('/root/.bun/install/global/node_modules/playwright-core');
const fs = require('node:fs');

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/ms-playwright/chromium-1248/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(`
    <html>
      <body style="margin:0;background:#020812;">
        <video id="v" src="http://localhost:3000/videos/logo-arllon.mp4" muted playsinline></video>
      </body>
    </html>
  `);

  await page.waitForFunction(() => {
    const v = document.getElementById('v');
    return v && v.readyState >= 2;
  }, { timeout: 10000 });

  const videoElement = await page.$('#v');
  const posterBuffer = await videoElement.screenshot({ type: 'jpeg', quality: 90 });
  fs.writeFileSync('public/videos/logo-arllon-poster.jpg', posterBuffer);
  console.log('Poster saved successfully! Size:', posterBuffer.length);

  await browser.close();
}

main().catch(err => {
  console.error('Poster generation notice:', err.message);
});
