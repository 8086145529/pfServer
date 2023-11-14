const express = require('express')
const router = new express.Router()
const userController = require('../Controller/userController')

//  This is the file that define the route/path
// Eth http request anno frontendil ninnum varunnath ath routerilek varum 
// register API
router.post('/users/register',userController.register)

// export router
module.exports = router

