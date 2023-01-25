require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const itemsRoutes = require('./routes/items.routes')

class Server {
    app
    port
    endPoints = {
        items: "/api/items"
    }
    connection

    constructor () {
        this.app = express();
        // declaramos una variable de entorno por si el puerto esta ocupado
        //las variables de entorno se declaran con 'process' . 'env' -> de enviroment
        //tambien podemos asignarle un valor a PUERTO con "set Puerto=4000" u otro valor
        this.port = process.env.PORT || 3050;
        this.middlewares();
        this.setRoutes();        
    }
    
    middlewares () {
        this.app.use(express.json());
        this.app.use(cors());
    }

    setRoutes () {
        const { items } = this.endPoints
        this.app.use(items, itemsRoutes)
    }
    
    startServer () {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
        
        this.app.get('/',function(req, res){
            res.send(`<h1>Bienvenido a mi Api</h1>`);
        })
    }
    
}

const server = new Server()
server.startServer()