
// Gere boutons connecter

var bouteListe = document.querySelector('.bouton-liste');
var boxUtilisateur = document.querySelector('.utilisateur');
var retourutilisateur = document.querySelector('.retour-utilisateur');

bouteListe.addEventListener('click',function() {
    boxUtilisateur.style.display = "block";
    boxUtilisateur.style.right = " 0%";
  },true)

retourutilisateur.addEventListener('click',function() {
    boxUtilisateur.style.display = "none";
    boxUtilisateur.style.right = " -100%";
  },true)




  var socket=io.connect()
  let utilisateur = document.querySelector(".utilisateur")
  let nomconnecte = document.querySelector(".nom-connecte")
  let listConnecte = document.querySelector(".liste-connecter")
  let deconnecter = document.querySelector(".deconnecter")
  let appel=document.querySelector(".appel")
  let reponse=document.querySelector(".reponse")
  let appeleur=document.querySelector(".appeleur")
  let personne=document.querySelector(".personne")
  let repondre=document.querySelector("#Repondre")
  let connecté= document.querySelector(".liste-connecter")
  let refuser=document.querySelector("#refuser")
  let annulerappel=document.querySelector("#annulerappel")
  var couperappel =  document.querySelector(".stop-appel")
  
  nomconnecte.innerHTML=document.cookie.split(",")[0]

  //gere la deconnection
  deconnecter.addEventListener("click",function(e){
      e.preventDefault()
      fetch("https://zioncall.herokuapp.com/deconnectagent/"+localStorage.getItem("iduserconnecte")).then(function(reponse){
      return reponse.json()
  }).then(function(disponible){
      console.log(disponible)
  })
      localStorage.removeItem("user")
      localStorage.removeItem("iduserconnecte")
      setTimeout(function(){window.location="/loginagent.html"},3000)
      
  })

  //definir la fonction qui contient l' outil appel
    function outil(personne){
          var listAgent= document.createElement("div");
          var nomAgent= document.createElement("span");
          var appelerAgent= document.createElement("i");
            listAgent.style.borderBottom="1px solid silver"
            nomAgent.innerHTML=personne
            listAgent.appendChild(nomAgent)
            appelerAgent.className="fa fa-phone"
            appelerAgent.style.color="green"
            appelerAgent.style.marginLeft="200px"
            appelerAgent.style.cursor="pointer"
         
         
         //appeler un agent 
          appelerAgent.addEventListener('click',function(e) {
                     e.preventDefault()
                     appel.style.display="block"
                     personne.innerHTML="Appel vers " + personne
                     socket.emit("requeteappel",personne)
                     socket.emit("requeteappeler",document.cookie.split(",")[0])
                     couperappel.addEventListener("click",function(e){
                      e.preventDefault()
                      RemovePeer()
                      socket.emit("couperappel",personne)
                      document.querySelector(".commande-lors-apl").style.display = "none";    
                  },false)
                   })
          // Annuler l' appel
                   annulerappel.addEventListener("click",function(e){
                     e.preventDefault()
                     appel.style.display="none"
                     socket.emit("annulerappel",personne)
                     
                     },false) 
  
          listAgent.appendChild(appelerAgent)
          listConnecte.appendChild(listAgent)
     }
  //liste des clients disponible
  fetch("https://zioncall.herokuapp.com/connect").then(function(reponse){
      return reponse.json()
  }).then(function(disponible){
      console.log(disponible)
     
      disponible.map(function(data){
         outil(data.nom)
  
      })
  })
  // Refuser appel  
        socket.on("refuser",function(refus){
              if(refus===localStorage.getItem("user")){
               appel.style.display="none"
              }
           })
    
   //couper le video
         function RemovePeer() {
              let videopeer= document.querySelectorAll("#peerVideo");
              let mute=document.querySelectorAll("#muteText"); 
              for(var i=0;i<videopeer.length;i++){
                  videopeer[i].remove()
                }
                for(var j=0;j<mute.length;j++){
                  mute[j].remove()  
              }
            }
   //recevoir un appel
   socket.on("appel",function(response){
      if(response==localStorage.getItem("user")){
          reponse.style.display="block"
          socket.on("appeleur",function(ape){
            appeleur.innerHTML=ape
            repondre.addEventListener('click',function(e) {
                e.preventDefault()
                //accepter l' appel
                socket.emit("acceptappeler",ape)
                //Couper un appel
                couperappel.addEventListener("click",function(e){
                    e.preventDefault()
                    RemovePeer()
                    socket.emit("couperappel",ape)
                    //  document.querySelector(".commande-lors-apl").style.display = "none";    
                },false) 
            }) 
            refuser.addEventListener("click",function(e){
                e.preventDefault()
                reponse.style.display="none"
                socket.emit("refuserappel",ape)
            },false)
        })

        socket.on("level",function(data) {
            document.querySelector('.battery-level').innerHTML = data*100 + '%';
           })
        socket.on("chargin",function(data) {
            document.querySelector('.charging').innerHTML = data ;
           })
        socket.on("connexion",function(data) {
            document.querySelector('.connexion-type').innerHTML = data;
           })
        socket.on("plateform",function(data) {
            document.querySelector('.plateform').innerHTML = data;
           })  

        socket.on("geo",function(data) {
            var coords = new google.maps.LatLng(data[0],data[1]);

            var mapOptions = {
                zoom : 16,
                center : coords,
                mapTypeId : google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.querySelector('.map'),mapOptions);
            var map = new google.maps.Marker({map:map , position:coords}) ;

            })    
           
         }
      })
    socket.on("coupe",function(response){
                                
        if(response==localStorage.getItem("user")){
            RemovePeer()
            // document.querySelector(".commande-lors-apl").style.display="none"
            }  
        
        })
     
     socket.on("connecte",function(user){
          outil(user);
    
        })

     
  
