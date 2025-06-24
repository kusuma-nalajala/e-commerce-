module.exports = (() => {
    const userMethods = require('../apiMethods/reportMethod');
   
    return {
        
        
        getAllProducts:(req,res)=>userMethods.listOfProducts(req,res),
        userCreationNew:(req,res)=>userMethods.userCreationSave(req,res),
        getAllUser:(req,res)=>userMethods.getAllUserLists(req,res),
        updateUserCreation:(req,res)=>userMethods.updateUserCreation(req,res),
        submitLogin:(req,res)=>userMethods.userLogin(req,res),


    };
})();