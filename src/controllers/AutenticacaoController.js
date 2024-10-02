const autenticacaoService = require("../services/AutenticacaoService");

module.exports ={
    criarConta: async(request, response) => {
        json = {error: "", result: ""};
        let nome_professor = request.body.nome_professor;
        let email_professor = request.body.email_professor;
        let senha_professor = request.body.senha_professor;

        if(
            nome_professor != "" &&
            email_professor != "" &&
            senha_professor != ""
        ){
            let autenticacao = await autenticacaoService.criarConta(
                nome_professor,
                email_professor,
                senha_professor
            );

            json.result = `Professor: ${nome_professor} cadastrado com sucesso!`

            response.status(201).json(json);            
        }else{
            json.error = "Falha ao criar a conta: Campos inválidos!";
            response.status(400).json(json);
        }
    }
}

//becriped