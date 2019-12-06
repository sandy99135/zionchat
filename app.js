
//require the express module
const express = require("express");
const app = express();
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatroute");
const loginRouter = require("./route/loginRoute");
const fileUpload = require('express-fileupload');
//require the http module
const http = require("http").Server(app);
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// require the socket.io module
const io = require("socket.io")(http);
const Chat = require("./models/Chat");
const User = require("./models/user");
const Agent = require("./models/agent");
const Disponible = require("./models/disponible");
const wysiwing = require("./models/listewysiwing");
const Photo = require("./models/photoChat");
const PhotoChat = require("./models/chatphoto");
const Video = require("./models/video");
const Gallerie = require("./models/gallerie");
const Fichier = require("./models/fichier");

const Connecte = require("./models/connecte");
const connect = require("./dbconnect");
const port =process.env.PORT|| 4000;
var mess="";
var snd=""
//bodyparser middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
// app.use('/public', express.static(__dirname + '/public'));
// app.use(express.static(__dirname + "/public"))
//routes
app.use("/", chatRouter);

//set the express.static middleware
app.use(express.static(__dirname + "/public"));



//login client

app.get("/login",function(req,res){
  res.sendFile(__dirname + "/public/login.html")
})

//login agent

app.get("/loginagent",function(req,res){
  res.sendFile(__dirname + "/public/login.html")
})




// affichage block soket

let clients = 0

//login pour les clients
  app.post('/login', (req, res, next) => {
     User.findOne({nom:req.body.nom}).then(user=>{
          if(!user){
            res.send("cet utilisateur nexiste pas")
          }else{
             if(user.password==req.body.password){
             
             Connecte.find().then(connecte=>{
                   var id;
               if(connecte.length==0){
                 id=0
               }
               else{
                 id=connecte[connecte.length-1]._id+1
               }
               const con=new Connecte({
                _id:id,
                iduser:user._id,
                nom:user.nom,
                password:user.password,
                client:0
               })
               Connecte.findOne({nom:con.nom}).then(use=>{
                if(!use){
                    con.save().then(utilisateur=> res.send(utilisateur))
                    
                  }else{
                    console.log(use)
                    res.send(use)
                  }
                
                   
               })
             
             })
             
              
             }
             else{
               res.send("ereur mot de passe")
             }
   
          }
     })
         
      })
