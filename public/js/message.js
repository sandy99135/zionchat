    var socket=io.connect()
  // gere login
        let user=document.querySelector(".usercon")
        user.innerHTML= localStorage.getItem("user")
      let connectlist =document.querySelector(".listeconnecte")
         socket.on("connecte",function(data) {
                     var fls2=document.querySelectorAll("#upfl")
                     var count=0
                      for (var i = 0; i <fls2.length; i++) {
                        if(fls2[i].innerHTML ==data){
                            count+=1
                            
                        }
                      }
                      if(count==0){
                        let fl = document.createElement("div");
                            fl.id ='upfl';
                            fl.innerHTML = data;
                            connectlist.insertBefore(fl,connectlist.firstChild) ;
                      }
                      else{
                        console.log(count)
                      }
              })  
         //gere la deconection
         let deconnecter=document.querySelector(".deconecte")
         deconnecter.addEventListener('click',function(e) {
                                e.preventDefault() 
                                  fetch("http://localhost:4000/connect")
                                .then(data => {
                                return data.json();
                                })
                                .then(json1 => {
                                for (var i = 0; i <json1.length; i++) {
                                  if(localStorage.getItem("user")==json1[i].nom){
                                  
                                     fetch('http://localhost:4000/deconnect/'+json1[i]._id
                                            ).then(data => {return data.json()}).then(res=>{
                                                socket.emit("envoiedeconnecte",res.nom)
                                                localStorage.removeItem("user")
                                                setTimeout(function(){
                                                window.location="/login"
                                            },3000) 
                                                connectlist.innerHTML=""
                                                  fetch("http://localhost:4000/connect")
                                                    .then(data => {
                                                    return data.json();
                                                    })
                                                    .then(json2 => {
                                                    json2.map(data => {
                                                        let fl = document.createElement("div");
                                                            fl.id ='upfl';
                                                            fl.innerHTML = data.nom;
                                                            connectlist.appendChild(fl);
                                                       
                                                    });
                                                 
                                                 });
                                                console.log("io",res)})
                                          
                                            
                                }
                            }
                                });
                            },true)

           socket.on("deconnecte",function(data) {
                    console.log(data)
                     var fls2=document.querySelectorAll("#upfl2")
                     var count=0
                      for (var i = 0; i <fls2.length; i++) {
                        if(fls2[i].innerHTML ==data){

                            fls2[i].remove()
                            
                        }
                      }
                     
              })  

        //gere  les utilisateurs connecte
         let p = document.createElement("p");
         let dest=document.getElementById("destinataire")
         let chatmes=document.getElementById("mes")
         let envoimes=document.getElementById("envoimes")
         let envoiphoto=document.getElementById("photo")
         let messagerecu=document.querySelector(".messagerecu")
         let blocmessage=document.querySelector(".messa")
         let appel=document.querySelector(".appel")
         let reponse=document.querySelector(".reponse")
         let appeleur=document.querySelector(".appeleur")
         let personne=document.querySelector(".personne")
         let repondre=document.querySelector("#Repondre")
         let refuser=document.querySelector("#refuser")
         fetch("http://localhost:4000/connect")
                .then(data => {
                return data.json();
                })
                .then(json1 => {
                json1.filter(dat =>dat.nom!==user.innerHTML).map(data => {
                    let fl = document.createElement("p");
                    let div1 = document.createElement("div");
                     let i =document.createElement("i")
                     i.className="fa fa-phone"
                        div1.id ='upfl2';
                        fl.id ='upfl';
                        fl.innerHTML = data.nom;
                        fl.style.marginRight="20px"
                        p.innerHTML = 0;
                        div1.appendChild(fl)
                        div1.appendChild(p)
                        div1.appendChild(i)
                        div1.style.display="inline-flex"
                         div1.addEventListener('click',function(e) {
                            e.preventDefault()
                            dest.value=data.nom
                             p.innerHTML = 0
                            messagerecu.innerHTML=""
                            blocmessage.scrollTop=blocmessage.style.width
                              fetch('http://localhost:4000/mess/').then((response) => 
                        response.json()).then(data1=>{
                            data1.filter(use=>(use.receiver===data.nom&&use.sender===user.innerHTML)||(use.receiver===user.innerHTML&&use.sender===data.nom)).
                            map(data2=>{
                                let img =document.createElement("img")
                                let h5 =document.createElement("h5")

                                let div =document.createElement("div")
                                img.src="http://localhost:4000/publicChat/"+data2.image
                                img.style.width="200px"
                                h5.innerHTML=data2.message
                                let span  =document.createElement("span")
                                if(data2.sender===user.innerHTML){
                                  h5.style.color="silver"
                                  span.innerHTML= ""
                                  div.style.textAlign="right"
                                }else{

                                  span.innerHTML= "by " +data2.sender  
                                  span.style.marginTop="10px"
                                }
                                if(data2.hasOwnProperty("message")){
                                      div.appendChild(h5)
                                }
                                 if(data2.hasOwnProperty("image")){
                                      div.appendChild(img)
                                }
                                let br =document.createElement("br")
                                div.appendChild(br)
                                div.appendChild(span)
                                div.style.marginBotton="20px"
                                messagerecu.appendChild(div)
                            })
                        })
                        },false)
                         i.addEventListener('click',function(e) {
                            e.preventDefault()
                            appel.style.display="block"
                            personne.innerHTML="Appel de " +data.nom
                            socket.emit("requeteappel",data.nom)
                            socket.emit("requeteappeler",localStorage.getItem("user"))
                            
                          })
                          // gere l annulation appel
                        let annulerappel=document.querySelector("#annulerappel")
                        annulerappel.addEventListener("click",function(e){
                        e.preventDefault()
                        appel.style.display="none"
                        socket.emit("annulerappel",data.nom)
                        },false)   
                       
                        connectlist.insertBefore(div1,connectlist.firstChild) 
                   

                    });
                
               });
                       
              
                socket.on("annuler",function(response){
                  if(response===localStorage.getItem("user")){
                    reponse.style.display="none"
                    
                  }
                })

                 socket.on("refuser",function(refus){
                       reponse.style.display="none"
                       if(refus===localStorage.getItem("user")){
                        appel.style.display="none"
                       }
                    })
              //gere appel
                 socket.on("appel",function(response){
                      if(response==localStorage.getItem("user")){
                          reponse.style.display="block"
                          socket.on("appeleur",function(ape){
                          appeleur.innerHTML=ape
                          repondre.addEventListener('click',function(e) {
                          e.preventDefault()
                          socket.emit("acceptappeler",ape)
                          document.querySelector("#couper").addEventListener("click",function(e){
                          e.preventDefault()
                          socket.emit("couperappel",ape)
                          document.getElementById("peerVideo").remove();
                          document.getElementById("muteText").remove();        
                          },false)  
                           
                             }) 
                          refuser.addEventListener("click",function(e){
                          e.preventDefault()
                          socket.emit("refuserappel",ape)
                        },false)
                            })

                              }
                            })

                 document.querySelector("#couper").addEventListener("click",function(e){
                          e.preventDefault()
                          document.getElementById("peerVideo").remove();
                          document.getElementById("muteText").remove();
                          document.querySelector(".coupappel").style.display="none"       
                          },false)  
          // gere l affichage de la discussion 
        var discussion= false
       
        var barmes=document.querySelector(".messa")
        var discu=document.querySelector(".icone-discution")
         if(discussion){
            barmes.style.display="block"
            nombre.innerHTML=0
        }
        else{
             barmes.style.display="none"
        }        
        discu.addEventListener('click',function(e) {
               e.preventDefault() 
               discussion=!discussion
               console.log(discussion)
               if(discussion){
            barmes.style.display="block"

            nombre.innerHTML=0
        }
        else{
             barmes.style.display="none"
        }        
            },true) 
                 var nombre=document.querySelector(".nombre")
                 var audio=document.querySelector("audio")
         //gere  envoie message à un autre utilisateur         
           envoimes.addEventListener('click',function(e) {
                            e.preventDefault()
                            const data = new FormData();
                    data.append("receiver",dest.value)
                    data.append("message",chatmes.value)
                    fetch('http://localhost:4000/envoimessage/'+localStorage.getItem("iduserconnecte"), {
                        method: 'POST',
                        body: data,
                    }).then((response) => 
                        response.json()).then(data=>{
                             messagerecu.innerHTML=""
                            fetch('http://localhost:4000/mess/').then((response) => 
                            response.json()).then(data1=>{
                            data1.filter(use=>(use.receiver===data.receiver&&use.sender===data.sender)||(use.receiver===data.sender&&use.sender===data.receiver)).
                            map(data2=>{
                               let img =document.createElement("img")

                                let h5 =document.createElement("h5")
                                let div =document.createElement("div")
                                img.src="http://localhost:4000/publicChat/"+data2.image
                                img.style.width="200px"
                                h5.innerHTML=data2.message
                                let span  =document.createElement("span")
                                if(data2.sender===user.innerHTML){
                                  h5.style.color="silver"
                                  span.innerHTML= ""
                                  div.style.textAlign="right"
                                }else{
                                  span.innerHTML= "by " +data2.sender
                                  span.style.marginTop="10px"  
                                }
                                if(data2.hasOwnProperty("message")){
                                      div.appendChild(h5)
                                }
                                 if(data2.hasOwnProperty("image")){
                                      div.appendChild(img)
                                }
                                let br =document.createElement("br")
                                div.appendChild(br)
                                div.appendChild(span)
                                div.style.marginBotton="20px"
                                messagerecu.appendChild(div)
                            })
                        })
                             socket.emit("envoiesendermessage",data.sender)
                            socket.emit("envoiereceivermessage",data.receiver)
                            socket.emit("envoiemessage",data.message)
                        })
                        },false)

           //envoi photo à un autre utilisateur
             envoiphoto.addEventListener('change',function(e) {
                            e.preventDefault()
                            const data = new FormData();
                            console.log(envoiphoto.files[0])
                    data.append("receiver",dest.value)
                    data.append("message", envoiphoto.files[0])
                    fetch('http://localhost:4000/uploadphotochat/'+localStorage.getItem("iduserconnecte"), {
                        method: 'POST',
                        body: data,
                    }).then((response) => 
                        response.json()).then(data=>{
                             messagerecu.innerHTML=""
                            fetch('http://localhost:4000/mess/').then((response) => 
                            response.json()).then(data1=>{
                            data1.filter(use=>(use.receiver===data.receiver&&use.sender===data.sender)||(use.receiver===data.sender&&use.sender===data.receiver)).
                            map(data2=>{
                               let img =document.createElement("img")
                                let h5 =document.createElement("h5")
                                let div =document.createElement("div")
                                img.src="http://localhost:4000/publicChat/"+data2.image
                                img.style.width="200px"
                                h5.innerHTML=data2.message
                                let span  =document.createElement("span")
                                if(data2.sender===user.innerHTML){
                                  h5.style.color="silver"
                                  span.innerHTML= ""
                                  div.style.textAlign="right"
                                }else{
                                  span.innerHTML= "by " +data2.sender
                                  span.style.marginTop="10px"  
                                }
                                if(data2.hasOwnProperty("message")){
                                      div.appendChild(h5)
                                }
                                 if(data2.hasOwnProperty("image")){
                                      div.appendChild(img)
                                }
                                let br =document.createElement("br")
                                div.appendChild(br)
                                div.appendChild(span)
                                div.style.marginBotton="20px"
                                messagerecu.appendChild(div)
                            })
                        })
                             socket.emit("envoiesendermessage",data.sender)
                            socket.emit("envoiereceivermessage",data.receiver)
                            socket.emit("envoiemessage",data.message)
                        })
                        },false)

          socket.on("receivermessage",function(rece) {
                     let div =document.createElement("div")
                    let h5 =document.createElement("h5")
                    let span  =document.createElement("span")
                    if(rece==user.innerHTML){
                        console.log(rece)
                        // audio.play()
                        nombre.innerHTML=parseInt(nombre.innerHTML)+1
                        p.innerHTML=parseInt(p.innerHTML)+1
                    }
                     
              })       
        //recuperer le message envoie dans un autre utilisateur
            fetch('http://localhost:4000/mess/').then((response) => 
                        response.json()).then(data=>{
                            data.filter(use=>use.receiver===user.innerHTML||use.sender===user.innerHTML).
                            map(data2=>{
                               let img =document.createElement("img")

                                let h5 =document.createElement("h5")
                                let div =document.createElement("div")
                                img.src="http://localhost:4000/publicChat/"+data2.image
                                img.style.width="200px"
                                h5.innerHTML=data2.message
                                let span  =document.createElement("span")
                                if(data2.sender===user.innerHTML){
                                  h5.style.color="silver"
                                  span.innerHTML= ""
                                  div.style.textAlign="right"
                                }else{
                                  span.innerHTML= "by " +data2.sender
                                  span.style.marginTop="10px"  
                                }
                                if(data2.hasOwnProperty("message")){
                                      div.appendChild(h5)
                                }
                                 if(data2.hasOwnProperty("image")){
                                      div.appendChild(img)
                                }
                                let br =document.createElement("br")
                                div.appendChild(br)
                                div.appendChild(span)
                                div.style.marginBotton="20px"
                                messagerecu.appendChild(div)
                            })
                        })

      

          socket.on("receivermessage",function(rece) {
                     let div =document.createElement("div")
                    let h5 =document.createElement("h5")
                    let span  =document.createElement("span")
                    if(rece==user.innerHTML){
                        console.log(rece)
                        audio.play()
                        nombre.innerHTML=parseInt(nombre.innerHTML)+1
                        p.innerHTML=parseInt(p.innerHTML)+1
                    }
                     
              })       
       

        //recuperet tous les messages avec un clic bouton
        var tous =document.querySelector(".tous")
        tous.addEventListener("click",function(e){
            e.preventDefault()
            messagerecu.innerHTML=""
            fetch('http://localhost:4000/mess/').then((response) => 
                        response.json()).then(data=>{
                            data.filter(use=>use.receiver===user.innerHTML||use.sender===user.innerHTML).
                            map(data2=>{
                              let img =document.createElement("img")

                                let h5 =document.createElement("h5")
                                let div =document.createElement("div")
                                img.src="http://localhost:4000/publicChat/"+data2.image
                                img.style.width="200px"
                                h5.innerHTML=data2.message
                                let span  =document.createElement("span")
                                if(data2.sender===user.innerHTML){
                                  h5.style.color="silver"
                                  span.innerHTML= ""
                                  div.style.textAlign="right"
                                }else{
                                  span.innerHTML= "by " +data2.sender
                                  span.style.marginTop="10px"  
                                }
                                if(data2.hasOwnProperty("message")){
                                      div.appendChild(h5)
                                }
                                 if(data2.hasOwnProperty("image")){
                                      div.appendChild(img)
                                }
                                let br =document.createElement("br")
                                div.appendChild(br)
                                div.appendChild(span)
                                div.style.marginBotton="20px"
                                messagerecu.appendChild(div)
                        })  
                             }) 
        },false)