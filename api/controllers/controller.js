const Product = require('../models/product');
const moment = require('moment');
const Order = require('../models/order');


module.exports = {

    getBaseUrl: (req, res, next)=>{
        res.status(200).json({
            Error: false,
            message: 'Welcome to product api'
        });
    },

    getAllProducts: (req, res, next)=>{
        Product.find({})
        .select('name price _id created_at')
        .exec()
        .then(products =>{
            const response = {
                Error: false,
                count: products.length,
                request_method: 'GET',
                products: products.map( product =>{
                    return{
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        created_at: product.created_at
                    }
                })
            }
            res.status(202).json(response);

        }).catch(err =>{
            res.status(400).json({
                message: err.message,
                feedback: 'An error occured whilst getting all'
            })
        });
    },
    createProduct: (req, res, next)=>{
        const product = new Product(req.body);
        product.save()
        .then( product=>{

            const response = {
                Error: false,
                message: 'Product succesfully saved into db',
                createdProduct: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    created_at: product.created_at
                }
            };
            res.status(201).json(response)
        })
        .catch( err=>{
            res.status(500).json({
                Error: false,
                message:err.message
            });
        });
    },
    getProduct: (req, res, next)=>{
        Product.findById(req.params.id)
        .select('_id name price created_at')
        .exec()
        .then( (product)=>{
            res.status(201).json({
                Error:false,
                product: product
            });
        })
        .catch(err=>{
            res.status(500).json({
                Error: false,
                message:err.message
            });
        });
    }, 

    patchProduct: (req, res, next)=>{
        let newBody = {
            name: req.body.name,
            price: req.body.price,
            created_at: moment().format('dddd MMMM Do YYYY, h:mm:ss a')
        }
        Product.findByIdAndUpdate(req.params.id, 
            newBody, {new: true})
            .select({'__v':0})
            .then( newProd=>{
                res.status(202).json({
                    Error: false,
                    message: 'product succesfully updated',
                    updated_product: newProd
                })
            })
            .catch( err=>{
                res.json({
                    Error: true,
                    message: err.message
                })
            })
    },
    deleteProduct: (req, res, next)=>{
        Product.deleteOne({_id: req.params.id})
        .then( product=>{
            res.status(200).json({
                Error: false,
                message: `The product was succesfullt deleted`
            });
        })
        .catch( err=>{
            res.json({
                Error: true,
                message: err.message
            })
        });
    },

    // code base for order routes

    getOrderBase: (req, res, next)=>{
        res.status(200).json({
            Error:false,
            message: 'Welcome to order api'
        });
    },
    getAllOrders: (req, res, next)=>{
        
    },
    createOrder: (req, res, next)=>{
        Product.findById(req.body.productID)
        .select({"__v":0, 
        "created_at":0, "_id":0})
        .then( product=>{
            if(!product){
                res.status(404).json({
                    statusCode: 404,
                    message: 'product not found'
                });
            }
            const order = new Order({
                productID: req.body.productID,
                quantity: req.body.quantity
            });
            order.save()
            .then( order=>{
                res.status(201).json({
                    Error:false,
                    message: 'Order was made succesfully',
                    order: {
                        orderID: order._id,
                        time_ordered: order.ordered_at,
                        quantity: order.quantity,
                        productID: order.productID,
                        ordered_product: product
                    }
                })
            })
            .catch( err=>{
                res.status(500).json({
                    Error: true,
                    message: err.message
                })
            });
        })
        .catch( err=>{
            res.status(500).json({
                Error: true,
                message: err.message
            })
        });
    },
    getOrder: (req, res, next)=>{
        
    },
    deleteOrder: (req, res, next)=>{
        
    }
}