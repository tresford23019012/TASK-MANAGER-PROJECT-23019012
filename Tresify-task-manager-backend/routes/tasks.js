const express = require('express');
const db = require('../database/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all tasks for logged in user
router.get('/', authMiddleware, (req, res) => {
  db.all(
    'SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC',
    [req.user.id],
    (err, tasks) => {
      if (err) return res.status(500).json({ error: '❌ Could not fetch tasks' });
      res.json(tasks);
    }
  );
});

// Get single task by id
router.get('/:id', authMiddleware, (req, res) => {
  db.get(
    'SELECT * FROM tasks WHERE id = ? AND userId = ?',
    [req.params.id, req.user.id],
    (err, task) => {
      if (err) return res.status(500).json({ error: '❌ Could not fetch task' });
      if (!task) return res.status(404).json({ error: '⚠️ Task not found' });
      res.json(task);
    }
  );
});

// Add new task
router.post('/', authMiddleware, (req, res) => {
  const { title, description, category, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: '⚠️ Title is required' });
  }

  db.run(
    `INSERT INTO tasks 
      (title, description, category, priority, dueDate, userId) 
      VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, category || 'Personal', priority || 'Medium', dueDate, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: '❌ Could not create task' });
      res.status(201).json({
        message: '✅ Task created',
        task: {
          id: this.lastID,
          title,
          description,
          category,
          priority,
          dueDate,
          completed: 0,
          userId: req.user.id,
        },
      });
    }
  );
});

// Update task
router.put('/:id', authMiddleware, (req, res) => {
  const { title, description, category, priority, dueDate, completed } = req.body;

  db.get(
    'SELECT * FROM tasks WHERE id = ? AND userId = ?',
    [req.params.id, req.user.id],
    (err, task) => {
      if (err) return res.status(500).json({ error: '❌ Server error' });
      if (!task) return res.status(404).json({ error: '⚠️ Task not found' });

      db.run(
        `UPDATE tasks SET 
          title = ?, 
          description = ?, 
          category = ?, 
          priority = ?, 
          dueDate = ?, 
          completed = ?
          WHERE id = ? AND userId = ?`,
        [
          title || task.title,
          description || task.description,
          category || task.category,
          priority || task.priority,
          dueDate || task.dueDate,
          completed !== undefined ? completed : task.completed,
          req.params.id,
          req.user.id,
        ],
        function (err) {
          if (err) return res.status(500).json({ error: '❌ Could not update task' });
          res.json({ message: '✅ Task updated' });
        }
      );
    }
  );
});

// Delete task
router.delete('/:id', authMiddleware, (req, res) => {
  db.get(
    'SELECT * FROM tasks WHERE id = ? AND userId = ?',
    [req.params.id, req.user.id],
    (err, task) => {
      if (err) return res.status(500).json({ error: '❌ Server error' });
      if (!task) return res.status(404).json({ error: '⚠️ Task not found' });

      db.run(
        'DELETE FROM tasks WHERE id = ? AND userId = ?',
        [req.params.id, req.user.id],
        function (err) {
          if (err) return res.status(500).json({ error: '❌ Could not delete task' });
          res.json({ message: '✅ Task deleted' });
        }
      );
    }
  );
});

// Toggle complete
router.patch('/:id/complete', authMiddleware, (req, res) => {
  db.get(
    'SELECT * FROM tasks WHERE id = ? AND userId = ?',
    [req.params.id, req.user.id],
    (err, task) => {
      if (err) return res.status(500).json({ error: '❌ Server error' });
      if (!task) return res.status(404).json({ error: '⚠️ Task not found' });

      db.run(
        'UPDATE tasks SET completed = ? WHERE id = ? AND userId = ?',
        [task.completed ? 0 : 1, req.params.id, req.user.id],
        function (err) {
          if (err) return res.status(500).json({ error: '❌ Could not update task' });
          res.json({ message: '✅ Task updated', completed: !task.completed });
        }
      );
    }
  );
});

module.exports = router;