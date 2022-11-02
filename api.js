const express = require('express')
const cors = require('cors')
const app = express()

// CRIA O TOKEN E VERIFICA SE TOKEN AINDA É VÁLIDO
const { createToken, verificaToken } = require('./middleware/auth.js')

const port = 8090
app.use(express.json())
app.use(cors())

// ROTA COM MIDDLEWARE, PASSAR NO HEADER -> x-access-token <-
app.get('/', verificaToken, (req, res) => {
  res.status(200).send({
    auth: true,
    response: 'Acesso liberado.'
  })
})

// ROTA PARA GERAR TOKEN
app.post('/login', (req, res) => {
  const { username, password } = req.body

  if (username == 'jackson' && password == '123') {
    res.status(200).send({
      auth: true,
      response: 'Logado com sucesso.',
      token: createToken(1, 'jackson')
    })
  } else {
    res.status(401).send({
      auth: false,
      response: 'Login ou senha incorretos.',
      token: ''
    })
  }
})

app.listen(port, (req, res) => {
  console.log(`Servidor Online na porta ${port}`)
})
