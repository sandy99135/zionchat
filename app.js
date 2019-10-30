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
const port = process.env.port||4000;
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
                password:user.password
               })
               Connecte.findOne({nom:con.nom}).then(use=>{
                if(!use){
                  clients++;
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
                password:user.password
               })
               Disponible.findOne({nom:con.nom}).then(use=>{
                if(!use){
                  clients++;
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
          app.get("/deconnectagent/:_id",(req,res)=>{
             Disponible.findByIdAndRemove(req.params._id).then(connecte=>{
                     clients --
                     if(clients<0){
                      clients=0
                     }
                    res.send(connecte)
               })
            console.log(clients)
         })
io.on('connection', function (socket) {
  
    
                      socket.on('Offer', SendOffer)
                       // socket.on('Offer2', SendOffer2)
                      socket.on('Answer', SendAnswer)
                      // socket.on('Answer2', SendAnswer2)
         
    // gere BL Text
    socket.on('envoitext',(data) =>{
      io.sockets.emit("text",{message:data})
  })
  socket.on('envoicolor',(data) =>{
      io.sockets.emit("color",{color:data})
  })
  socket.on('envoifont',(data) =>{
      io.sockets.emit("font",{font:data})
  })
  socket.on('envoiopacity',(data) =>{
      console.log(data)
      io.sockets.emit("opacity",{opacity:data})
  })  
  socket.on('envoipolice',(data) =>{
      console.log(data)
      io.sockets.emit("police",{police:data})
  })    
  


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

  //gere chart Line Jour
  socket.on('envoiechartLJ',(data) =>{
      console.log(data)
      io.sockets.emit("chartLJ",data)
  })
  //gere chart Line Semaine
  socket.on('envoiechartLM',(data) =>{
      console.log(data)
      io.sockets.emit("chartLM",data)
  })
  //gere chart Line Annee
  socket.on('envoiechartLA',(data) =>{
      console.log(data)
      io.sockets.emit("chartLA",data)
  })
  //gere chart AREA Jour
  socket.on('envoiechartAJ',(data) =>{
      console.log(data)
      io.sockets.emit("chartAJ")
  })
  //gere chart PIE Jour
  socket.on('envoiechartPJ',(data) =>{
      console.log(data)
      io.sockets.emit("chartPJ")
  })
   //gere chart HISTO Jour
   socket.on('envoiechartHJ',(data) =>{
      console.log(data)
      io.sockets.emit("chartHJ")
  })

   //gere l'envoi d'image en ligne
   socket.on('envoieimage',(data) =>{
      console.log(data)
      io.sockets.emit("image",{lienimage:data})
  })
  //gere l'envoi d'image upload
  socket.on('envoieimageup',(data) =>{
    console.log(data)
    io.sockets.emit("imageup",data)
})
   //gere l'envoi de video en ligne
   socket.on('envoievideo',(data) =>{
      console.log(data)
      io.sockets.emit("video",{lienvideo:data})
  })
   //gere l'envoi d'video upload
   socket.on('envoievideoup',(data) =>{
      console.log(data)
      io.sockets.emit("videoup",data)
  })
 //gere l'envoi de browser
   socket.on('envoiebrowser',(data) =>{
     console.log(data)
     io.sockets.emit("browser",{lienbrowser:data})
   })

   //gere l'envoi fichier PDF
   socket.on('envoiePDF',(data) =>{
      console.log(data)
      io.sockets.emit("fichierPDF",data)
    })


   //gere l'envoi THEME

   //gere l'envoi theme1
   socket.on('envoietheme1',(data) =>{
      console.log(data)
      io.sockets.emit("theme1",data)
    })
    //gere l'envoi theme1 nb list
   socket.on('envoietheme1nb',(data) =>{
      console.log(data)
      io.sockets.emit("nb",data)
    })
     //gere l'envoi theme1 titre
   socket.on('envoietheme1titre',(data) =>{
      console.log(data)
      io.sockets.emit("titreth1",data)
    })

    //gere l'envoi theme2
   socket.on('envoietheme2',(data) =>{
      console.log(data)
      io.sockets.emit("theme2")
    })

    //gere l'envoi theme3
   socket.on('envoietheme3',(data) =>{
      console.log(data)
      io.sockets.emit("theme3",data)
    })

    //gere l'envoi theme4
    socket.on('envoietheme4',(data) =>{
      console.log(data)
      io.sockets.emit("theme4",data)
    })
    //gere l'envoi theme4
    socket.on('envoietheme5',(data) =>{
      console.log(data)
      io.sockets.emit("theme5")
    })
    socket.on('envoietheme6',(data) =>{
      console.log(data)
      io.sockets.emit("theme6")
    })

    socket.on('envoietheme7',(data) =>{
      console.log(data)
      io.sockets.emit("theme7")
    })

    socket.on('envoietheme8',(data) =>{
      console.log(data)
      io.sockets.emit("theme8")
    })

    socket.on('envoietheme9',(data) =>{
      io.sockets.emit("theme9")
    })

    socket.on('envoietheme10',(data) =>{
      io.sockets.emit("theme10")
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
       socket.on('requeteappel',(data1) =>{
        console.log("appeler ",data1)
        io.sockets.emit("appel",data1)
    })
      socket.on('requeteappeler',(data1) =>{
         console.log("recu ",data1)
        io.sockets.emit("appeleur",data1)
       

    })
      socket.on('annulerappel',(data1) =>{
        console.log("annuler "+data1)

        io.sockets.emit("annuler",data1)

    })
       socket.on('refuserappel',(data1) =>{
        console.log("refuser "+data1)

        io.sockets.emit("refuser",data1)

    })
       socket.on('acceptappeler',(data1) =>{
        clients=2
        console.log("accepter",data1)
        io.sockets.emit("appe",data1)
    })
        socket.on('couperappel',(data1) =>{
        console.log(clients)
        if(clients <0){
          clients=0
          }
        clients=1
        console.log("io",data1)
        io.sockets.emit("coupe",data1)
    })
    // gere socket peer 
     socket.on('envoiestream',(data1) =>{
        console.log("io",data1)
        io.sockets.emit("stream",data1)
    })
       socket.on("NewClient", function () {
                                        if (clients >0) {
                                            // if (clients ==1) {
                                                this.emit('CreatePeer')
                                                
                                            // }
                                            // if (clients >=2) {
                                            //     this.emit('CreatePeer2')
                                                
                                            // }
                                        }
                                       
                                            
                                    })
   //gere l'envoi de browser
     socket.on('envoiebrowser',(data) =>{
       console.log(data)
       io.sockets.emit("browser",{lienbrowser:data})
     })


     //gere l'envoi THEME

     //gere l'envoi theme1
     socket.on('envoietheme1',(data) =>{
        console.log(data)
        io.sockets.emit("theme1",data)
      })
      //gere l'envoi theme1 nb list
     socket.on('envoietheme1nb',(data) =>{
        console.log(data)
        io.sockets.emit("nb",data)
      })
       //gere l'envoi theme1 titre
     socket.on('envoietheme1titre',(data) =>{
        console.log(data)
        io.sockets.emit("titreth1",data)
      })

      //gere l'envoi theme2
     socket.on('envoietheme2',(data) =>{
        console.log(data)
        io.sockets.emit("theme2")
      })

      //gere l'envoi theme3
     socket.on('envoietheme3',(data) =>{
        console.log(data)
        io.sockets.emit("theme3",data)
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
            var fichier = fs.readFileSync("./public//uploadfichier/"+produit[i].fichier)
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










