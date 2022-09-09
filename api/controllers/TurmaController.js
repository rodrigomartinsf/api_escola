const database = require('../models')

class TurmaController {

  static getTurmas = async (req, res) => {
    try {
      const turmas = await database.Turmas.findAll()
      res.status(200).json(turmas)
    } catch (error) {
        res.status(500).json(error.message)
    }
  }

  static getTurmaById = async (req, res) => {
    const { id } = req.params
    try {
      const turma = await database.Turmas.findByPk(id)
      res.status(200).json(turma)
    } catch (error) {
      res.status(404).json(error.message)
    }
  }

  static cadastraTurma = async (req, res) => {
    const novoTurma = req.body
    try {
      const turma = await database.Turmas.create(novoTurma)
      res.status(200).json(turma)
    } catch (error) {
        res.status(500).json(error.message)
    }
  }

  static atualizaTurma = async (req, res) => {
    const { id } = req.params
    const novosDados = req.body
    try {
      await database.Turmas.update(novosDados, {
        where: {
          id: id
        }
      })
      const turma = await database.Turmas.findByPk(id)
      res.status(200).json(turma)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static apagaTurma = async (req, res) => {
    const { id } = req.params
    try {
      const deletado = await database.Turmas.destroy({where: { id: id }})
      deletado? res.status(200).json() : res.status(200).json({error: 'Id não localizado'})
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
}

module.exports = TurmaController