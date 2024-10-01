const database = require("../database");

module.exports = {
    //Criar as turmas
    createTurma: (nome_turma,periodo_turma,id_professor) => {
        return new Promise((resolve, reject) => {
            database.query(
                `SELECT COUNT(*) AS count FROM autenticacao WHERE id_professor = ?`,
                [id_professor],
                (err, result) => {
                    if(err){
                        reject(err);
                        return;
                    }

                    if(result[0].count === 0){
                        //Caso o id não seja encontrado
                        reject(new Error("Professor não encontrado"));
                        return;
                    }

                    database.query(
                        `INSERT INTO turmas VALUES (null, ?, ?, ?)`,
                        [nome_turma, periodo_turma, id_professor],
                        (err, result) => {
                            if(err){
                                reject(err);
                                return;
                            }
                            resolve(result)
                        }
                    )
                }
            )
        })
    },

    //editar uma turma
    updateTurma: (id_turma, nome_turma, periodo_turma) => {
        return new Promise((resolve, reject) => {
            database.query(
                `UPDATE Turmas SET nome_turma = ?, periodo_turma = ? WHERE id_turma = ?`,
                [nome_turma, periodo_turma, id_turma],
                (err,result) => {
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(result);
                }
            )
        })
    },

    //deletar determinada turma
    deleteTurma: (id_turma) => {
        return new Promise((resolve, reject) => {
            database.query(`DELETE FROM turmas WHERE id_turma = ${id_turma}`, (err, result) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(result)
            })
        })
    },

    //mostrar todas as turmas 
    showTurmas: () => {
        return new Promise((resolve, reject) => {
            database.query(
                `SELECT id_turma, nome_turma, id_professor FROM Turmas`,
                (err, result) => {
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(result);
                }
            )
        })
    }
}

