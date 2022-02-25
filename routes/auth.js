const express=require('express');
const router=express.Router();
const passport= require('passport');

const AuthController=require('../controllers/AuthController');



//Post signup
router.post('/signup',AuthController.signup_post);

//Post Login
router.post('/login',AuthController.login_post);

//logout
router.get('/logout',passport.authenticate('jwt', { session: false }),AuthController.logout_get)

module.exports=router;