console.log(clients)
  //login pour les agents
  app.post('/loginagent', (req, res, next) => {
     Agent.findOne({nom:req.body.nom}).then(user=>{
          if(!user){
            res.send("cet utilisateur nexiste pas")
          }else{
             if(user.password==req.body.password){
             
             Disponible.find().then(connecte=>{
                   var id;
               if(connecte.length==0){
                 id=0
               }
               else{
                 id=connecte[connecte.length-1]._id+1
               }
               const con=new  Disponible({
                _id:id,
                iduser:user._id,
                nom:user.nom,
                password:user.password,
                client:0
               })
               Disponible.findOne({nom:con.nom}).then(use=>{
                if(!use){
                  con.save().then(utilisateur=> res.send(utilisateur))
                    
                  }else{
                    console.log(use)
                    res.send(use)
                  }
                
                   
               })
             
             })
             
              
             }
             else{
               res.send("ereur mot de passe")
             }
   
          }
     })
         
      })
             

    function SendOffer(offer) {
      console.log(offer)
      this.broadcast.emit("BackOffer", offer)
    }
    function SendAnswer(data) {
      console.log(data)
      this.broadcast.emit("BackAnswer", data)
    }
                     
    app.get("/connect",(req, res, next) => {
      Connecte.find().then(connecte=>{
        res.send(connecte)
      })
    })
     app.get("/disponible",(req, res, next) => {
      Disponible.find().then(connecte=>{
        res.send(connecte)
      })
    })
  

    app.get("/deconnect/:_id",(req,res)=>{
      Connecte.findByIdAndRemove(req.params._id).then(connecte=>{
        clients --
        if(clients<0){
          clients=0
        }
        res.send(connecte)
      })
            console.log(clients)
    })

 //le client numero id appel un agent
    app.get("/apelleragent/:_id",(req,res)=>{
      Connecte.findOneAndUpdate({_id:req.params._id},{client:1}, {new: true}, (err, doc) => {
        if (err) {
          res.send("Something wrong when updating data!");
        }
        clients=doc.client
        res.send(doc)})
            console.log(clients)
    })

     //le client numero id coupe l'appel un agent
    app.get("/couperappelagent/:_id",(req,res)=>{
      Connecte.findOneAndUpdate({_id:req.params._id},{client:0}, {new: true}, (err, doc) => {
        if (err) {
          res.send("Something wrong when updating data!");
        }
        clients=doc.client
        res.send(doc)})
            console.log(clients)
    })
   
    //l'agent numero id appelle un client
    app.get("/apellerclient/:_id",(req,res)=>{
      Disponible.findOneAndUpdate({_id:req.params._id},{client:1}, {new: true}, (err, doc) => {
        if (err) {
          res.send("Something wrong when updating data!");
        }
        clients=doc.client
        res.send(doc)})
            console.log(clients)
    })

     //l'agent numero id coupe appel un client
    app.get("/couperappelclient/:_id",(req,res)=>{
      Disponible.findOneAndUpdate({_id:req.params._id},{client:0}, {new: true}, (err, doc) => {
        if (err) {
          res.send("Something wrong when updating data!");
        }
        clients=doc.client
        res.send(doc)})
            console.log(clients)
    })


    app.get("/deconnectagent/:_id",(req,res)=>{
       Disponible.findByIdAndRemove(req.params._id).then(connecte=>{
            res.send(connecte)
        })
        console.log(clients)
      })
