const mysql = require('mysql');
const connection = require('../api/connection')

class Item {

    getItems = (req, res) => { //Con el metodo get definimos la ruta (endpoint) y pasamos un callback
        connection.query('SELECT * FROM articulos', (error, filas)=>{
            if (error) {
                throw error;
            } else {
                res.send(filas);
            }
        })
    }

    getItem = (req, res) => {
        connection.query('SELECT * FROM articulos where id = ?',[req.params.id], (error,fila)=>{
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
        connection.query(sql, data, (error, results) => {
            if(error){
                throw error;
            }
            else{
                res.send(results);
            }
        });
    }

    updateItem = (req, res)=>{
        const { id } = req.params
        const { nombre, precio, stock } = req.body
        
        let sql = "UPDATE articulos SET nombre = ?, precio = ?, stock = ? WHERE id = ?";
        connection.query(sql, [nombre, precio, stock, id], (error, resultados) => {
            if (error) {
                throw error;
            } else {
                res.send(resultados);
            }
        })
    }

    deleteItem = (req,res)=>{
        connection.query('DELETE FROM articulos WHERE id = ?', [req.params.id], (error, result) => {
            if (error) {
                throw error;
            } else {
                res.send(result);
            }
        });
    }
}

module.exports = new Item()