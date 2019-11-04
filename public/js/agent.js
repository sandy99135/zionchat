var socket=io.connect()
let agent = document.querySelector(".agent")
let nomconnecte = document.querySelector(".nom-connecte")
let listConnecte = document.querySelector(".liste-connecter")
let deconnecter = document.querySelector(".deconnecter")
let etendre = document.querySelector(".etendre")
let appel=document.querySelector(".appel")
let reponse=document.querySelector(".reponse")
let appeleur=document.querySelector(".appeleur")
let personne=document.querySelector(".personne")
let repondre=document.querySelector("#Repondre")
let connecté= document.querySelector(".liste-connecter")
let refuser=document.querySelector("#refuser")
let annulerappel=document.querySelector("#annulerappel")
var couperappel =  document.querySelector(".stop-apel")
let commandeappel= document.querySelector(".commande-lors-apl")
var etendu=true;
nomconnecte.innerHTML=localStorage.getItem("user")
//option pour l utilisateur
etendre.addEventListener("click",function(e){
	e.preventDefault()
	etendu=!etendu
	if(etendu){
		agent.style.width="300px";
		agent.style.height="auto";
		etendre.style.marginLeft="230px";
		etendre.classList.remove("fa-caret-right");
		etendre.classList.add("fa-caret-left");
	}
	else{
		agent.style.width="100px";
		agent.style.height="20px";
		etendre.style.marginLeft="30px";
		etendre.classList.remove("fa-caret-left");
		etendre.classList.add("fa-caret-right");
	}
	
})
//gere la deconnection
deconnecter.addEventListener("click",function(e){
	e.preventDefault()
	fetch("https://zioncall.herokuapp.com/deconnectagent/"+localStorage.getItem("iduserconnecte")).then(function(reponse){
	return reponse.json()
}).then(function(disponible){
	localStorage.removeItem("user")
	localStorage.removeItem("iduserconnecte")

	
})
	setTimeout(function(){window.location="/loginagent"},3000)
	
})
//liste des agents disponible
fetch("https://zioncall.herokuapp.com/connect").then(function(reponse){
	return reponse.json()
}).then(function(disponible){
	console.log(disponible)
	disponible.map(function(data){
		var listAgent= document.createElement("div");
		var nomAgent= document.createElement("span");
		var appelerAgent= document.createElement("i");
		listAgent.style.borderBottom="1px solid silver"
		nomAgent.innerHTML=data.nom
		listAgent.appendChild(nomAgent)
		appelerAgent.className="fa fa-phone"
		appelerAgent.style.color="green"
		appelerAgent.style.marginLeft="200px"
		listAgent.appendChild(appelerAgent)
		listConnecte.appendChild(listAgent)

	})
})

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
				document.querySelector(".commande-lors-apl").style.display = "none";    
			},false) 
					}) 
           refuser.addEventListener("click",function(e){
           e.preventDefault()
           reponse.style.display="none"
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
	 
	//couper le video et le son 
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
     socket.on("coupe",function(response){
                        
                             if(response==localStorage.getItem("user")){
                              RemovePeer()
							  document.querySelector(".commande-lors-apl").style.display="none"
							 }  

                  })

 
