var mysql = require('mysql');

class Connect {
    
    Connecting () {       
        let con = mysql.createConnection({
            host: "localhost",
            user: "crud",
            password: "123",
            database: "crud"
        });         
        return con;
    }    

}
module.exports = new Connect();