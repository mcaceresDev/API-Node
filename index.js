const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',function(req, res){
    res.send('Home');
})

// declaramos una variable de entorno por si el puerto esta ocupado
//las variables de entorno se declaran con 'process' . 'env' -> de enviroment
//tambien podemos asignarle un valor a PUERTO con "set Puerto=4000" u otro valor
const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function(){
    console.log("Servidor OK en el puerto: " + puerto);
});

// BASE DE DATOS
//-----------------------------

//establecemos los parametros
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbarticulos'
});

//probamos la conexion
conexion.connect(function(error){
    if (error) {
        throw error;
    } else {
        console.log("Conexion exitosa a la base de datos");
    }
});

//--------------------------------------------------------
//mostrar todos los articulos
app.get('/api/articulos', (req, res) => { //Con el metodo get definimos la ruta (endpoint) y pasamos un callback
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    })
});

//mostrar 1 articulo
app.get('/api/articulos/:ide', (req, res) => {
    conexion.query('SELECT * FROM articulos where id = ?',[req.params.ide], (error,fila)=>{
        if (error) {
            throw error;
        } else {
            res.send(fila);
        }
    });
});

//crear articulo
app.post('/api/articulos', (req,res)=>{ //Con el metodo post definimos la ruta (endpoint) y pasamos un callback
    let data = {nombre:req.body.nombre, precio:req.body.precio, stock:req.body.stock};//aca definimos los datos a enviar (crear)
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error;
        }
        else{
            res.send(results);
        }
    });
});

//modificar articulo
app.put('/api/articulos/:id', (req, res)=>{
    let id = req.params.id;
    let nombre = req.body.nombre; 
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = "UPDATE articulos SET nombre = ?, precio = ?, stock = ? WHERE id = ?";
    conexion.query(sql, [nombre, precio, stock, id], function(error, resultados){
        if (error) {
            throw error;
        } else {
            res.send(resultados);
        }
    })
});


//borrar articulo
app.delete('/api/articulos/:id', (req,res)=>{
    conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(error, result){
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    });
});





