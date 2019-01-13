const Product = require('../models/product');


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
        Product.save(req.body)
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
        .catch();
    }
}