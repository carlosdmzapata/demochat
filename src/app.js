import express from "express";
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import viewsRouter from './routers/views.router.js'

const app = express();
const messages = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use('/', viewsRouter)


const webServer = app.listen(8080, ()=> {
    console.log('Escuchando el 8080 11')
});

const io = new Server(webServer)

io.on('connection', (socket) => {
    
    socket.emit('messages', messages);

    socket.on('message', (message) => {
        console.log(message);
        messages.push(message);
        io.emit('messages', messages)
    });

    socket.on('sayhello', (data)=> {
        socket.broadcast.emit('connected', data)
    })
});


