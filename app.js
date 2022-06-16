const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');


require('dotenv/config');
const api = process.env.API_URL;

app.use(express.json()); 
app.use(morgan('tiny'));

 //Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.catch((err)=> {
    console.log(err);
})

app.get (`${api}/products`, (req,res)=> { 
    const product = { 
        id:1 , 
        name:"headphones",
        image:"some_url",

    };

    res.send(product)
})


app.listen(3000, ()=>{
     console.log('server is running http://localhost:3000');
})