const db = require('../src/config/database');

beforeAll(async () => {
  await db.query('BEGIN');
});

afterEach(async () => {
  await db.query('ROLLBACK');
});

afterAll(async () => {
  await db.query('ROLLBACK');
  await db.pool.end();
});

