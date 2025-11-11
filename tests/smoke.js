const base = 'http://localhost:4000';

const log = (label, obj) => {
  console.log('--- ' + label + ' ---');
  console.log(obj);
}

async function run() {
  try {
    const r1 = await fetch(`${base}/`);
    log('GET / status', r1.status);
    log('GET / body', await r1.json());

    const email = `smoke_test_${Date.now()}@example.com`;
    const password = 'Password123!';
    const createResp = await fetch(`${base}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Smoke Test', cpf: email, email: email, password })
    });
    log('POST /customers status', createResp.status);
    let createBody;
    try { createBody = await createResp.json(); } catch(e) { createBody = null }
    log('POST /customers body', createBody);

    const loginResp = await fetch(`${base}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpf: email, password })
    });
    const loginBody = await loginResp.json();
    log('POST /login status', loginResp.status);
    log('POST /login body', loginBody);

    if (!loginBody || !loginBody.token) {
      console.error('Login não retornou token; abortando os testes protegidos.');
      return;
    }
    const token = loginBody.token;

    const authHeaders = { 'Authorization': `Bearer ${token}` };

    const customersResp = await fetch(`${base}/customers`, { headers: authHeaders });
    const customersBody = await customersResp.json();
    log('GET /customers status', customersResp.status);
    log('GET /customers body', customersBody);

    let customerId = null;
    if (customersBody && customersBody.customers) {
      const found = customersBody.customers.find(c => c.email === email || c.cpf === email);
      if (found) customerId = found._id || found.id;
    }

    const accountsResp = await fetch(`${base}/accounts`, { headers: authHeaders });
    log('GET /accounts status', accountsResp.status);
    try { log('GET /accounts body', await accountsResp.json()); } catch(e) {}

    const txResp = await fetch(`${base}/transactions`, { headers: authHeaders });
    log('GET /transactions status', txResp.status);
    try { log('GET /transactions body', await txResp.json()); } catch(e) {}

    if (customerId) {
      const ofResp = await fetch(`${base}/openfinance/customers/${customerId}`, { headers: authHeaders });
      log(`GET /openfinance/customers/${customerId} status`, ofResp.status);
      try { log('body', await ofResp.json()); } catch(e) {}
    } else {
      console.log('ID do cliente não encontrado na resposta de GET /customers; pulando teste openfinance');
    }

  } catch (err) {
    console.error('Erro no smoke test:', err);
  }
}

run();
