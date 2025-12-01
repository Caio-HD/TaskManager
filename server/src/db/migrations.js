const fs = require('fs');
const path = require('path');
const db = require('../config/database');

const runMigrations = async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await db.query(schema);
    console.log('Database schema created successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
};

if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('Migrations completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migrations failed:', error);
      process.exit(1);
    });
}

module.exports = { runMigrations };

