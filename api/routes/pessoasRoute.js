const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.getPessoas)
router.get('/pessoas/:id', PessoaController.getPessoaById)
router.post('/pessoas', PessoaController.cadastraPessoa)
router.delete('/pessoas/:id', PessoaController.deletaPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)

module.exports = router