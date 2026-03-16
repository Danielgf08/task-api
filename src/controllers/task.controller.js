const pool = require('../config/db')

const getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    )
    res.json({ tasks: result.rows })
  } catch (error) {
  console.error('Error en createTask:', error.message)
  res.status(500).json({ error: error.message })
}
}
// Crear una nueva tarea
const createTask = async (req, res) => {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' })
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, title, description]
    )
    res.status(201).json({ task: result.rows[0] })
  } catch (error) {
  console.error('Error en createTask:', error.message)
  res.status(500).json({ error: error.message })
}
}

// Actualizar una tarea existente

const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description, completed } = req.body

  try {
    const result = await pool.query(
      `UPDATE tasks 
       SET title = COALESCE($1, title), 
           description = COALESCE($2, description),
           completed = COALESCE($3, completed)
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [title, description, completed, id, req.user.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' })
    }

    res.json({ task: result.rows[0] })
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

// Eliminar una tarea

const deleteTask = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' })
    }

    res.json({ message: 'Tarea eliminada correctamente' })

    } catch (error) {
  console.error('Error en createTask:', error.message)
  res.status(500).json({ error: error.message })
}
}

module.exports = { getTasks, createTask, updateTask, deleteTask }
