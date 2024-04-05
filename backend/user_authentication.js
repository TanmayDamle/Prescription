const db = require('./DB_processes')
const express = require('express');
const session = require('express-session');
const alert = require('alert');
const app = express();
app.use(
    session({
      secret: '123456',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // Set the expiration time of the cookie
      },
    })
  );
async function registration(request,response){
    try{
        console.log('Inside try block')
        await db.getDBconnection()
        const name = request.body.signup_name
        const username = request.body.signup_uname
        const password = request.body.signup_pwd
        const c_password = request.body.signup_cpwd
        console.log('read input credentials')

        if(password === c_password){
            await db.insertUser(username, password)
            .then(() => {
                })
                .catch((error) => {
                    console.error('Error inserting user:', error);
                });
                console.log('before respone redirect.')
            // req.session.userId = user.id; // Set the user ID obtained from the registration process
            return response.redirect('login')
        }
        else{
            alert("Passwords do not match");
            return response.redirect('signup')
            // throw 'Passwords do not match'
        }
    }
    catch(e){
        console.log(e)
        await db.closeDBconnection()
        return response.redirect('signup')
    }
}

async function login(request,response){
    try{
        await db.getDBconnection()
        console.log("Inside login")
        const l_uname = request.body.login_username
        const l_pass = request.body.login_pwd;
        const user = await db.User.findOne({username:l_uname});
        if(user && user.password == l_pass){
            request.session.username = user.username;
            return response.redirect('home');
        }
        else{
            alert("Invalid credentials.");
            return response.redirect('login');
        }
    }
    catch(e){
        console.log(e)
    }
}
module.exports = {
    registration,
    login
}