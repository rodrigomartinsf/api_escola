const database = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UsuarioController {

  static cadastraUsuario = async (req, res) => {
    const { email, senha } = req.body
    const senhaHash = await bcrypt.hash(senha,8)
    const novoUsuario = {email: email, senha: senhaHash}
    try {
      const usuario = await database.Usuarios.create(novoUsuario)
      res.status(201).json(usuario)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static login = async (req, res) => {
    const { email, senha } = req.body
    const usuario = await database.Usuarios.findOne({ where: { email: email } })
    try {
      if(!(await bcrypt.compare(senha, usuario.senha))) {
        res.status(500).json({erro: true, mensagem: "Usuário ou senha incorreta"})
      }
      else{
        const token = jwt.sign({id: usuario.id, email: usuario.email}, "AJDAJHDAJLKAJDS76784353JKUDKJAGHDKJ",{ expiresIn: 600 })
        res.status(200).json({auntenticado: true, mensagem: "Usuário logado!", token: token})
      }
    } catch (error) {
        res.status(500).json(error.message)
    }
    
  }
}

module.exports = UsuarioController