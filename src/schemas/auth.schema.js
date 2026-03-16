const { z } = require('zod')

const registerSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar 100 caracteres'),

  email: z.string()
    .email('El email no tiene un formato válido'),

  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
})

const loginSchema = z.object({
  email: z.string()
    .email('El email no tiene un formato válido'),

  password: z.string()
    .min(1, 'La contraseña es obligatoria')
})

module.exports = { registerSchema, loginSchema }