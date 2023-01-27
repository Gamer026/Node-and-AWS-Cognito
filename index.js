'use strict';
global.fetch = require('node-fetch')
require('dotenv').config();
const Cognito = require('./cognito/index');
const { verify } = require('./cognito/index');
const body = {
   email: "mk@yopmail.com",
   password: "Test123456!",
   name:'mk'
};

const Signup = async() => {
    const response = await Cognito.signUp(body.email,body.password,body.name);
    console.log(response);
}

const Verify = async () => {
    const response = await Cognito.verify(body.email,'248346');
    console.log(response);
}

const SignIn = async () => {
    const response = await Cognito.signIn(body.email,body.password);
    console.log(response);
}
const ForgotPassword = async () => {
    const response = await Cognito.forgotPassword(body.email);
    console.log("response",response);
}
const ConfirmPassword = async () => {
    const response = await Cognito.forgotPassword(verificationCode,newPassword);
    console.log("response",response);
}
// Signup();
// Verify();
// SignIn();
// ForgotPassword();
//ConfirmPassword();
