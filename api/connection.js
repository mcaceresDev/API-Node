const mysql = require('mysql');

class Connection {
    
    static instance
    connection
    
    constructor() {
        getInstance()
        // this.connectDB()
    }

    static getInstance = () => {
        if (Connection.instance) {
            return instance
        }
        
        Connection.instance = this
        this.connection = mysql.createConnection({
            host:     process.env.DBHOST,
            user:     process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBNAME
        });
    }

    connectDB = this.connection.connect((error) => {
        if (error) {
            console.log("Problema al conectar con la BD");
            throw error;
        } else {
            console.log("Conexion exitosa a la base de datos");
        }
    });
}

module.exports = new Connection()