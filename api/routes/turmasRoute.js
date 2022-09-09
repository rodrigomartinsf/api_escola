const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()

router.get('/turmas', TurmaController.getTurmas)
router.get('/turmas/:id', TurmaController.getTurmaById)
router.post('/turmas', TurmaController.cadastraTurma)
router.delete('/turmas/:id', TurmaController.apagaTurma)
router.put('/turmas/:id', TurmaController.atualizaTurma)

module.exports = router