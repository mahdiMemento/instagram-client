require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();
const winston = require('winston');

const config = require('config');
const debug = require('debug')("app:main");
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
const swaggerSpec = require('./swagger');


const router = require('./src/routes/index');
const {User} = require('./src/models/user');

winston.add(new winston.transports.File({ filename : 'logfile.log'}));

/* connecting mongodb by mongoose */
mongoose.connect(config.get('db.address'))
.then(()=> { debug('mongodb connected')})
.catch((err) => { debug(err)});

/* robust error handling */
process.on('uncaughtException' , (ex) => {
    console.log('uncaught exception');
    winston.error(ex.message , ex);
});

process.on('unhandledRejection' , (ex) => {
    console.log('unhandled rejection');
    winston.error(ex.message , ex);
});


/* middlewares for 1.processability of json and url-encoded requests
2. provide an interactive API documentation interface by swagger UI  */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api' , router);


/* listening and port defination */
const port = process.env.port || 3000;
app.listen(port , () => { console.log(`listening on port ${port}`)});





