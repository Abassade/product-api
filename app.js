const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const enviroment = process.env.NODE_ENV;

if(enviroment === 'development'){
    app.use(morgan('dev'));
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('connected', console.info('mongo connected'));



app.use(require('./api/routes/product'));
app.use(require('./api/routes/orders'));

app.use( (req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
    });

    app.use( (error, req, res, next)=>{
        res.status(error.status || 500);
        res.json({
            error:{
                status: error.status,
                message: error.message
            }
        });
        });

app.listen(port, ()=>console.log(`App is listening on port ${port}`));