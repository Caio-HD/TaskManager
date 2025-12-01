const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    
    const result = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at, updated_at',
      [email, passwordHash]
    );
    
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query(
      'SELECT id, email, password_hash, created_at, updated_at FROM users WHERE email = $1',
      [email]
    );
    
    return result.rows[0] || null;
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT id, email, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    
    return result.rows[0] || null;
  }

  static async verifyPassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
  }
}

module.exports = User;

