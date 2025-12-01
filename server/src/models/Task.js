const db = require('../config/database');

class Task {
  static async create(userId, title, description = null) {
    const result = await db.query(
      'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, description]
    );
    
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await db.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    
    return result.rows;
  }

  static async findById(id, userId) {
    const result = await db.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    
    return result.rows[0] || null;
  }

  static async update(id, userId, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(updates.title);
    }
    if (updates.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(updates.description);
    }
    if (updates.completed !== undefined) {
      fields.push(`completed = $${paramCount++}`);
      values.push(updates.completed);
    }

    if (fields.length === 0) {
      return await this.findById(id, userId);
    }

    values.push(id, userId);
    const query = `
      UPDATE tasks 
      SET ${fields.join(', ')} 
      WHERE id = $${paramCount++} AND user_id = $${paramCount}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id, userId) {
    const result = await db.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    
    return result.rows[0] || null;
  }
}

module.exports = Task;