io.on('connection', function (socket) {
  
    
                      socket.on('Offer', SendOffer)
                       // socket.on('Offer2', SendOffer2)
                      socket.on('Answer', SendAnswer)
                      // socket.on('Answer2', SendAnswer2)
         
   

  // gere WYSIWING
  socket.on('envoiewys',(data) =>{
      io.sockets.emit("wysHTML",data)
  })   
  // gere WYSIWING  aff liste
  socket.on('envoiewysiListe',(data) =>{
      console.log(data)
      io.sockets.emit("wysHTMLliste",data)
  })  
   //gere emoji
   socket.on('envoiemoji',(data) =>{
       console.log(data)
       io.sockets.emit("emoji",data)
   }) 

  
   
   //gere l'envoi Gallerie
   socket.on('envoieGallerie',(data) =>{
    io.sockets.emit("gal",data)
  })


   // gere les utilisateurs connecte
   socket.on('envoieconnecte',(data1) =>{
        console.log(data1)
        io.sockets.emit("connecte",data1)
    })
   //gere la deconnection
    socket.on('envoiedeconnecte',(data1) =>{
        console.log(data1)
        io.sockets.emit("deconnecte",data1)
    })
      //gere evoie message
    
      socket.on('envoiereceivermessage',(data1) =>{
        console.log(data1)
        io.sockets.emit("receivermessage",data1)
    })

    socket.on('envoieurmessage',(data1) =>{
      console.log("sender",data1)
      io.sockets.emit("envoieur:",data1)
  }) 
    socket.on('messagelocal',(data1) =>{
      console.log(data1)
      io.sockets.emit("message",data1)
  })
  socket.on('photolocal',(data1) =>{
    console.log(data1)
    io.sockets.emit("local",data1)
  })
  
      //gere evoie notification
    socket.on('envoieconf',(data1) =>{
        console.log(data1)
        io.sockets.emit("conf",data1)
    })
    socket.on('envoiereceivernotif',(data1) =>{
        console.log(data1)
        io.sockets.emit("receivernotif",data1)
    })
  // gere appel 
     //lancer  l' appel
       socket.on('requeteappel',(data1) =>{
        console.log("appeler ",data1)
        io.sockets.emit("appel",data1)
    })
     //recevoir  l' appel
      socket.on('requeteappeler',(data1) =>{
         console.log("recu ",data1)
        io.sockets.emit("appeleur",data1)
       

    })
    //envoi id 
    socket.on('envoiid',(data1) =>{
      console.log("envoi id  ",data1)
     io.sockets.emit("id",data1)
    

 })
     //annuler l' appel
    socket.on('annulerappel',(data1) =>{
      clients=0;
      console.log("annuler "+data1)
      io.sockets.emit("annuler",data1)

    })
    //refuser l' appel
    socket.on('refuserappel',(data1) =>{
      clients=0;
      console.log("refuser "+data1)
      io.sockets.emit("refuser",data1)

    })
    //accepter l' appel
       socket.on('acceptappeler',(data1) =>{
          clients=1;
          console.log(clients);
          console.log("accepter",data1)
          io.sockets.emit("appe",data1)
    })
     //couper l' appel
        socket.on('couperappel',(data1) =>{
          clients=0;
          console.log(clients);
          console.log("couper ",data1)
          io.sockets.emit("coupe",data1)
    })
    // gere socket peer 
     socket.on('envoiestream',(data1) =>{
        console.log("io",data1)
        io.sockets.emit("stream",data1)
    })
      console.log("clients :",clients)
       socket.on("NewClient", function () {
                                        if (clients >=0) {
                                            // if (clients ==1) {
                                              console.log('CreatePeer')
                                                this.emit('CreatePeer')
                                                
                                            // }
                                            // if (clients >=2) {
                                            //     this.emit('CreatePeer2')
                                                
                                            // }
                                        }
                                       
                                            
                                    })

// Gere battery info

socket.on('batteryLevel',(data) =>{
  io.sockets.emit("level",data)
})

socket.on('BatteryCharging',(data) =>{
  io.sockets.emit("chargin",data)
})

socket.on('connexiontype',(data) =>{
  io.sockets.emit("connexion",data)
})

socket.on('plateformtype',(data) =>{
  io.sockets.emit("plateform",data)
})

socket.on('Geolocalisation',(data) =>{
  console.log(data)
  io.sockets.emit("geo",data)
})

// Image retouché
socket.on('imageRetouché',(data) =>{
  console.log('lasa lessy e !')
  io.sockets.emit("imgR",data)
})



   //gere l'envoi de browser
     socket.on('envoiebrowser',(data) =>{
       console.log(data)
       io.sockets.emit("browser",{lienbrowser:data})
     })


    
     
  
    
})



// gere wysiwing liste
app.post('/wysiwing', (req, res, next) => {
    
  wysiwing.find().then(cht=>{
     var id;
       if(cht.length==0){
         id=0
       }
       else{
         id=cht[cht.length-1]._id+1
       }
       console.log(req.files);
 


       let chatMessage = new wysiwing({ 
     _id:id,
     wysiwing:req.body. wysiwing,
     image:req.body. image
   });
   console.log(chatMessage)
   chatMessage.save().then(re=> res.send(re));
     })

})
app.get('/wysiwing', (req, res, next) => {
  
  wysiwing.find().then(cht=>{
     res.send(cht)
     })

})
//  recuperer un liste
app.get('/wysiwing/:_id', (req, res, next) => {
  
  wysiwing.findById(req.params._id).then(cht=>{
     res.send(cht)
     })

})

//uploade image 
 
  //uploade image 
  app.post('/upload', (req, res, next) => {
    
    Photo.find().then(cht=>{
       var id;
         if(cht.length==0){
           id=0
         }
         else{
           id=cht[cht.length-1]._id+1
         }
         console.log(req.files);
   let imageFile = req.files.image;

   imageFile.mv(`${__dirname}/public/upload/${id}.jpg`, function(err) {
     if (err) {
       return res.status(500).send(err);
     }
 });
         let chatMessage = new Photo({ 
       _id:id,
      image:id+".jpg"
     });
     console.log(chatMessage)
     chatMessage.save().then(re=> res.send(re));
       })

 })

