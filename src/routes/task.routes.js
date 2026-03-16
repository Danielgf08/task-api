const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth.middleware')
const validate = require('../middlewares/validate.middleware')
const { createTaskSchema, updateTaskSchema } = require('../schemas/task.schema')
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/task.controller')

router.use(verifyToken)

router.get('/', getTasks)
router.post('/', validate(createTaskSchema), createTask)
router.put('/:id', validate(updateTaskSchema), updateTask)
router.delete('/:id', deleteTask)

module.exports = router