module.exports = (() => {
    const express = require('express');
    const router = express.Router();
    const userHandler = require('../handlers/userHandler');

    // Define routes
   

    // router.post('/product/SaveProduct',userHandler.productCreation);
    // router.post('/product/updateExitProduct',userHandler.productUpdate);
    router.get('/product/getAllProductList',userHandler.getAllProducts);
    router.post('/product/userNewCreation',userHandler.userCreationNew);
    router.put('/product/updateExitUser/:UniqueId',userHandler.updateUserCreation);
    router.get('/product/getAllUserList',userHandler.getAllUser);
    router.post('/product/authenticationLogin',userHandler.submitLogin);




    console.log('enter route')
    // router.post('/', userHandler.createUser);

    return router;
})();