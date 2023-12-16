const req = require('express/lib/request');
const res = require('express/lib/response');
const TasksModel = require('../model/TasksModel');
const TaskModel = require('../model/TasksModel')
const {startOfDay,endOfDay, startOfWeek,endOfWeek, startOfMonth,endOfMonth, startOfYear,endOfYear} = require('date-fns')

const current = new Date();


class TaskController {

    async create(req, res) {
        console.log(req.body)
        const task = new TaskModel(req.body);

        await task.save()
            .then(response => {
                return res.status(200).json(response);
            }).catch(error => {
                return res.status(500).json(error);
            })
    }

    async update(req, res) {
        await TaskModel.findByIdAndUpdate({ '_id': req.params._id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response);
            }).catch(err => {
                return res.status(400).json(err)
            })
    }

    async getAll(req, res) {
        console.log(req.body)
        await TasksModel.find({ macaddress: { '$in': req.params.macaddress } })
            .sort('when')
            .then(response => {                
                    return res.status(200).json(response)                                
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    }

    async getById(req, res) {

        await TaskModel.findById(req.params._id)
        .then(response => {            
            return res.status(200).json(response)            
        })
        .catch(err => {
            return res.status(404).json({error: 'tarefa não encontrada'})
        })
    }

    async deleteTask(req, res){
        await TaskModel.deleteOne({'_id': req.params._id})
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
    }

    async updateTarefaRealizada(req, res){        
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params._id},
            {'done': req.params.done},            
            {new: true}
        ).then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        })
    }

    async tarefasAtrasadas(req, res){
        console.log(req.params)
        await TaskModel.find({
            'when': {'$lt': current},
            'macaddress': {'$in': req.params.macaddress}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);            
        })
        .catch(error => {
            return res.status(500).json(error)
        })
    }

    async tarefasDeHoje(req, res){
        console.log(req.params, 'a')
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte':startOfDay(current), '$lt': endOfDay(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json({error: 'nao'});
        })
    }
    
    async tarefasDaSemana(req, res){
        console.log(req.body)
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte':startOfWeek(current), '$lt': endOfWeek(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json({error: 'nao'});
        })
    }

    async tarefasDoMes(req, res){
        console.log(req.params)
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte':startOfMonth(current), '$lt': endOfMonth(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json({error: 'nao'});
        })
    }

    async tarefasDoAno(req, res){
        console.log(req.body)
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte':startOfYear(current), '$lt': endOfYear(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json({error: 'nao'});
        })
    }

}

module.exports = new TaskController()