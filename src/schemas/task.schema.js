const { z } = require('zod')

const createTaskSchema = z.object({
  title: z.string()
    .min(1, 'El título es obligatorio')
    .max(200, 'El título no puede superar 200 caracteres'),

  description: z.string()
    .max(500, 'La descripción no puede superar 500 caracteres')
    .optional()
})

const updateTaskSchema = z.object({
  title: z.string()
    .min(1, 'El título no puede estar vacío')
    .max(200)
    .optional(),

  description: z.string()
    .max(500)
    .optional(),

  completed: z.boolean().optional()
})

module.exports = { createTaskSchema, updateTaskSchema }