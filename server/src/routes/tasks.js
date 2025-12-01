const express = require('express');
const Task = require('../models/Task');
const { authenticate } = require('../middleware/auth');
const { validateTask, validateTaskUpdate } = require('../middleware/validation');
const { AppError } = require('../utils/errors');

const router = express.Router();

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findByUserId(req.user.id);
    res.json({
      status: 'success',
      data: { tasks }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id, req.user.id);
    
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.json({
      status: 'success',
      data: { task }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', validateTask, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create(req.user.id, title, description);
    
    res.status(201).json({
      status: 'success',
      message: 'Task created successfully',
      data: { task }
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateTaskUpdate, async (req, res, next) => {
  try {
    const task = await Task.update(req.params.id, req.user.id, req.body);
    
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.json({
      status: 'success',
      message: 'Task updated successfully',
      data: { task }
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.delete(req.params.id, req.user.id);
    
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.json({
      status: 'success',
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

