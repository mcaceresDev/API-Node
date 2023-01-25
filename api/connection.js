const mysql = require('mysql');

class Connection {
    
    static instance
    
    constructor() {
        if (Connection.instance) {
            return Connection.instance
        }

        Connection.instance = mysql.createConnection({
            host:     process.env.DBHOST,
            user:     process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBNAME
        });

        Connection.instance.connect((error) => {
            if (error) {
                console.log("Problema al conectar con la BD");
                throw error;
            } else {
            console.log("Conexion exitosa a la base de datos");
            }
        });

        return Connection.instance
    }

}

module.exports = new Connection()