//  construction route src localhost img 
Photo.find().then(produit=>{
       for(let i=0;i<produit.length;i++){
         app.get("/public/"+produit[i].image,(req,res)=>{
             var fs = require("fs")
            console.log( "./public/"+produit[i].image);
            
            var image= fs.readFileSync("./public/upload/"+produit[i].image)
            res.send(image)
         })
       }
   })
//  recuperer tous les images   
 app.get("/photo",(req,res)=>{
           Photo.find().then(image=>{
            res.send(image)
         }) 
       Photo.find().then(produit=>{
       for(let i=0;i<produit.length;i++){
         app.get("/public/"+produit[i].image,(req,res)=>{
            var fs = require("fs")
            var image= fs.readFileSync("./public/upload/"+produit[i].image)
            res.send(image)
         })
       }
   })        
}) 

 app.post('/uploadphotochat/:_id', (req, res, next) => {
    
       User.findOne({_id:req.params._id}).then(sende=>{
                     Chat.find().then(cht=>{
                        var id;
                        if(cht.length==0){
                          id=0
                        }
                        else{
                          id=cht[cht.length-1]._id+1
                        }

                        console.log(req.files)
                        let imageFile = req.files.message;
                     
                        imageFile.mv(`${__dirname}/public/photochat/${id}.jpg`, function(err) {
                    
                          if (err) {
                            return res.status(500).send(err);
                          }
                      });
                        let chat= new Chat({
                          _id:id,
                          idsender:sende._id,
                          sender:sende.nom,
                          receiver:req.body.receiver,
                          image:id+".jpg"
                        })
                          chat.save().then(mess=>res.send(mess))
                             })
                         
                       })
  
  })
//uploade video
app.post('/uploadvideo', (req, res, next) => {
    
    Video.find().then(cht=>{
       var id;
         if(cht.length==0){
           id=0
         }
         else{
           id=cht[cht.length-1]._id+1
         }
         console.log(req.files);
   let videoFile = req.files.video;

   videoFile.mv(`${__dirname}/public/uploadvideo/${id}.mp4`, function(err) {
     if (err) {
       return res.status(500).send(err);
     }
 });
         let chatMessage = new Video({ 
       _id:id,
       video:id+".mp4"
     });
     console.log(chatMessage)
     chatMessage.save().then(re=> res.send(re));
       })

 })

//  construction route src localhostvideo
Video.find().then(produit=>{
       for(let i=0;i<produit.length;i++){
         app.get("/public/"+produit[i].video,(req,res)=>{
             var fs = require("fs")
            console.log( "./public/"+produit[i].video);
            
            var video = fs.readFileSync("./public/uploadvideo/"+produit[i].video)
            res.send(video)
         })
       }
   })
//  recuperer tous les video   
 app.get("/video",(req,res)=>{
        Video.find().then(video=>{
            res.send(video)
         }) 
       Video.find().then(produit=>{
       for(let i=0;i<produit.length;i++){
         app.get("/public/"+produit[i].video,(req,res)=>{
             var fs = require("fs")
            console.log( "./public//uploadvideo/"+produit[i].video);
            
            var video= fs.readFileSync("./public//uploadvideo/"+produit[i].video)
            res.send(video)
         })
       }
   })        
}) 



//uploade Fichier

