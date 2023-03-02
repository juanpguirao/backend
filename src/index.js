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
app.set('views', __dirname + '/views')
app.use('/statics', express.static(path.resolve(__dirname, '../public')))
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
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
                    
    const httpServer = app.listen( PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    });

            const io = new Server(httpServer);
                    
                    
            io.on('connection', socket => {
                console.log("Cliente conectado id:", socket.id);
                io.on('connection', socket => {
                    console.log('new client connected')
                    app.set('socket', socket)
                })
            })
            