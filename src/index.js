import express from 'express';
import handlebars  from 'express-handlebars';
import mongoose from 'mongoose';
// import session from 'express-session'
// import mongoStore from 'connect-mongo'
import apiRouter from './routes/api/api.router.js'
import {Server} from 'socket.io';
import { UsersFileManager } from "./daos/fileManagers/user.manager.js";
import options  from "./config/options.js";

const userService = new UsersFileManager (options.fileSystem.usersFileName);
console.log(userService);


const PORT = 8080;
const app = express();
const httpServer = app.listen( PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});


app.engine('handlebars', handlebars.engine());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(session({
//     name: 'start-solo',
//     secret: 'top-secret-51',
//     resave: false,
//     saveUninitialized: false,
//     store: mongoStore.create({
//       mongoUrl: mongoUri
//     }),
//   }));

app.use('/', apiRouter)


// // DB Connections and Listen
// mongoose.set('strictQuery', false);
// mongoose.connect(mongoUri)
//   .then(() => {
//     const server = app.listen(PORT, () => {
//       console.log(`Server is up and running on port ${server.address().port}`);
//     });
//     server.on('error', (error) => {
//       console.log('Error starting Server');
//       console.error(error);
//     });
//   });


const io = new Server(httpServer);

io.on('connection', (socket)=>{
    console.log("Cliente conectado id:", socket.id);
    
    socket.on('message', (data)=>{
        io.emit('paragraph', data);
    })
})
