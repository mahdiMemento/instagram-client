const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();

const config = require('config');
const debug = require('debug');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
const swaggerSpec = require('./swagger');


const router = require('./src/routes/index');
const {User} = require('./src/models/user');


mongoose.connect(config.get('db.address'))
.then(()=> { console.log('mongodb connected')})
.catch((err) => { console.log(err)});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api' , router);

const port = process.env.port || 3000;
app.listen(port , () => { console.log(`listening on port ${port}`)});





