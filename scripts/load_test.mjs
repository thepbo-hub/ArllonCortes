import http from 'node:http';

const BASE_URL = 'http://localhost:3000';

async function makeRequest(path = '/', headers = {}) {
  const start = performance.now();
  return new Promise((resolve) => {
    const req = http.get(`${BASE_URL}${path}`, { headers }, (res) => {
      let bytes = 0;
      res.on('data', (chunk) => {
        bytes += chunk.length;
      });
      res.on('end', () => {
        const durationMs = performance.now() - start;
        resolve({
          statusCode: res.statusCode,
          durationMs,
          bytes,
          success: res.statusCode >= 200 && res.statusCode < 400,
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        statusCode: 0,
        durationMs: performance.now() - start,
        bytes: 0,
        success: false,
        error: err.message,
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        statusCode: 408,
        durationMs: 5000,
        bytes: 0,
        success: false,
        error: 'Timeout',
      });
    });
  });
}

async function runScenario(name, concurrency, totalRequests, path = '/', headers = {}) {
  console.log(`\n========================================`);
  console.log(`CENÁRIO: ${name}`);
  console.log(`Usuários simultâneos (concorrência): ${concurrency}`);
  console.log(`Total de requisições: ${totalRequests}`);
  console.log(`Endpoint: ${path}`);
  console.log(`========================================`);

  const results = [];
  let inFlight = 0;
  let completed = 0;
  let index = 0;

  const tStart = performance.now();

  await new Promise((resolve) => {
    function launchNext() {
      if (completed >= totalRequests) {
        resolve();
        return;
      }

      while (inFlight < concurrency && index < totalRequests) {
        index++;
        inFlight++;
        makeRequest(path, headers).then((res) => {
          inFlight--;
          completed++;
          results.push(res);
          launchNext();
        });
      }
    }

    launchNext();
  });

  const totalTimeSeconds = (performance.now() - tStart) / 1000;
  const successful = results.filter((r) => r.success).length;
  const failed = results.length - successful;
  const durations = results.map((r) => r.durationMs).sort((a, b) => a - b);

  const p50 = durations[Math.floor(durations.length * 0.5)] || 0;
  const p90 = durations[Math.floor(durations.length * 0.9)] || 0;
  const p99 = durations[Math.floor(durations.length * 0.99)] || 0;
  const avg = durations.reduce((a, b) => a + b, 0) / (durations.length || 1);
  const rps = (results.length / totalTimeSeconds).toFixed(1);

  console.log(`Resultado:`);
  console.log(`- Requisições concluídas: ${results.length}`);
  console.log(`- Sucesso (2xx/3xx): ${successful} (${((successful / results.length) * 100).toFixed(1)}%)`);
  console.log(`- Falhas/Erros: ${failed}`);
  console.log(`- Taxa de transferência: ${rps} req/s`);
  console.log(`- Latência Média: ${avg.toFixed(2)} ms`);
  console.log(`- Latência p50 (Mediana): ${p50.toFixed(2)} ms`);
  console.log(`- Latência p90: ${p90.toFixed(2)} ms`);
  console.log(`- Latência p99: ${p99.toFixed(2)} ms`);
}

async function main() {
  console.log('Iniciando Bateria Técnica de Testes de Carga e Concorrência...');
  
  // Teste 1: 10 usuários simultâneos no HTML
  await runScenario('10 Usuários Simultâneos (Carga Baixa)', 10, 100, '/');

  // Teste 2: 25 usuários simultâneos
  await runScenario('25 Usuários Simultâneos (Carga Média)', 25, 250, '/');

  // Teste 3: 50 usuários simultâneos
  await runScenario('50 Usuários Simultâneos (Carga Alta)', 50, 500, '/');

  // Teste 4: 100 usuários simultâneos (Pico de Acesso)
  await runScenario('100 Usuários Simultâneos (Pico de Acesso)', 100, 1000, '/');

  // Teste 5: 50 requisições simultâneas de streaming de vídeo com HTTP Range (Byte-range request)
  await runScenario(
    '50 Requisições Simultâneas de Streaming de Vídeo (HTTP Range)',
    50,
    250,
    '/videos/logo-arllon.mp4',
    { Range: 'bytes=0-65535' }
  );

  console.log('\nTodos os cenários de carga foram concluídos com sucesso!');
}

main().catch(console.error);
