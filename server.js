require('dotenv').config();

var Product = require('./Product.model');
var Student = require('./Student.model');
var express = require('express');
var multer = require('multer')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,__dirname+"/uploads")},
    filename:function(req,file,cb){
        cb(null,file.fieldname)
    }
})
var upload = multer({storage:storage})
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname+"/public"))
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.post("/uploadfile",upload.single('myfile'),function(req,res){
    console.log(req.file);
    res.send("Please wait")
})
app.get("/students",function(req,res){
    Student.find().then(function(data){
        res.json(data)
    }).catch(function(err){
        console.log(err)
    })
})

app.get("/addProduct",function(req,res){
    res.sendFile(__dirname+"/addProd.html")
})

app.post("/addProduct",function(req,res){
    console.log(req.body)
    var newProduct = new Product(req.body)
    newProduct.save();
    res.redirect("/products")
})
app.get("/products",function(req,res){
    console.log("redirected to products")
    Product.find().then(function(data){
        // res.render("productList",{products:data})
        res.json(data)
    })
})
app.get("/editProduct/:title",function(req,res){
    Product.find({title:req.params.title})
    .then(function(product){

        res.render("editProdForm",{product:product[0]})
    })
})
app.delete("/products/:title",function(req,res){
    Product.deleteOne({title:req.params.title})
    .then(function(){
        res.json({message:'deleted'})
    })
    .catch(function(err){
        console.log(err)
        res.json({message:'notdeleted'})
    })
})
app.put("/updateProduct",function(req,res){
    console.log(req.body)
    res.send({message:'okchuddam'})
})

app.listen(process.env.PORT,function(){console.log("server running on "+process.env.PORT)})
/*
    browser             server
                  <--  html 
    urlencoded-->
    formdata-->
    jsondata-->
    multipartdata-->

*/