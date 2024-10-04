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
    },

    verificarConta: async (request, response) => {
        const json = { error: "", result: "" };
        const { email_professor, senha_professor } = request.body;

        if (email_professor && senha_professor) {
            try {
                const professor = await autenticacaoService.verificarConta(email_professor, senha_professor);

                if (professor) {
                    json.result = `Login bem-sucedido para o professor: ${professor.nome_professor}`;
                    response.status(200).json(json);
                } else {
                    json.error = "Email ou senha incorretos.";
                    response.status(401).json(json);
                }
            } catch (error) {
                json.error = "Erro ao verificar conta: " + error.message;
                response.status(500).json(json);
            }
        } else {
            json.error = "Falha ao verificar a conta: Campos inválidos!";
            response.status(400).json(json);
        }
    }
}

//becriped