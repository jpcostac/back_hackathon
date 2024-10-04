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
    },

    verificarConta: (email_professor, senha_professor) => {
        return new Promise((resolve, reject) => {
            database.query(
                `SELECT * FROM autenticacao WHERE email_professor = ? AND senha_professor = ?`,
                [email_professor, senha_professor],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (result.length > 0) {
                        resolve(result[0]); // Retorna o primeiro resultado encontrado
                    } else {
                        resolve(null); // Nenhuma conta encontrada
                    }
                }
            );
        });
    }
}