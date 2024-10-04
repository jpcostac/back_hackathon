const turmaService = require("../services/TurmaService");

module.exports={
    createTurma: async(request,response)=>{
        json={error:"",result:""}
        let nome_turma = request.body.nome_turma;
        let periodo_turma = request.body.periodo_turma;
        let id_professor = request.body.id_professor;
        
        id_professor = parseInt(id_professor)
        if(
            nome_turma!=""&&
            periodo_turma!=""&&
            id_professor!=""
        ){
            let turma = await turmaService.createTurma(
                nome_turma,
                periodo_turma,
                id_professor
            );

            json.result= `Turma: ${nome_turma} criada com sucesso!`
            response.status(200).json(json);
        }else{
            json.error = "Falha ao criar a turma: Campos inválidos!";
            response.status(400).json(json);
        }
    },

    updateTurma: async(request,response)=>{
        json={error:"",result:""}

        const id_turma = request.params.id_turma
        
        let nome_turma = request.body.nome_turma;
        let periodo_turma = request.body.periodo_turma;
        let id_professor = request.body.id_professor;

        if(
            nome_turma!=""&&
            periodo_turma!=""&&
            id_professor!=""
        ){
            let turma = await turmaService.updateTurma(
                id_turma,
                nome_turma,
                periodo_turma,
                id_professor
            );

            json.result= `Turma: ${nome_turma} atualizada com sucesso!`
            response.status(200).json(json);
        }else{
            json.error = "Falha ao editar a turma: Campos inválidos!";
            response.status(400).json(json);
        }

    },

    deleteTurma: async(request,response)=>{
        json={error:"",result:""}
        
        let id = request.params.id_turma

        if(id){
            await turmaService.deleteTurma(id)

            json.result = `Turma excluída com sucesso`
            response.status(200).json(json)
        }
    },

    showTurmas: async(request,response)=>{
        json={error:"",result:[]}
        let turmas = await turmaService.showTurmas()

        if(turmas.length ==0){
            json.result= "Nenhuma turma criada";
            response.status(200).json(json);
        }else{
            for(let turma of turmas){
                json.result.push(turma);
            }
            response.status(200).json(json);
        }
        
    }
}

