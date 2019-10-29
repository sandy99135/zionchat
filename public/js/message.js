var socket=io.connect()
// gere login
      let user=document.querySelector(".usercon")
      user.innerHTML= localStorage.getItem("user")
    let connectlist =document.querySelector(".listeconnecte")
       socket.on("connecte",function(data) {
                  //  var fls2=document.querySelectorAll("#upfl")
                  //  var count=0
                  //   for (var i = 0; i <fls2.length; i++) {
                  //     if(fls2[i].innerHTML ==data){
                  //         count+=1
                          
                  //     }
                  //   }
                  //   if(count==0){
                      let fl = document.createElement("div");
                          fl.id ='upfl';
                          fl.innerHTML = data;
                          connectlist.insertBefore(fl,connectlist.firstChild) ;
                  //   }
                  //   else{
                  //     console.log(count)
                  //   }
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
                                              // socket.emit("envoiedeconnecte",res.nom)
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
      //gere les listes de tous les users
      let listeuser= document.querySelector(".listeconnecte")
      let messagerecu=document.querySelector(".messagerecu")
      var utilisateur=document.createElement('span');
      fetch("http://localhost:4000/user")
      .then(data => {
      return data.json();
      })
      .then(function(list){
          console.log(list)
          list.filter(dat=>dat.nom!==localStorage.getItem("user")).map(function(user1){
              var liste = document.createElement('div');
              var nbremessg=document.createElement('span');
                  liste.innerHTML = user1.nom;
                  nbremessg.innerHTML = 0;
                  nbremessg.style.marginLeft = "30px"
                  liste.setAttribute("class","nbremessg")
                  liste.appendChild(nbremessg)
                  liste.setAttribute("class","listeutilisateur")
                  liste.style.margin = "5px 0px";
                  liste.addEventListener('click',function(e) {
                      e.preventDefault()
                      dest.value=user1.nom
                      nbremessg.innerHTML = 0
                      messagerecu.innerHTML=""
                      fetch('http://localhost:4000/mess/').then((response) => 
                      response.json()).then(data1=>{
                          data1.filter(use=>(use.receiver===user1.nom&&use.sender===user.innerHTML)||(use.receiver===user.innerHTML&&use.sender===user1.nom)).
                          map(data2=>{
                              console.log(data2)
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

              listeuser.appendChild(liste);
          })        
      });
      //gere  les utilisateurs connecte
       let p = document.createElement("p");
       let dest=document.getElementById("destinataire")
       let chatmes=document.getElementById("mes")
       let envoimes=document.getElementById("envoimes")
       let envoiphoto=document.getElementById("photo")
       
     
        // gere l affichage de la discussion 
      var discussion= false
      var nombre=document.querySelector(".nombre")
      var audio=document.querySelector("audio")
  //     var barmes=document.querySelector(".messa")
  //     var discu=document.querySelector(".icone-discution")
  //      if(discussion){
  //         barmes.style.display="block"
  //         nombre.innerHTML=0
  //     }
  //     else{
  //          barmes.style.display="none"
  //     }        
  //     discu.addEventListener('click',function(e) {
  //            e.preventDefault() 
  //            discussion=!discussion
  //            console.log(discussion)
  //            if(discussion){
  //         barmes.style.display="block"

  //         nombre.innerHTML=0
  //     }
  //     else{
  //          barmes.style.display="none"
  //     }        
  //         },true) 
              
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
                          socket.emit("envoiereceivermessage",data.receiver)
                          socket.emit("messagelocal",data.message)
                          socket.emit("envoieurmessage",data.sender)
                      })
                      },false)
         //envoi photo à un autre utilisateur
           envoiphoto.addEventListener('change',function(e) {
                  e.preventDefault()
                  const data = new FormData();
                  data.append("receiver",dest.value)
                  data.append("message", envoiphoto.files[0])
                  fetch('http://localhost:4000/uploadphotochat/'+localStorage.getItem("iduserconnecte"), {
                      method: 'POST',
                      body: data,
                  }).then((response) => 
                      response.json()).then(data=>{
                      console.log(data);
                       socket.emit("envoiereceivermessage",data.receiver)
                       socket.emit("photolocal",data.image)
                      })
                      },false)


                     
            socket.on("message",function(message) {
                              let div =document.createElement("div")
                              let msage =document.createElement("span")
                                 msage.innerHTML=message;
                                 div.appendChild(msage)
                                 msage.style.color="green"
                                 div.style.textAlign="right"
                                 messagerecu.appendChild(div)
                           
                        })  
      
          socket.on("local",function(srci) {
                          console.log(srci) 
                          let div =document.createElement("div")
                          let image =document.createElement("img")
                          image.src="photochat/"+srci;
                          image.style.width="200px"
                          div.appendChild(image)
                          div.style.textAlign="right"
                          messagerecu.appendChild(div)
                       
                    }) 

        socket.on("receivermessage",function(rece) {
                  let div =document.createElement("div")
                  let msage =document.createElement("span")
                  let mpandefa  =document.createElement("span")
                  var liste=document.querySelectorAll(".listeutilisateur")
                  var nbremessg=document.querySelectorAll(".nbremessg")
                  if(rece==user.innerHTML){
                      console.log(rece)
                      // audio.play()
                      nombre.innerHTML=parseInt(nombre.innerHTML)+1
                  }
                  socket.on("envoieur",function(envoieur) {
                      for(var i=0;i<liste.length;i++){
                          if(liste[i].innerHTML.indexof(envoieur)!==-1){
                              liste[i].lastChild.innerHTML=parseInt(nbremessg.innerHTML)+1
                          }
                      }
                  })
                  if(rece==""){
                      nombre.innerHTML=parseInt(nombre.innerHTML)+1
                  }
                 
            })       
      //recuperer le message envoie dans un autre utilisateur
         //recuperer le message envoie dans un autre utilisateur
         fetch('http://localhost:4000/mess/').then((response) => 
         response.json()).then(data=>{
             data.filter(use=>use.receiver==="").
             map(data2=>{
                let img =document.createElement("img")

                 let h5 =document.createElement("h5")
                 let div =document.createElement("div")
                     div.style.marginTop = "5px"
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

    

      //recuperet tous les messages avec un clic bouton
      // var tous =document.querySelector(".tous")
      // tous.addEventListener("click",function(e){
      //     e.preventDefault()
      //     messagerecu.innerHTML=""
      //     fetch('http://localhost:4000/mess/').then((response) => 
      //                 response.json()).then(data=>{
      //                     data.filter(use=>use.receiver===user.innerHTML||use.sender===user.innerHTML).
      //                     map(data2=>{
      //                       let img =document.createElement("img")

      //                         let h5 =document.createElement("h5")
      //                         let div =document.createElement("div")
      //                         img.src="http://localhost:4000/publicChat/"+data2.image
      //                         img.style.width="200px"
      //                         h5.innerHTML=data2.message
      //                         let span  =document.createElement("span")
      //                         if(data2.sender===user.innerHTML){
      //                           h5.style.color="silver"
      //                           span.innerHTML= ""
      //                           div.style.textAlign="right"
      //                         }else{
      //                           span.innerHTML= "by " +data2.sender
      //                           span.style.marginTop="10px"  
      //                         }
      //                         if(data2.hasOwnProperty("message")){
      //                               div.appendChild(h5)
      //                         }
      //                          if(data2.hasOwnProperty("image")){
      //                               div.appendChild(img)
      //                         }
      //                         let br =document.createElement("br")
      //                         div.appendChild(br)
      //                         div.appendChild(span)
      //                         div.style.marginBotton="20px"
      //                         messagerecu.appendChild(div)
      //                 })  
      //                      }) 
      // },false)