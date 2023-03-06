import express from 'express';
import handlebars  from 'express-handlebars';
// import mongoose from 'mongoose';
// import session from 'express-session'
// import mongoStore from 'connect-mongo'
import appRouter from './routes/app.routers.js'
import {Server} from 'socket.io';
import __dirname from "./utils.js";
import path from 'path';
import "./config/dbConfig.js"


const PORT = 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname +'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + './views')
app.set('view engine', 'handlebars');

const httpServer = app.listen( PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});

app.use('/', appRouter);

// app.use(session({
    //     name: 'start-solo',
    //     secret: 'top-secret-51',
    //     resave: false,
    //     saveUninitialized: false,
    //     store: mongoStore.create({
        //       mongoUrl: mongoUri
        //     }),
        //   }));
        
const messages = []         

const io = new Server(httpServer);
        
    io.on('connection', (socket) => {
    console.log('new client connected')
    app.set('socket', socket)
    })
        
    io.on('message', (data) => {
    messages.push(data);
    io.emit('message-logs', messages);
    })


