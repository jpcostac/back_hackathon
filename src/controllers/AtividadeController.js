const atividadeService = require("../services/AtividadeService")

module.exports={
    criarAtividade: async(request, response) => {
        json = {error: "", result: ""};
        let nome_atividade = request.body.nome_atividade;
        let descricao = request.body.descricao;
        let data_entrega = request.body.data_entrega;
        let peso_nota = request.body.peso_nota;
        let id_turma = request.body.id_turma;

        if(
            nome_atividade!=""&&
            descricao!=""&&
            data_entrega!=""&&
            peso_nota!=""&&
            id_turma!=""
        ){
            let atividade = await atividadeService.criarAtividade(
                nome_atividade,
                descricao,
                data_entrega,
                peso_nota,
                id_turma
            );

            json.result = `Atividade: ${nome_atividade} criada com sucesso!`

            response.status(201).json(json);
        }else{
            json.error = "Falha ao criar a atividade: Campos inválidos!";
            response.status(400).json(json);
        }
    },

    showAtividades: async(request, response) => {
        json = {error: "", result: []};
        let atividades = await atividadeService.showAtividades()

        if(atividades.length == 0){
            json.result = "Nenhuma atividade criada";
            response.status(200).json(json);
        }else{
            for(let atividade of atividades){
                json.result.push(atividade);
            }
            response.status(200).json(json)
        }
    },

    updateAtividade: async(request, response) => {
        json= {error: "", result: ""};
        const id_atividade = request.params.id_atividade;
        
        let nome_atividade = request.body.nome_atividade;
        let descricao = request.body.descricao;
        let data_entrega = request.body.data_entrega;
        let peso_nota = request.body.peso_nota;

        if(
            nome_atividade!=""&&
            descricao!=""&&
            data_entrega!=""&&
            peso_nota!=""
        ){
            await atividadeService.updateAtividade(
                id_atividade,
                nome_atividade,
                descricao,
                data_entrega,
                peso_nota
            );

            json.result = `Atividade: ${nome_atividade} atualizada com sucesso!`

            response.status(201).json(json);
        }else{
            json.error = "Falha ao editar a atividade: Campos inválidos!";
            response.status(400).json(json);
        }
    },

    deleteAtividade: async(request, response) =>{
        let json = {error: "", result: {}};

        let id = request.params.id_atividade

        if(id){
            await atividadeService.deleteAtividade(id)

            json.result = `Atividade excluída com sucesso`
            response.status(200).json(json)
        }

    }
}