const database = require('../models')

class PessoaController {
  static async getPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll()
      return res.status(200).json(todasAsPessoas)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }

  static getPessoaById = async (req, res) => {
    const { id } = req.params
    try {
      //const pessoa = await database.Pessoas.findOne( { where: { id:Number(id) }} )
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
          id: id
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
          id: id
        }
      })

      const pessoaAtualizada = await database.Pessoas.findByPk(id)
      res.status(200).json(pessoaAtualizada)
    } catch (error) {
        res.status(404).json(error.message)
    }
  }
}

module.exports = PessoaController