app.post('/uploadfichier', (req, res, next) => {
    
    Fichier.find().then(cht=>{
       var id;
         if(cht.length==0){
           id=0
         }
         else{
           id=cht[cht.length-1]._id+1
         }
         
   let fichierFile = req.files.fichier;
   console.log(fichierFile);
   fichierFile.mv(`${__dirname}/public/uploadfichier/${req.files.fichier.name}`, function(err) {
     if (err) {
       return res.status(500).send(err);
     }
 });
         let chatMessage = new Fichier({ 
       _id:id,
       fichier:req.files.fichier.name
     });
     console.log(chatMessage)
     chatMessage.save().then(re=> {
      res.send(re)
       Fichier.find().then(produit=>{
       for(let i=0;i<produit.length;i++){  
        var fs = require("fs")
        var fichier = fs.readFileSync("./public/uploadfichier/"+produit[i].fichier)
         app.get("/fichierupload/"+i,(req,res)=>{
        console.log(fichier);   
        res.send(fichier)
         })
       }
   })
    });
    
       })

 })
 //recuperer un fichier uploade
 app.get('/fichier/:_id', (req, res, next) => {
    
    Fichier.findById(req.params._id).then(cht=>{
      console.log(cht)
       res.send(cht)
       })

 })
 app.post('/conference/:_id', (req, res, next) => {
    
    Conference.find().then(cht=>{
       var id;
         if(cht.length==0){
           id=0
         }
         else{
           id=cht[cht.length-1]._id+1
         }
   User.findById(req.params._id).then(user=> {
       let conference = new Conference({ 
       _id:id,
       iduser:user._id,
     titre:req.body.titre ,
     responsable:user.nom,
     date:req.body.date,
     heure:req.body.heure,
     minute:req.body.minute,
     participant:req.body.participant
     });
     conference.save().then(re=> {
      res.send(re)
      
    });
    
   })
      
       })

 })
  app.get('/conference', (req, res, next) => {
    
    Conference.find().then(cht=>{
      res.send(cht)
       })

 })



//  construction route src localhostfichier
Fichier.find().then(produit=>{
       for(let i=0;i<produit.length;i++){  
        var fs = require("fs")
        var fichier = fs.readFileSync("./public/uploadfichier/"+produit[i].fichier)
         app.get("/fichierupload/"+i,(req,res)=>{
        console.log(fichier);   
        res.send(fichier)
         })
       }
   })
//  recuperer tous les fichier   
 app.get("/fichier",(req,res)=>{
        Fichier.find().then(fichier=>{
            res.send(fichier)
             Fichier.find().then(produit=>{
       for(let i=0;i<produit.length;i++){
         app.get("fichierupload/"+i,(req,res)=>{
             var fs = require("fs")
            console.log( "./public//uploadfichier/"+produit[i].fichier);
            var fichier = fs.readFileSync("./public/uploadfichier/"+produit[i].fichier)
            res.send(fichier)
         })
       }
   })        
         }) 
        
}) 



// RETOUCHE D'image
app.post('/retouche', (req, res, next) => {
    
    
  let imageFile = req.files.image;
console.log(imageFile)
  imageFile.mv(`${__dirname}/public/retouche/0.jpg`, function(err) {
    if (err) {
       console.log(err);
      return res.status(500).send(err);
    }
});
const photo=new Photo({
    image:"http://localhost:4000/retouche"
})

res.send(photo)
      
})
app.get('/retouche', (req, res, next) => {
   var fs= require("fs")
   var image=fs.readFileSync("./public/retouche/0.jpg")
   res.send(image)
 })

// gere Gallerie
app.post('/gallerie', (req, res, next) => {
   
 Gallerie.find().then(cht=>{
    var id;
      if(cht.length==0){
        id=0
      }
      else{
        id=cht[cht.length-1]._id+1
      }
      console.log(req.files);



      let gallerie = new Gallerie({ 
    _id:id,
    
    image:req.body. image
  });
  gallerie.save().then(re=> res.send(re));
    })

})
app.get("/gallerie",function(req,res){
  Gallerie.find().then(function(photo){
    res.send(photo);
  })
})

http.listen(port, () => {
  console.log("Running on Port: " + port);
});










