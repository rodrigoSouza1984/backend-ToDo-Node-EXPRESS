const TaskModel = require('../model/TasksModel');
const {isPast} = require('date-fns')

const TaskValidation = async(req, res, next) => {
    const {macaddress, type, title, description, when} = req.body

    if(!macaddress)
    return res.status(400).json({error: 'macaddress obrigatório'})
    
    else if(!type)
    return res.status(400).json({error: 'tipo obrigatório'})

    else if(!title)
    return res.status(400).json({error: 'título obrigatório'})

    else if(!description)
    return res.status(400).json({error: 'descrição obrigatória'})

    else if(!when)
    return res.status(400).json({error: 'Data e Hora são obrigatório'})

        
    else{
        console.log(req.params._id)
        let dateExistsAlready;

        if(req.params._id){//update entra aki a validacao            
            console.log('entro')
            dateExistsAlready = await TaskModel.findOne({
                '_id': { '$ne': req.params._id},//=> tirando eu (sem contar o id que vem na requisicao existe alguma tarefa com mesmo dia e hora)
                'when': {'$eq': new Date(when)}, 
                'macaddress': {'$in':req.body.macaddress}
            }); 

        }else{//criar nova task entra aki 
            
            if(isPast(new Date(when)))    
            return res.status(400).json({error: 'Escolha uma Data e hora futura'})
        
            console.log('aki')
            dateExistsAlready = await TaskModel.findOne({
                'when': {'$eq': new Date(when)}, 
                'macaddress': {'$in':req.body.macaddress}
            });
           
        }

        if(dateExistsAlready){
            return res.status(400).json({error: 'Ja existe uma tarefa nesse dia e horario'})
        }
        
        next()
    }
    
}

module.exports = TaskValidation