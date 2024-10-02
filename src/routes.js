const express = require('express')
const route = express.Router()
const cors = require('cors')
const AtividadeController = require("./controllers/AtividadeController");
const AutenticacaoController = require("./controllers/AutenticacaoController");
const TurmaController = require("./controllers/TurmaController");

//endpoints turmas
route.get('/turma', TurmaController.showTurmas)//Mostrar as turmas
route.post('/turma', TurmaController.createTurma)//Criar uma turma
route.put('/turma/:id', TurmaController.updateTurma)//Editar uma turma
route.delete('/turma/:id', TurmaController.deleteTurma)//Apagar uma turma

//endpoints autenticacao
route.post('/autenticacao', AutenticacaoController.criarConta)//Criar conta do professor

//endpoints atividades
route.get('/atividade', AtividadeController.showAtividades)//Mostrar as atividades
route.post('/atividade', AtividadeController.criarAtividade)//Criar uma atividade
route.put('/atividade/:id', AtividadeController.updateAtividade)//Editar uma atividade
route.delete('/atividade/:id', AtividadeController.deleteAtividade)//Apagar uma atividade

module.exports = route