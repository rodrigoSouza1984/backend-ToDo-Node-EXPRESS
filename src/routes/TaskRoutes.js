const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController')
const TaskValidation = require('../middleware/TaskValidation')
const MacaddressValidation = require('../middleware/MacaddressValidation')

router.post('/',TaskValidation,TaskController.create);
router.put('/:_id',TaskValidation, TaskController.update)
router.put('/:_id/:done', TaskController.updateTarefaRealizada)

router.get('/filter/all/:macaddress', TaskController.getAll)
router.get('/:_id', TaskController.getById)
router.get('/atrasadas/:macaddress',  TaskController.tarefasAtrasadas)
router.get('/tarefasDeHoje/:macaddress',  TaskController.tarefasDeHoje)
router.get('/tarefasDaSemana/:macaddress',  TaskController.tarefasDaSemana)
router.get('/tarefasDoMes/:macaddress',  TaskController.tarefasDoMes)
router.get('/tarefasDoAno/:macaddress',  TaskController.tarefasDoAno)

router.delete('/:_id', TaskController.deleteTask)

module.exports = router;