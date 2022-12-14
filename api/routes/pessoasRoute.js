const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')
const Authentication = require('../middlewares/auth')
const router = Router()


router.get('/pessoas',Authentication.check, PessoaController.pegaTodasPessoas)
router.get('/pessoas/ativas',Authentication.check ,PessoaController.pegaPessoasAtivas)
router.get('/pessoas/:estudanteId/matriculas',Authentication.check, PessoaController.getMatriculasByPessoa)
router.get('/pessoas/:estudanteId/matriculas/:matriculaId',Authentication.check, PessoaController.getMatriculaById)
router.get('/pessoas/:estudanteId/matricula/', PessoaController.getMatriculas)
router.get('/pessoas/:id', PessoaController.getPessoaById)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.getMatriculasByTurma)
router.get('/pessoas/matricula/lotada', PessoaController.getTurmasLotadas)

router.post('/pessoas', PessoaController.cadastraPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.post('/pessoas/:estudanteId/matriculas', PessoaController.cadastraMatricula)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletaMatricula)
router.delete('/pessoas/:id', PessoaController.deletaPessoa)

router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)

module.exports = router