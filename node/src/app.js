import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/api';

const app = express();
app.set('port', process.env.PORT || 3000 );
app.set('MONGO_URI', 'mongodb+srv://covid-chay:admin345@covid19.6yla0.mongodb.net/covid19?retryWrites=true&w=majority')
app.use( bodyParser.json() );
app.use( cors() );

mongoose.connect( app.get('MONGO_URI') , { useNewUrlParser: true, useUnifiedTopology: true } );

app.use('/api', router );
export default app;