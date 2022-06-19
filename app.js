const express = require('express');
const app = express(); 
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv/config');
const api = process.env.API_URL;

 
const productsRouter = require('./routers/products.js');
const ordersRouter = require('./routers/order.js');
const usersRouter = require('./routers/user.js');
const categoriesRouter = require('./routers/categories.js');

app.use(cors()); 
app.options('*',cors ());
//
app.use(express.json()); 
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);




 



//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

app.listen(3000, ()=>{
     console.log('server is running http://localhost:3000');
})