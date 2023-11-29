const express = require('express')
const router = new express.Router()///
const userController = require('../Controller/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddlewares')
const projectController = require('../Controller/projectController')
const multerConfig = require('../Middlewares/multerMiddleware')
//  This is the file that define the route/path
// Eth http request anno frontendil ninnum varunnath ath routerilek varum 

// register API
router.post('/users/register',userController.register)

// login API
router.post('/users/login',userController.login)

// add-project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'), projectController.addProjects)// add-projectinn multer.Config kodukkuka

//getuserprojects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)

// getallprojects
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)

//gethomeprojects
router.get('/projects/home-projects',projectController.getHomeProjects)

//editproject
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)

//deleteproject
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)///

//updateUser
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)

// export router
module.exports = router

