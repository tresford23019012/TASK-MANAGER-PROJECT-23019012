const express = require('express');
const db = require('../database/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all tasks
router.get('/', authMiddleware, (req, res) => {
  try {
    const tasks = db.prepare('SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC').all(req.user.id);
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: '❌ Could not fetch tasks' });
  }
});

// Get single task
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ error: '⚠️ Task not found' });
    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: '❌ Server error' });
  }
});

// Add task
router.post('/', authMiddleware, (req, res) => {
  const { title, description, category, priority, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: '⚠️ Title is required' });

  try {
    const result = db.prepare(
      'INSERT INTO tasks (title, description, category, priority, dueDate, userId) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(title, description, category || 'Personal', priority || 'Medium', dueDate, req.user.id);

    res.status(201).json({
      message: '✅ Task created',
      task: { id: result.lastInsertRowid, title, description, category, priority, dueDate, completed: 0 },
    });
  } catch (err) {
    res.status(500).json({ error: '❌ Could not create task' });
  }
});

// Update task
router.put('/:id', authMiddleware, (req, res) => {
  const { title, description, category, priority, dueDate, completed } = req.body;

  try {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ error: '⚠️ Task not found' });

    db.prepare(`
      UPDATE tasks SET title = ?, description = ?, category = ?, priority = ?, dueDate = ?, completed = ?
      WHERE id = ? AND userId = ?
    `).run(
      title || task.title,
      description || task.description,
      category || task.category,
      priority || task.priority,
      dueDate || task.dueDate,
      completed !== undefined ? completed : task.completed,
      req.params.id,
      req.user.id
    );

    res.json({ message: '✅ Task updated' });
  } catch (err) {
    res.status(500).json({ error: '❌ Could not update task' });
  }
});

// Delete task
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ error: '⚠️ Task not found' });

    db.prepare('DELETE FROM tasks WHERE id = ? AND userId = ?').run(req.params.id, req.user.id);
    res.json({ message: '✅ Task deleted' });
  } catch (err) {
    res.status(500).json({ error: '❌ Could not delete task' });
  }
});

// Toggle complete
router.patch('/:id/complete', authMiddleware, (req, res) => {
  try {
    const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ error: '⚠️ Task not found' });

    db.prepare('UPDATE tasks SET completed = ? WHERE id = ? AND userId = ?')
      .run(task.completed ? 0 : 1, req.params.id, req.user.id);

    res.json({ message: '✅ Task toggled' });
  } catch (err) {
    res.status(500).json({ error: '❌ Could not toggle task' });
  }
});

module.exports = router;