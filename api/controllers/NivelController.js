//const database = require('../models')
const Services = require('../services/Services')
const niveisService = new Services('Niveis')

class NivelController {

  static getNiveis = async (req, res) => {
    try {
      const niveis = await niveisService.PegaTodosOsRegistros()
      res.status(200).json(niveis)
    } catch (error) {
        res.status(500).json(error.message)
    }
  }

  static getNivelById = async (req, res) => {
    const { id } = req.params
    try {
      const nivel = await database.Niveis.findByPk(id)
      res.status(200).json(nivel)
    } catch (error) {
      res.status(404).json(error.message)
    }
  }

  static cadastraNivel = async (req, res) => {
    const novoNivel = req.body
    try {
      const nivel = await database.Niveis.create(novoNivel)
      res.status(200).json(nivel)
    } catch (error) {
        res.status(500).json(error.message)
    }
  }

  static atualizaNivel = async (req, res) => {
    const { id } = req.params
    const novosDados = req.body
    try {
      await database.Niveis.update(novosDados, {
        where: {
          id: id
        }
      })
      const nivel = await database.Niveis.findByPk(id)
      res.status(200).json(nivel)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static apagaNivel = async (req, res) => {
    const { id } = req.params
    try {
      const deletado = await database.Niveis.destroy({where: { id: id }})
      deletado? res.status(200).json() : res.status(200).json({error: 'Id não localizado'})
    } catch (error) {
      res.status(404).json(error.message)
    }
  }
}

module.exports = NivelController