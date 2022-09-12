const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.getPessoas)
router.get('/pessoas/:estudanteId/matriculas', PessoaController.getMatriculasByPessoa)
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.getMatriculaById)
router.get('/pessoas/:id', PessoaController.getPessoaById)

router.post('/pessoas', PessoaController.cadastraPessoa)
router.post('/pessoas/:estudanteId/matriculas', PessoaController.cadastraMatricula)

router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletaMatricula)
router.delete('/pessoas/:id', PessoaController.deletaPessoa)

router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)

module.exports = router