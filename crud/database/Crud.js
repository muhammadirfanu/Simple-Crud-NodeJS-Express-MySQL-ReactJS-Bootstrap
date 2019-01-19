var Connect = require('./Connect');

class Crud {

    constructor(){
        this.Con = Connect.Connecting();
    }
    
    Select_products(where){
        var Conn = this.Con;
        if(where !== undefined){
            let sql = 'Select * from produtos where id_produto = ?';
            return new Promise((resolve, reject) => {
                Conn.query(sql, where, function(err, result){
                    if(err) 
                        reject(new Error(err));
                    else
                        resolve(result);
                });
            });
        }else{
            return new Promise(function(resolve, reject){
                Conn.query('Select * from produtos', (err, result) =>{
                    if(err) 
                        reject(new Error(err));
                    else
                        resolve(result);
                });
            });
        }
    }

    Insert_products(data){
        var Conn = this.Con;
        console.log(data);

            let sql = 'INSERT INTO produtos SET ?';
            return new Promise((resolve, reject) => {
                Conn.query(sql, data, function(err, result){
                    if(err)
                        reject(new Error(err));
                    else
                        resolve(result);
                });
            });
        
    }

    Delete_products(where){
        var Conn = this.Con;
        if(where !== undefined){
            let sql = 'Delete from produtos where id_produto = ?';
            return new Promise((resolve, reject) => {
                Conn.query(sql, where, function(err, result){
                    if(err)
                        reject(new Error(err));
                    else
                        resolve(result);
                });
            });
        }
    }
}
module.exports = new Crud();