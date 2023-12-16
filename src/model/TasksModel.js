const mongoose = require('../config/database')
//importando nosso arquivo dataBase aki, moongose eh apenas 
//o nome que esse arquivo traz com ele o moongose
//configurado a conexao

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    macaddress: {type: String, required: true},
    type: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    when: {type: Date, required: true},
    done: {type: Boolean, default: false},
    created: {type: Date, dafault: Date.now()}
});

module.exports = mongoose.model('Task', TaskSchema);

/*
mongoose.model => model metodo do banco de dados mongoose
1 parametro nome que vamos dar a nossa tabela de tarefas, e 2 parametro
passando o schema craido acima*/