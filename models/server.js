const express = require('express');
const http =  require('http');
const socketio  = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //htttp server
        this.server = http.createServer(this.app);
        //sockets
        this.io = socketio(this.server);
    }


    middlewares(){
        //desplegar directorio y resolver la direccion 
        this.app.use(express.static( path.resolve(__dirname + '../public') ) );
    }
    configurarSockets(){
        new Sockets(this.io);
    }
    execute(){
        //inicializar middlewares
        this.middlewares();
        //configurar sockets
        this.configurarSockets();
        //inicializar server
        this.server.listen(this.port, () =>{
            console.log('Server corriendo en el puerto:', this.port);
        });
    }
}

module.exports = Server;