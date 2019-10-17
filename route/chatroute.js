const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./../dbconnect");
const Chat = require("./../models/Chat");
const User = require("./../models/user");
const Connecte = require("./../models/connecte");
const app = express.Router();
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const http = require("http").Server(app);

const io = require("socket.io")(http);
// require the socket.io module

//bodyparser middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(fileUpload());
app.use(express.static(__dirname + "/public"))

 //  construction route src localhost img CHAT
 Chat.find().then(produit=>{
        for(let i=0;i<produit.length;i++){
          app.get("/publicChat/"+produit[i].image,(req,res)=>{
              var fs = require("fs")
             console.log( "./public/"+produit[i].image);
             
             var image= fs.readFileSync("./public/photochat/"+produit[i].image)
             res.send(image)
          })
        }
    })
 //gerer les utilisateurs
 app.get('/register', (req, res, next) => {
    res.redirect("/register.html")
  })

   app.post('/register', (req, res, next) => {
    
    User.find().then(cht=>{
        var id;
          if(cht.length==0){
            id=0
          }
          else{
            id=cht[cht.length-1]._id+1
          }
     User.findOne({nom:req.body.nom}).then(user=>{
          if(user){
            res.send("cet utilisateur existe deja essayer un autre")
          }else{
             let chatMessage = new User({ 
        _id:id,
       nom: req.body.nom ,
        password: req.body.password,
      });
      console.log(chatMessage)
      chatMessage.save().then(re=> res.send(re));
          }
     })
         
      })

  })
   let clients=0
   
   
    //gere l envoi message
    app.post("/envoimessage/:_id",(req,res)=>{
             User.findOne({_id:req.params._id}).then(sende=>{
                     Chat.find().then(cht=>{
                        var id;
                        if(cht.length==0){
                          id=0
                        }
                        else{
                          id=cht[cht.length-1]._id+1
                        }
                        let chat= new Chat({
                          _id:id,
                          idsender:sende._id,
                          sender:sende.nom,
                          receiver:req.body.receiver,
                          message:req.body.message
                        })
                        if(req.body.message && req.body.receiver){
                          chat.save().then(mess=>res.send(mess))
                        }
                             })
                         
                       })
               })
    //recuperer les messages envoye par un sender
     app.get("/messagesender/:_id",(req,res)=>{
             Chat.find().then(sende=>{
                    var tab=[]
                     for (var i = 0; i <sende.length; i++) {
                        if(req.params._id ==sende[i].idsender){
                          tab.push(sende[i]) 
                        }
                      }
                      res.send(tab)
                       })
               })
     //recuperer tous les messages
       app.get("/mess",(req,res)=>{
             Chat.find().then(sende=>{
                Chat.find().then(produit=>{
                for(let i=0;i<produit.length;i++){
                  app.get("/publicChat/"+produit[i].image,(req,res)=>{
                      var fs = require("fs")
                     console.log( "./public/"+produit[i].image);
                     var image= fs.readFileSync("./public/photochat/"+produit[i].image)
                     res.send(image)
                  })
                }
            })
                      res.send(sende)
                       })
               })
    app.get('/user', (req, res, next) => {
    
    User.find().then(cht=>{
       res.send(cht)
         
      })

  })



module.exports = app;
