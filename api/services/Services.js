const database = require('../models')


class Services {

  constructor(modelName) {
    this.modelName = modelName
  }

  async pegaTodosOsRegistros() {
    return database[this.modelName].findAll()
  }

  async pegaUmRegistro(id) {

  }

  async criaRegistro(dados) {

  }

  async atualizaRegistro(dadosAtualizados, id, transacao) {
    return database[this.modelName].update(dadosAtualizados, { where: { id: id } }, transacao)
  }

  async atualizaRegistros(dadosAtualizados, where, transacao) {
    return database[this.modelName].update(dadosAtualizados, { where: { ...where } }, transacao)
  } 

  async apagaRegistro(id) {

  }
}

module.exports = Services