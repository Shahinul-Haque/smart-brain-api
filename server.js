const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controller/register');
const profile = require('./Controller/profile');
const image = require('./Controller/image');
const signin = require('./Controller/signin')


const db = knex({

    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 12345,
    database : 'smart-brain'
  }
});


const app = express();


const database= {

	users :[
    {
    	id:'55' ,
    	name: 'John',
    	password:'oo',
    	email:'oo@gmail.com',
    	entries:0,
    	joined: new Date()

    },
    {
    	id:'54' ,
    	name:'Tuhin',
    	password:'cookies',
    	email:'Tuhin@gmail.com',
    	entries:1,
    	joined: new Date()

    }
 
	]
}

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {res.send('Its working !')})

app.post('/signin',(req,res) => { signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res) => { register.handleRegister(req,res,db,bcrypt) })

app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)})
  
app.put('/image',(req,res) => {image.handleImage(req,res,db)})

app.post('/imageUrl',(req,res) => {image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})