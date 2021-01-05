const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/api');
const http = require('http');
const socketIo = require('socket.io');
const Infectado = require('./models/infectado');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.set('port', process.env.PORT || 8080 );
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
let interval2;

io.on("connection", socket => {
  console.log("We have a new conecction!!");
  if (interval) {
    clearInterval(interval);
    clearInterval(interval2);
  }

  interval = setInterval(() => {
    Infectado.find()
        .exec()
        .then( x =>  socket.emit("Infectados",x) );
  }, 5000);

  interval2 = setInterval(() => {
    Infectado.aggregate([
      {
        $sortByCount: '$location'
      }
    ])
      .limit(3)
      .exec( (error, infecTop) =>  socket.emit("top3", infecTop ) )

  }, 10000);

  interval2 = setInterval(() => {
    Infectado.aggregate([ { $sortByCount: '$location' } ])
      .limit(3)
      .exec( (error, infecTop) =>  socket.emit("grafica", infecTop ) )

  }, 10000);

  interval3 = setInterval(() => {
    Infectado.aggregate([ { $sortByCount: '$location'  }
    ])
      .exec( (error, infect) =>  socket.emit("grafLocation", infect ) )

  }, 7000);

  interval4 = setInterval(() => {
    Infectado.aggregate([ { $sortByCount: '$state'  }
    ])
      .exec( (error, infect) =>  socket.emit("grafState", infect ) )

  }, 5000);

  interval5 = setInterval(() => {
    Infectado.aggregate([ { $sortByCount: '$infected_type'  }
    ])
      .exec( (error, infect) =>  socket.emit("grafType", infect ) )

  }, 5000);

  interval5 = setInterval(() => {
    Infectado.aggregate([ { $sortByCount: '$age'  }
    ])
      .exec( (error, infect) =>  socket.emit("grafAge", infect ) )

  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client had left!!");
    clearInterval(interval);
    clearInterval(interval2);
  });

});

app.use( router );
server.listen( app.get('port') , () => console.log(`Listening on port ${ app.get('port') }`));