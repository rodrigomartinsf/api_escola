const database = require('../models')
const Sequelize = require('sequelize')

class PessoaController {
  static async getTodasPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.scope('todos').findAll()
      return res.status(200).json(todasAsPessoas)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }

  static async getPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await database.Pessoas.findAll()
      return res.status(200).json(pessoasAtivas)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }

  static getPessoaById = async (req, res) => {
    const { id } = req.params
    try {
      const pessoa = await database.Pessoas.findByPk(id)
      res.status(200).json(pessoa)
    } catch (error) {
        res.status(500).json(error.message)
    }
  }

  static cadastraPessoa = async (req, res) => {
    const novaPessoa = req.body
    try {
      const pessoa = await database.Pessoas.create(novaPessoa)  
      res.status(200).json(pessoa)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static deletaPessoa = async (req, res) => {
    const { id } = req.params
    try {
      await database.Pessoas.destroy({
        where: {
          id: Number(id)
        }
      })
      res.status(200).json()
    } catch (error) {
        res.status(404).json(error.message)
    }
  }

  static atualizaPessoa = async (req, res) => {
    const { id } = req.params
    const novasInfos = req.body

    try {
      await database.Pessoas.update(novasInfos, {
        where: {
          id: Number(id)
        }
      })

      const pessoaAtualizada = await database.Pessoas.findByPk(id)
      res.status(200).json(pessoaAtualizada)
    } catch (error) {
        res.status(404).json(error.message)
    }
  }

  static restauraPessoa = async (req, res) => {
    const { id } = req.params
    try {
      await database.Pessoas.restore({
        where: {
          id: Number(id)
        }
      })
      const pessoa = await database.Pessoas.findByPk(id)
      res.status(200).json(pessoa)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static getMatriculaById = async (req, res) => {
    const { estudanteId, matriculaId } = req.params
    try {
      const matricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      res.status(200).json(matricula)
    } catch (error) {
        res.status(500).json(error.message)
    }
  } 

  static getMatriculasByPessoa = async (req, res) => {
    const { estudanteId } = req.params
    try {
      const matricula = await database.Matriculas.findAll({
        where: {
          estudante_id: Number(estudanteId)
        }
      })
      res.status(200).json(matricula)
    } catch (error) {
        res.status(500).json(error.message)
    }
  } 

  static cadastraMatricula = async (req, res) => {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const matricula = await database.Matriculas.create(novaMatricula)  
      res.status(200).json(matricula)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static atualizaMatricula = async (req, res) => {
    const { estudanteId, matriculaId } = req.params
    const novasInfos = req.body

    try {
      await database.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })

      const matriculaAtualizada = await database.Matriculas.findByPk(matriculaId)
      res.status(200).json(matriculaAtualizada)
    } catch (error) {
        res.status(404).json(error.message)
    }
  }

  static deletaMatricula = async (req, res) => {
    const { matriculaId, estudanteId } = req.params
    try {
      await database.Matriculas.destroy({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      res.status(200).json()
    } catch (error) {
        res.status(404).json(error.message)
    }
  }

  static getMatriculas = async (req, res) => {
    const { estudanteId } = req.params
    try {
      const pessoa = await database.Pessoas.findOne({
        where: {
          id: Number(estudanteId)
        }
      })
      const matriculas = await pessoa.getAulasMatriculadas()
      res.status(200).json(matriculas)
    } catch (error) {
        res.status(404).json(error.message)
    }
  }

  static getMatriculasByTurma = async (req, res) => {
    const { turmaId } = req.params
    try {
      const matriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: 'confirmado'
        },
        limit: 20,
        order: [['estudante_id', 'DESC']]
      })
      res.status(200).json(matriculas)
    } catch (error) {
        res.status(404).json(error.message)
    }
  }

  static getTurmasLotadas = async (req, res) => {
    const lotacaoTurma = 2
    try {
      const turmas = await database.Matriculas.findAndCountAll({
        where: {
          status: 'confirmado'
        },
        attributes: ['turma_id'],
        group: ['turma_id'],
        having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
      })
      res.status(200).json(turmas.count)
    } catch (error) {
        res.status(404).json(error.message)
    }
  }

}

module.exports = PessoaController