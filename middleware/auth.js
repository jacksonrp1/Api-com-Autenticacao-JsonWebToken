const jwt = require('jsonwebtoken')
const PrivateKey = 'tokenJackson'

// GERA JWT COM DURAÇÃO DE 5 MINUTOS
const createToken = (id, login) => {
  try {
    return jwt.sign(
      {
        id: id,
        login: login
      },
      PrivateKey,
      { expiresIn: '5m' }
    )
  } catch (error) {
    res.status(500).send({ error: error })
  }
}
// VALIDA SE O TOKEN AINDA É VÁLIDO
const verificaToken = (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    return jwt.verify(token, PrivateKey, (erro, decoded) => {
      if (erro) {
        res.status(401).send({
          auth: false,
          response: 'Código de acesso expirado.'
        })
      } else {
        req.id = decoded.id
        next()
      }
    })
  } catch (error) {
    res.status(500).send({ error: error })
  }
}

module.exports = { createToken, verificaToken }
