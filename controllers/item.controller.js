const mysql = require('mysql');
require('dotenv').config()
const server = require("../index")

class Item {
    connection
    con = {
        host:     process.env.DBHOST,
        user:     "root", //process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME
    }

    constructor () {
        this.connection = mysql.createConnection({
            host:     process.env.DBHOST,
            user:     "root", //process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBNAME
        });

        this.connection.connect((error) => {
            if (error) {
                console.log("Problema al conectar con la BD");
                throw error;
            } else {
                console.log(this.con);
                console.log("Conexion exitosa a la base de datos");
            }
        });
    }

    getItems = (req, res) => { //Con el metodo get definimos la ruta (endpoint) y pasamos un callback
        this.connection.query('SELECT * FROM articulos', (error,filas)=>{
            if (error) {
                throw error;
            } else {
                res.send(filas);
            }
        })
    }

    getItem = (req, res) => {
        this.connection.query('SELECT * FROM articulos where id = ?',[req.params.id], (error,fila)=>{
            if (error) {
                throw error;
            } else {
                res.send(fila);
            }
        });
    }

    addNew = (req,res)=>{ //Con el metodo post definimos la ruta (endpoint) y pasamos un callback
        let data = {nombre:req.body.nombre, precio:req.body.precio, stock:req.body.stock};//aca definimos los datos a enviar (crear)
        let sql = "INSERT INTO articulos SET ?";
        this.connection.query(sql, data, function(error, results){
            if(error){
                throw error;
            }
            else{
                res.send(results);
            }
        });
    }

    updateItem = (req, res)=>{
        let id = req.params.id;
        let nombre = req.body.nombre; 
        let precio = req.body.precio;
        let stock = req.body.stock;
        let sql = "UPDATE articulos SET nombre = ?, precio = ?, stock = ? WHERE id = ?";
        this.connection.query(sql, [nombre, precio, stock, id], function(error, resultados){
            if (error) {
                throw error;
            } else {
                res.send(resultados);
            }
        })
    }

    deleteItem = (req,res)=>{
        this.connection.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(error, result){
            if (error) {
                throw error;
            } else {
                res.send(result);
            }
        });
    }
}

module.exports = new Item()