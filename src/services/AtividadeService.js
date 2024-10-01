// atividadeService.js

const database = require('../database');

module.exports = {
    // Criar uma nova atividade
    criarAtividade: (nome_atividade, descricao, data_entrega, peso_nota, id_turma) => {
        return new Promise((resolve, reject) => {
            database.query(
                `SELECT COUNT(*) AS count FROM Turmas WHERE id_turma = ?`,
                [id_turma],
                (err, result)=> {
                    if(err){
                        reject(err);
                        return;
                    }
                    if(result[0].count === 0){
                        reject(new Error("Turma não encontrada."));
                        return;
                    }

                    database.query(
                        `INSERT INTO Atividades (nome_atividade, descricao, data_entrega, peso_nota, id_turma) VALUES (?, ?, ?, ?, ?)`,
                        [nome_atividade, descricao, data_entrega, peso_nota, id_turma],
                        (err, result) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(result);
                        }
                    )
                }

            );
        });
    },

    // Mostrar todas as atividades
    showAtividades: () => {
        return new Promise((resolve, reject) => {
            database.query(
                `SELECT id_atividade, nome_atividade, descricao, data_entrega, peso_nota, id_turma FROM Atividades`,
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                }
            );
        });
    },

    // Atualizar uma atividade
    updateAtividade: (id_atividade, nome_atividade, descricao, data_entrega, peso_nota) => {
        return new Promise((resolve, reject) => {
            database.query(
                `UPDATE Atividades SET nome_atividade = ?, descricao = ?, data_entrega = ?, peso_nota = ? WHERE id_atividade = ?`,
                [nome_atividade, descricao, data_entrega, peso_nota, id_atividade],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                }
            );
        });
    },

    // Deletar uma atividade
    deleteAtividade: (id_atividade) => {
        return new Promise((resolve, reject) => {
            database.query(
                `DELETE FROM Atividades WHERE id_atividade = ?`,
                [id_atividade],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                }
            );
        });
    }
};
