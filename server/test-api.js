const http = require('http');
const app = require('./app');

const runTests = async () => {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`[Test Runner] Test server listening on ${baseUrl}`);

  let passed = 0;
  let total = 0;

  const assert = (condition, testName) => {
    total++;
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
    }
  };

  try {
    // 1. Health check test
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    assert(
      healthRes.status === 200 && healthData.success === true && healthData.message.includes('StudyZen API is running'),
      'GET /api/health returns 200 and success message'
    );

    // 2. Auth register validation test (missing fields)
    const emptyRegRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const emptyRegData = await emptyRegRes.json();
    assert(
      emptyRegRes.status === 400 && emptyRegData.success === false,
      'POST /api/auth/register rejects empty body with 400'
    );

    // 3. Auth login validation test (missing fields)
    const emptyLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const emptyLoginData = await emptyLoginRes.json();
    assert(
      emptyLoginRes.status === 400 && emptyLoginData.success === false,
      'POST /api/auth/login rejects empty credentials with 400'
    );

    // 4. Protected route test without token
    const noTokenRes = await fetch(`${baseUrl}/api/auth/me`);
    const noTokenData = await noTokenRes.json();
    assert(
      noTokenRes.status === 401 && noTokenData.success === false,
      'GET /api/auth/me rejects request without Bearer token with 401'
    );

    // 5. Protected route test with invalid token
    const badTokenRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: 'Bearer invalid_bogus_jwt_token' },
    });
    const badTokenData = await badTokenRes.json();
    assert(
      badTokenRes.status === 401 && badTokenData.success === false,
      'GET /api/auth/me rejects invalid token with 401'
    );

    // 6. 404 Route handling
    const notFoundRes = await fetch(`${baseUrl}/api/non-existent-endpoint`);
    const notFoundData = await notFoundRes.json();
    assert(
      notFoundRes.status === 404 && notFoundData.success === false,
      'Non-existent route returns 404 JSON error'
    );

    // 7. Tasks GET without token
    const tasksNoAuthRes = await fetch(`${baseUrl}/api/tasks`);
    assert(
      tasksNoAuthRes.status === 401,
      'GET /api/tasks rejects unauthenticated request with 401'
    );

    // 8. Tasks POST without token
    const tasksPostNoAuthRes = await fetch(`${baseUrl}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Unauthorized Task' }),
    });
    assert(
      tasksPostNoAuthRes.status === 401,
      'POST /api/tasks rejects unauthenticated request with 401'
    );

    // 9. Tasks Stats GET without token
    const statsNoAuthRes = await fetch(`${baseUrl}/api/tasks/stats`);
    assert(
      statsNoAuthRes.status === 401,
      'GET /api/tasks/stats rejects unauthenticated request with 401'
    );

    // 10. Single Task GET without token
    const taskGetNoAuthRes = await fetch(`${baseUrl}/api/tasks/64f0a0000000000000000000`);
    assert(
      taskGetNoAuthRes.status === 401,
      'GET /api/tasks/:id rejects unauthenticated request with 401'
    );

    // 11. Single Task PUT without token
    const taskPutNoAuthRes = await fetch(`${baseUrl}/api/tasks/64f0a0000000000000000000`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Completed' }),
    });
    assert(
      taskPutNoAuthRes.status === 401,
      'PUT /api/tasks/:id rejects unauthenticated request with 401'
    );

    // 12. Single Task DELETE without token
    const taskDelNoAuthRes = await fetch(`${baseUrl}/api/tasks/64f0a0000000000000000000`, {
      method: 'DELETE',
    });
    assert(
      taskDelNoAuthRes.status === 401,
      'DELETE /api/tasks/:id rejects unauthenticated request with 401'
    );

    console.log(`\nResults: ${passed}/${total} tests passed.`);
    server.close();
    process.exit(passed === total ? 0 : 1);
  } catch (err) {
    console.error('Test runner encountered error:', err);
    server.close();
    process.exit(1);
  }
};

runTests();

