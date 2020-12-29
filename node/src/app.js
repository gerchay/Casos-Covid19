import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 3000 );
app.use( bodyParser.json() );
app.use( cors() );

mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true } );

export default app;