const jwt = require('jsonwebtoken')
const { promisify } = require('util')

class Authentication {

  static async check(req, res, next){
    const authHeader = req.headers.authorization
    if(!authHeader) {
      return res.status(400).json({erro: true, mensagem: "Token inválido A"})
    } 

    
    const [, token] = authHeader.split(" ")
    if(!token) {
      return res.status(400).json({erro: true, mensagem: "Token inválido B"})
    }

    try {
      await promisify(jwt.verify)(token, "AJDAJHDAJLKAJDS76784353JKUDKJAGHDKJ")
      return next()
    } catch (error) {
      return res.status(400).json({erro: true, mensagem: "Token inválido"})
    }

  }

}
  
module.exports = Authentication
