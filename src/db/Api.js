const express = require('express');
const querystring = require('querystring');
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId; 
const app = express()
const port = 2780;
const db = require('./connection');
const {ElectroniProduct,ApplicationProduct,FashionProduct,HomeProduct,GroceryProduct,ToyProduct} = require('./schema');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json())
var cors = require('cors');
app.use(cors())


app.listen(port,()=> {
    console.log(`Listen on port ${port}`)
})

app.post('/add', (req,res)=>{
    if(req.body){
        const data = req.body.body
        if(data.category == "Electronic"){
        const finalData = {
            name: data.name,
            image: data.image,
            price: data.price,
            discount: data.discount,
            category:data.category,
            type:data.type,
            rating:data.rating,
            inStock:data.inStock,
            deliveryfree:data.deliveryfree,
            RAM:data.RAM,
            ROM:data.ROM,
            color:data.color,
            battery:data.battery 
        }
            const electroniProduct = new ElectroniProduct(finalData)
            electroniProduct.save((err)=>{
                if(err)
                    console.log(err)
                else
                    console.log('Data Added')
            })
        }
        else {
            const finalData = {
                name: data.name,
                image: data.image,
                price: data.price,
                discount: data.discount,
                category:data.category,
                type:data.type,
                rating:data.rating,
                inStock:data.inStock,
                deliveryfree:data.deliveryfree
            }
            if(finalData.category == "Application"){
                const appliProduct = new ApplicationProduct(finalData)
                appliProduct.save((err)=>{
                    if(err)
                        console.log(err)
                    else
                        console.log('Data Added')
                })
            }
            if(finalData.category == "Fashion"){
                const fashProduct = new FashionProduct(finalData)
                fashProduct.save((err)=>{
                    if(err)
                        console.log(err)
                    else
                        console.log('Data Added')
                })
            }
            if(finalData.category == "Home"){
                const homeProduct = new HomeProduct(finalData)
                homeProduct.save((err)=>{
                    if(err)
                        console.log(err)
                    else
                        console.log('Data Added')
                })
            }
            if(finalData.category == "Grocery"){
                const groceryProduct = new GroceryProduct(finalData)
                groceryProduct.save((err)=>{
                    if(err)
                        console.log(err)
                    else
                        console.log('Data Added')
                })
            }
            if(finalData.category == "Toy"){
                const toyProduct = new ToyProduct(finalData)
                toyProduct.save((err)=>{
                    if(err)
                        console.log(err)
                    else
                        console.log('Data Added')
                })
            }
        }
        
    }

})

app.get("/product",(req,res)=>{
    let {query} = req
    if(query.category=="Electronic"){
        ElectroniProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Application"){
        ApplicationProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Fashion"){
        FashionProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Home"){
        HomeProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Grocery"){
        GroceryProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Toy"){
        ToyProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
})

app.get("/product/:category/:id",(req,res)=>{
    let { params } = req
    let { category,id } = params
    let obj_id = new ObjectId(id);
    if(category=="Electronic"){
        ElectroniProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Application"){
        ApplicationProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Fashion"){
        FashionProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Home"){
        HomeProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Grocery"){
        GroceryProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Toy"){
        ToyProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
        .catch((err)=>console.log(err))
    }
})

app.put('/edit/:id', (req,res)=>{
    let {body,params} =  req
    let obj_id = new ObjectId(params.id);
    if(body){
        const data = body.body
        if(data.category == "Electronic"){
        const finalData = {
            name: data.name,
            image: data.image,
            price: data.price,
            discount: data.discount,
            category:data.category,
            type:data.type,
            rating:data.rating,
            inStock:data.inStock,
            deliveryfree:data.deliveryfree,
            RAM:data.RAM,
            ROM:data.ROM,
            color:data.color,
            battery:data.battery 
        }
            ElectroniProduct.updateOne({ _id:obj_id },{ $set : finalData })
            .then((result)=> res.send(result))
            .catch((err)=>console.log(err))
        }
        else {
            const finalData = {
                name: data.name,
                image: data.image,
                price: data.price,
                discount: data.discount,
                category:data.category,
                type:data.type,
                rating:data.rating,
                inStock:data.inStock,
                deliveryfree:data.deliveryfree
            }
            if(finalData.category == "Application"){
                ApplicationProduct.updateOne({ _id:obj_id },{ $set : finalData })
                .then((result)=> res.send(result))
                .catch((err)=>console.log(err))
            }
            if(finalData.category == "Fashion"){
                FashionProduct.updateOne({ _id:obj_id },{ $set : finalData })
                .then((result)=> res.send(result))
                .catch((err)=>console.log(err))
            }
            if(finalData.category == "Home"){
                HomeProduct.updateOne({ _id:obj_id },{ $set : finalData })
                .then((result)=> res.send(result))
                .catch((err)=>console.log(err))
            }
            if(finalData.category == "Grocery"){
                GroceryProduct.updateOne({ _id:obj_id },{ $set : finalData })
                .then((result)=> res.send(result))
                .catch((err)=>console.log(err))
            }
            if(finalData.category == "Toy"){
                ToyProduct.updateOne({ _id:obj_id },{ $set : finalData })
                .then((result)=> res.send(result))
                .catch((err)=>console.log(err))
            }
        }
        
    }

})