const database = require("../database");

module.exports = {
    criarConta: (nome_professor,email_professor,senha_professor) => {
        return new Promise((resolve,reject) => {
            database.query(
                `INSERT INTO autenticacao VALUES (NULL, ?,?,?)`,
                [nome_professor, email_professor, senha_professor],
                (err, result) => {
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(result)
                }
            )
        })
    }
}
