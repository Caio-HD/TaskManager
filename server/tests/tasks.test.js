const request = require('supertest');
const app = require('../src/index');
const db = require('../src/config/database');
const User = require('../src/models/User');
const Task = require('../src/models/Task');
const jwt = require('jsonwebtoken');
const config = require('../src/config/config');

describe('Tasks API', () => {
  let authToken;
  let userId;
  let otherUserToken;
  let otherUserId;

  beforeEach(async () => {
    await db.query('DELETE FROM tasks');
    await db.query('DELETE FROM users');

    const user = await User.create('test@example.com', 'password123');
    userId = user.id;
    authToken = jwt.sign({ userId }, config.jwt.secret);

    const otherUser = await User.create('other@example.com', 'password123');
    otherUserId = otherUser.id;
    otherUserToken = jwt.sign({ userId: otherUserId }, config.jwt.secret);
  });

  describe('GET /api/tasks', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/tasks');

      expect(response.status).toBe(401);
    });

    it('should return empty array for user with no tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.tasks).toEqual([]);
    });

    it('should return only user\'s tasks', async () => {
      await Task.create(userId, 'User Task', 'Description');
      await Task.create(otherUserId, 'Other User Task', 'Description');

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.tasks).toHaveLength(1);
      expect(response.body.data.tasks[0].title).toBe('User Task');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'New Task',
          description: 'Task description'
        });

      expect(response.status).toBe(201);
      expect(response.body.data.task).toHaveProperty('id');
      expect(response.body.data.task.title).toBe('New Task');
      expect(response.body.data.task.user_id).toBe(userId);
    });

    it('should reject task without title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          description: 'Task description'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return task by id', async () => {
      const task = await Task.create(userId, 'Test Task', 'Description');

      const response = await request(app)
        .get(`/api/tasks/${task.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.task.id).toBe(task.id);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .get('/api/tasks/99999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });

    it('should not return other user\'s task', async () => {
      const task = await Task.create(otherUserId, 'Other Task', 'Description');

      const response = await request(app)
        .get(`/api/tasks/${task.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update task', async () => {
      const task = await Task.create(userId, 'Original Title', 'Original Description');

      const response = await request(app)
        .put(`/api/tasks/${task.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Title',
          completed: true
        });

      expect(response.status).toBe(200);
      expect(response.body.data.task.title).toBe('Updated Title');
      expect(response.body.data.task.completed).toBe(true);
    });

    it('should not update other user\'s task', async () => {
      const task = await Task.create(otherUserId, 'Other Task', 'Description');

      const response = await request(app)
        .put(`/api/tasks/${task.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Hacked Title'
        });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete task', async () => {
      const task = await Task.create(userId, 'Task to Delete', 'Description');

      const response = await request(app)
        .delete(`/api/tasks/${task.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);

      const verifyResponse = await request(app)
        .get(`/api/tasks/${task.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(verifyResponse.status).toBe(404);
    });

    it('should not delete other user\'s task', async () => {
      const task = await Task.create(otherUserId, 'Other Task', 'Description');

      const response = await request(app)
        .delete(`/api/tasks/${task.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });
});

