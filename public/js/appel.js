/ var socket=io.connect()
let appel=document.querySelector(".appel")
let reponse=document.querySelector(".reponse")
let appeleur=document.querySelector(".appeleur")
let personne=document.querySelector(".personne")
let repondre=document.querySelector("#Repondre")
let connecté= document.querySelector(".liste-connecter")
let refuser=document.querySelector("#refuser")
let annulerappel=document.querySelector("#annulerappel")
// gere les utilisateurs connectés
fetch("http://localhost:4000/connect")
       .then(data => {
       return data.json();
       })
       .then(json1 => {

       console.log(json1)
       
       json1.filter(dat =>dat.nom!==user.innerHTML).map(data => {
           let fl = document.createElement("span");
               fl.id ='upfl ';
               
               fl.innerHTML = data.nom;
               fl.style.marginRight="20px"
           let BouttonApel = document.createElement('button')
               
           let div1 = document.createElement("div");
               div1.id ='upfl2';
               div1.className ='connecter ';
               
           let i =document.createElement("i")
               // i.className="fa fa-phone"
               i.className="fa fa-video-camera"
               BouttonApel.appendChild(i);
               div1.appendChild(fl)
               div1.appendChild(BouttonApel)
               // div1.addEventListener('click',function(e) {
               //     e.preventDefault()
               //     dest.value=data.nom
               //      p.innerHTML = 0
               //     messagerecu.innerHTML=""
               //       fetch('http://localhost:4000/mess/').then((response) => 
               // response.json()).then(data1=>{
               //     data1.filter(use=>(use.receiver===data.nom&&use.sender===user.innerHTML)||(use.receiver===user.innerHTML&&use.sender===data.nom)).
               //     map(data2=>{
               //         let img =document.createElement("img")
               //         let h5 =document.createElement("h5")

               //         let div =document.createElement("div")
               //         img.src="http://localhost:4000/publicChat/"+data2.image
               //         img.style.width="200px"
               //         h5.innerHTML=data2.message
               //         let span  =document.createElement("span")
               //         if(data2.sender===user.innerHTML){
               //           h5.style.color="silver"
               //           span.innerHTML= ""
               //           div.style.textAlign="right"
               //         }else{

               //           span.innerHTML= "by " +data2.sender  
               //           span.style.marginTop="10px"
               //         }
               //         if(data2.hasOwnProperty("message")){
               //               div.appendChild(h5)
               //         }
               //          if(data2.hasOwnProperty("image")){
               //               div.appendChild(img)
               //         }
               //         let br =document.createElement("br")
               //         div.appendChild(br)
               //         div.appendChild(span)
               //         div.style.marginBotton="20px"
               //         messagerecu.appendChild(div)
               //     })
               // })
               // },false)

               //gere l' appel
               BouttonApel.addEventListener('click',function(e) {
                   e.preventDefault()
                   appel.style.display="block"
                   personne.innerHTML="Appel vers " +data.nom
                   socket.emit("requeteappel",data.nom)
                   socket.emit("requeteappeler",localStorage.getItem("user"))
                  
                 })
                 
                 // Annuler l' appel
                 annulerappel.addEventListener("click",function(e){
                   e.preventDefault()
                   appel.style.display="none"
                   socket.emit("annulerappel",data.nom)
                   },false) 

           // var route = "http://localhost:4000/public/"+data.fichier;
               connecté.insertBefore(div1,connecté.firstChild) 
          
       });
       
    });

    socket.on("appel",function(response){
       if(response==localStorage.getItem("user")){
           reponse.style.display="block"
           socket.on("appeleur",function(ape){
           appeleur.innerHTML=ape
           repondre.addEventListener('click',function(e) {
           e.preventDefault()
           //accepter l' appel
           socket.emit("acceptappeler",ape)
           //couper l' appel
        //   
            
              }) 
           refuser.addEventListener("click",function(e){
           e.preventDefault()
           socket.emit("refuserappel",ape)
         },false)
             })

          }
       })
    // Annuler la requete appel
    socket.on("annuler",function(response){
       if(response===localStorage.getItem("user")){
         reponse.style.display="none"
         
       }
     })

    // Refuser appel  
      socket.on("refuser",function(refus){
            reponse.style.display="none"
            if(refus===localStorage.getItem("user")){
             appel.style.display="none"
            }
         })
    // lancer appel  
        socket.on("appel",function(response){
                     if(response==localStorage.getItem("user")){
                       reponse.style.display="block"
                 socket.on("appeleur",function(ape){
                   appeleur.innerHTML=ape
                   repondre.addEventListener('click',function(e) {
                   e.preventDefault()
                   socket.emit("acceptappeler",ape)
                    }) 
                   })
                     }
                   })


               socket.on("appe",function(response){
                  document.querySelector("#peerDiv").style.display="block"
                   reponse.style.display="none"
                    if(response==localStorage.getItem("user")){
                       appel.style.display="none"
                    }
                   })
                    