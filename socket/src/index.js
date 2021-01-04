const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/api');
const http = require('http');
const socketIo = require('socket.io');
const Infectado = require('./models/infectado');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.set('port', process.env.PORT || 5000 );
app.set('MONGO_URI', 'mongodb+srv://covid-chay:admin345@covid19.6yla0.mongodb.net/covid19?retryWrites=true&w=majority')
app.use( bodyParser.json() );
app.use( cors() );
mongoose.connect( app.get('MONGO_URI') , { useNewUrlParser: true, useUnifiedTopology: true } );

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});


let interval;
io.on("connection", socket => {
  console.log("We have a new conecction!!");
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 10000);

  socket.on("disconnect", () => {
    console.log("Client had left!!");
    clearInterval(interval);
  });

});

const getApiAndEmit = socket => {
  Infectado.find()
        .exec()
        .then( x =>  socket.emit("Infectados",x) );
};

app.use( router );

server.listen( app.get('port') , () => console.log(`Listening on port ${ app.get('port') }`));