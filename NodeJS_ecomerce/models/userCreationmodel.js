const mongoose = require('mongoose');
const { reviewed } = require('../handlers/userHandler');
const productCreationSchema = new mongoose.Schema({

    productUniqueId:{
        type: Number,
        required: true,
        unique:true
    } ,
    MobileName:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
   

})
const productCountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },
 
    value: {
        type: Number,
        default: 800,
    },
    
});
const userCountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },
 
    value: {
        type: Number,
        default: 800,
    },
});

// user creation 
const userCreationSchema = new mongoose.Schema({      
    userUniqueId:{
        type: Number,
        required: true,
        unique:true
    } ,
        userName: {
            type: String,
            required: true,
        },
        userFirstName: {
            type: String,
            required: true,
        },
        userLastName: {
            type: String,
            required: false,
        },
        userEmail: {
            type: String,
            required: true,
        },
        userContact: {
            type: String,
            required: true,
        },
        userPassword: {
            type: String,
            required: true,
        },
        userConfirmPassword: {
            type: String,
            required: true,
        },
        userStatus: {
            type: Boolean,
            required: true,
        },
        userActivity: {
            type: String,
            required: true,
        },
        
        
    
    
});
const productCreate =mongoose.model('productCreation',productCreationSchema);
const productCount= mongoose.model('productCount',productCountSchema);
const userCreation =mongoose.model('userCreation',userCreationSchema);
const userCount = mongoose.model('userCount',userCountSchema);
module.exports = {userCreation,userCount };
