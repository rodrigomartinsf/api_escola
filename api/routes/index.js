const bodyParser = require('body-parser')
const pessoas = require('../routes/pessoasRoute')
const niveis = require('../routes/niveisRoute')
const turmas = require('../routes/turmasRoute')
const usuarios = require('../routes/usuariosRoute')

module.exports = app => {
  app.use(bodyParser.json() 
          ,pessoas
          ,niveis
          ,turmas
          ,usuarios)
}