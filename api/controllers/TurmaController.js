const database = require('../models')
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const op = Sequelize.Op

class TurmaController {

  static getTurmas = async (req, res) => {
    const { dataInicial, dataFinal } = req.query
    const where = {}
    dataInicial || dataFinal ? where.data_inicio = {} : null
    dataInicial ? where.data_inicio[Op.gte] = dataInicial : null
    dataFinal ? where.data_inicio[Op.lte] = dataFinal  : null
    //console.log(where)
    try {
      const turmas = await database.Turmas.findAll({ where })
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