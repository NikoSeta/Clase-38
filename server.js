const express = require('express');
const app = express();
const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const passport = require('passport');
const routerLog = require('./src/routes/session');
const routerProd = require('./src/routes/productos');
const carrito = require('./src/routes/carrito');
const { PORT } = require ('./src/config/globals');
const { infoNode } = require('./src/models/infoSistema');
const { multiServer } = require('./src/services/cluster');
const { iniciarMongo } = require('./src/daos/connectMongoDB');
const mensajesModel = require('./src/models/mensajesMongo');
const messages = mensajesModel;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(express.static(__dirname + "/partial"));

iniciarMongo;
//multiServer();

//  INDEX
app.get('/session', routerLog.getRoot);
//  LOGIN
app.get('/login', routerLog.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routerLog.postLogin);
app.get('/faillogin', routerLog.getFaillogin);
//  SIGNUP
app.get('/signup', routerLog.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routerLog.postSignup);
app.get('/failsignup', routerLog.getFailsignup);
//  LOGOUT
app.get('/logout', routerLog.getLogout);
// PROFILE
app.get('/profileUser', routerLog.getProfile);
app.get('/ruta-protegida', routerLog.checkAuthentication, (req, res) => {
    res.render('protected')
});
//  FAIL ROUTE
//app.get('*', routerLog.failRoute);
// PRODUCTOS
app.get('/productos', routerProd.verProductos);
app.post('/productos', routerProd.agregarProd)
app.get('/', routerProd.productosPrincipal);
app.post("/productos:id", routerProd.agregarProd);
// CARRITO
app.get('/cart', carrito.verCarrito);
app.post('/cart:id', carrito.agregarAlCarrito);
app.put('/prod-cart:productId')
app.delete('/prod-cart:productId')
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
const server = app.listen(PORT, () => {
    console.log(`Ir a la página http://localhost:${PORT}/session`);
});
server.on('error', error => console.log(`Error en el servidor ${error}`))

module.exports = { app };