const app = require('../app');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../api/models/user')
const product = require('../api/models/product')
const Order = require('../api/models/order')

const should = chai.should();
chai.use(chaiHttp);

describe('BaseSchema', ()=> {

    beforeEach( done=>{
      product.deleteMany({}, (err) => { 
        done();           
       });  
  
    });
  
    afterEach( done=>{
      done();
    });
  
    it('should list ALL products', done=> {
      
  });

});