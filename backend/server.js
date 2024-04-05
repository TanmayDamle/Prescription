var express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const PORT = 3000;
const uauth = require('./user_authentication');
const p_op = require('./patient_operations');
const reqAuth = require('./requireAuthmiddleware');
// const db = require('./DB_processes')
// const nodemailer =  require('nodemailer');
var bodyparse = require('body-parser');

app.use(bodyparse.json());
app.use(express.static('public'));
app.use(bodyparse.urlencoded({extended:true}));
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.use(reqAuth)
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '../frontend/pages')));
app.set('views', path.join(__dirname, '../frontend/pages/'));
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)


app.get('/index', async function(req,res,){
    res.render('index.html');
});

app.get('/signup',async function(req,res,){
    res.render('signup.html');
});

app.get('/login', async function(req,res,){
    res.render('login.html')
});
app.get('/home', async function(req,res){
    res.render('home.html')
});

app.get('/view_patient', async function(req,res){
    res.render('view_patient.html')
});

app.get('/countpatients', async function(req,res){
    p_op.countpatients(req,res)
});

app.get('/searchPatient', async function(req,res){
    p_op.searchPatient(req,res)
});

app.get('/add_new_patient', async function(req,res){
    res.render('add_new_patient.html')
});


app.post('/signup', async function(req,res,){
    uauth.registration(req, res); 
});

app.post('/login', async function(req,res){
    uauth.login(req, res);
    req.session.username = req.body.login_username
})

app.post('/add_new_patient', async function(req,res){
    p_op.add_new_patient(req,res);
})

app.post('/view_patient', async function(req,res){
    p_op.searchPatient(req,res);
});



app.listen(PORT, function () {
    console.log('App is running on Port', PORT)
});
