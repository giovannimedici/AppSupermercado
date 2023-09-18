import * as SQLite from 'expo-sqlite'

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbStore.db');
    return cx;
}

export async function createTableCompras(){
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbCompras
        (
            id text not null primary key,
            produtos text not null,
            data text null,
            totalVenda text null
        )`;

        let dbCx = getDbConnection();        
        
        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbProdutos
        (
            id text not null primary key,
            nome text not null,
            preco text null        
        )`;

        let dbCx = getDbConnection();        
        
        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true); 
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};


export function obtemTodasCompras() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbCompras order by 1 desc';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            produtos: registros.rows.item(n).produtos,
                            data: registros.rows.item(n).data,
                            totalVenda: registros.rows.item(n).totalVenda
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemTodosProdutos() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbProdutos order by 1 desc';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            nome: registros.rows.item(n).nome,
                            preco: registros.rows.item(n).preco
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function adicionaCompra(compra) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbCompras (id, produtos, data, totalVenda) values (?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [compra.id, compra.produtos, compra.data, compra.totalVenda],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function adicionaProduto(produto) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbProdutos (id, nome ,preco) values (?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.id, produto.nome, produto.preco],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function alteraProduto(produto) {
    console.log('começando o método alteraProduto');
    return new Promise((resolve, reject) => {
        let query = 'update tbProdutos set nome=?, preco=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.nome, produto.preco, produto.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}



export function excluiProduto(id) {
    console.log('Apagando produto ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function excluiTodosProdutos() {
    console.log("Apagando todos os produtos...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}