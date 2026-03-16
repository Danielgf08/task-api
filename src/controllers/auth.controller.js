const pool = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//registro de usuario
const register = async (req, res) => {
    const {name, email, password} = req.body

    try{
        //1. verificar si el email existe
        const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (existing.rows.length > 0) {
            return res.status(400).json({message: 'El email ya esta registrado'})
    }

        //2. encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        //3. guardar el usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        )

        res.status(201).json({ user:result.rows[0]})

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor'})
    }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // 1. Buscar el usuario por email
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const user = result.rows[0]

    // 2. Comparar la contraseña con el hash
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // 3. Generar el JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token })

  } catch (error) {
  console.error('Error en login:', error.message)
  res.status(500).json({ error: error.message })
}
}

module.exports = { register, login }