const { Router } = require('express')
const UsuarioController = require('../controllers/UsuarioController')

const router = Router()

router.post('/usuarios/login', UsuarioController.login)
router.post('/usuarios', UsuarioController.cadastraUsuario)


module.exports = router