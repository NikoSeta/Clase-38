//Servidor Express
const express = require('express');
const app = express();
//HTTP server para Socket.IO
const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const mensajesModel = require('./src/models/mensajesMongo');
const messages = mensajesModel;
//Puerto
const { PORT } = require ('./src/config/globals');
//Routs
const routerCart = require('./src/routes/carrito');
const routerProd = require('./src/routes/carrito');
const routerLog = require('./src/routes/carrito');

const { infoNode } = require('./src/models/infoSistema');
const { multiServer } = require('./src/services/cluster');
const { iniciarMongo } = require('./src/daos/connectMongoDB');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(express.static(__dirname + "/partial"));

iniciarMongo;
//multiServer();

app.use('/cart', routerCart);
app.use('/productos', routerProd);
app.use('/session', routerLog);

//MENSAJERÍA    
app.get('/chat:status', (req, res)=>{ // SOCKET.IO MENSAJERÍA
    let statusIo = req.params.status;
    if(statusIo = 'on'){
        io.on('connection', (socket) => {
            console.log('Cliente conectado');
            socket.emit('messages', messages);
        
            socket.on('new-message', data => {
                messages.push(data);
                io.sockets.emit('messages', messages);
            })
        })
        res.render('chat')
    }else{
        console.log(err);
    }
});
// INFO SISTEMA
app.get('/info', (req, res)=>{
    res.render('infoSistema', {infoNode: infoNode})
});
// SERVIDOR ESCUCHANDO
httpServer.listen(PORT, () => {
    console.log(`Ir a la página http://localhost:${PORT}`);
});
httpServer.on('error', error => console.log(`Error en el servidor ${error}`))

module.exports = { app };