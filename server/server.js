    /**
     * Node Server 
     */
    const express = require('express');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const config = require('./config/config').get(process.env.NODE_ENV);
    const path = require('path')
    const hogan = require('hogan.js');
    const fs = require('fs');
    /**
     * Express 
     */
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static('frontend/build'))

     /**
     * Mongoose 
     */
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DATABASE);

   
      /*----------- Models Start -----------*/
      const { User } = require('./models/user');
      const { Admin } = require('./models/admin');
      /*----------- Models End -----------*/

      /*--------  Middleware --------------------------*/
       const { auth } = require('./middleware/auth');
  
 
        /**
     * 
     *  Mail ---------------------------------------------  
     * 
     */
    //send email
     app.post("/api/sendMail",(req,res)=>{
       const id = req.query.id;
       const email = req.query.email;
      
        //1.get user data : 
        User.findById(id,(err,doc)=>{
            if(err) return res.status(400).send(err);
           console.log(doc)
       
        
                //nodemailer for sending mail
                const nodemailer = require('nodemailer');
                var smtpTransport = require('nodemailer-smtp-transport');

                //account from which we have to send email make sure use have allow permisions in account https://myaccount.google.com/lesssecureapps
                const transporter = nodemailer.createTransport(smtpTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                    user:  "prakash.raoinfotech@gmail.com", //config.email 
                    pass:  "70462071"              //config.pass //password
                    }
                }));
             
              //template location
               const template = fs.readFileSync(path.join(__dirname,'emails','email_template2.hjs'),'utf-8');
               //compile template
               const compiledTemplate = hogan.compile(template)

               // const mailOptions = req.body;   
               const mailOptions =  {
               from: 'prakash.raoinfotech@gmail.com',
               to: email,
               subject: 'Rao Information Technology',
               html : compiledTemplate.render(doc)
               }

                console.log('mail options ' + mailOptions.text)



                //transporter which send our mail                     
                transporter.sendMail(mailOptions, function(error, info){

                    if(error) return res.json({
                        post : false,
                        info : error
                    })
                
                    res.status(200).json({
                        post : true,
                        info : info.response
                    })
                });
         })
     })
   
     /**
      * 
      * Admin -------------------------------------------
      * 
      */

     //SIGNUP : addUser 
     app.post("/api/signup",(req,res) => {
        const admin = new Admin(req.body);
       
        admin.save((err,doc) => {
            if(err) return res.json({success:false});
            console.log(doc)
            res.status(200).json({
                success : true,
                admin : doc
            })
        })
 })


  //LOGIN 
  app.post("/api/login",(req,res) => {
        const email = req.body.email;
        const pass = req.body.password;
        console.log(email + " " + pass)
        Admin.findOne({ 'email' : email },(err,admin)=> {
        
        if(err) return res.json({success:false});

        if(!admin)  return res.json({
            isAuth : false,
            message : 'Auth Faild , admin not found.'
        })

        admin.comparePassword(pass,(err,isMatch) => {
           
            admin.comparePassword(req.body.password,(err,isMatch)=>{
                if(!isMatch) return res.json({
                    isAuth : false,
                    message : 'Wrong Password'
                });
        
                admin.generateToken((err,admin) => {
                if(err) return res.status(400).send(err);
                res.cookie('auth',admin.token).json({
                    isAuth : true,
                    id : admin._id,
                    email : admin.email,
                    message : 'Login Successfully.'
                })
            })            

        })
            
    })
})

})


//admin auth
app.get("/api/auth",auth,(req,res) => { 
    console.log(auth)
    res.json({
        isAuth : true,
        id : req.admin._id,
        email : req.admin.email,
    })
})


    //GET USER : API FOR USER LOGOUT

    app.get("/api/logout",auth,(req,res)=>{
        req.admin.deleteToken(req.token,(err,admin)=>{
            if(err) return res.status(400).send(err);
            res.sendStatus(200)
        })
      
    })


//GET ADMIN : API FOR ADMIN LOGOUT

app.get("/api/logout",auth,(req,res)=>{
    req.admin.deleteToken(req.token,(err,admin)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
  
})

    /**
     * 
     *  User ---------------------------------------------  
     * 
     */

     //addUser
     app.post("/api/user",(req,res) => {
            const user = new User(req.body);

            user.save((err,doc) => {
                if(err) return res.json({success:false});
                res.status(200).json({
                    success : true,
                    user : doc
                })
            })

     })

     //getUser
     app.get("/api/getUser",(req,res)=>{
        let id = req.query.id;

        User.findById(id,(err,doc)=>{
            if(err) return res.status(400).send(err);
            res.send(doc)
        })

    })

    //getUsers
    app.get("/api/getUsers",(req,res)=>{
        // http://localhost:3001/api/getUsers?skip=3&limit=2&order=asc
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const order =  req.query.order;             // ORDER = asc || desc 

        User.find().skip(skip).sort({_id : order}).limit(limit).exec((err,doc)=>{
            if(err) return res.status(400).send(err);
            res.send(doc)
        })  

    })

    //update_user
    app.post("/api/update_user",(req,res)=>{
        const user = new User(req.body);
        console.log(user)

        User.findByIdAndUpdate(user._id,{$set:user},{ new : true },(err,doc)=>{
            if(err) return res.json({
                success : false,
                doc
            });
            res.json({
                success : true,
                doc  
            })
        })
    })


    //delete_user
    app.delete("/api/delete_user",(req,res)=>{
        const id =  req.query.id;

        User.findByIdAndRemove(id,(err,doc)=>{
           if(err) return res.status(400).send(err);
           res.json(true)
        })
   })




    if(process.env.NODE_ENV === 'production'){
        const path  =  require('path');
        app.get('/*',(req,res)=>{
            res.sendfile(path.resolve(__dirname,'frontend','build','index.html'))
        })
    }

  
    const port = process.env.PORT || 3003;
    app.listen(port,()=>{
        console.log('SERVER RUNNING.')
    })


