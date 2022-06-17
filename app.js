const express = require('express');
const app = express(); 
 const morgan = require('morgan');
const mongoose = require('mongoose');


require('dotenv/config');
const api = process.env.API_URL;

app.use(express.json()); 
app.use(morgan('tiny'));

const productSchema= mongoose.Schema({
    name: String, 
    image: String, 
    countInStock:Number 

})

const Product = mongoose.model('Product',productSchema);


app.get (`${api}/products`, (req,res)=> { 
    const product = { 
        id:1 , 
        name:"headphones",
        image:"some_url",

    };

    res.send(product)
})

app.post (`${api}/products`, (req,res)=> { 
    const product = new Product ({
      name:  req.body.name, 
      image : req.body.image , 
      countInStock: req.body.countInStock
 })
 product.save().then((createdProduct => {
res.status(201).json(createdProduct) 
 

})).catch((err) => {
res.status(500).json({
error : err, 
success: false 
})
})

 })

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