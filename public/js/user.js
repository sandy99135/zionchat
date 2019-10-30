var socket=io.connect()
let utilisateur = document.querySelector(".utilisateur")
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
var etendu=true;
nomconnecte.innerHTML=localStorage.getItem("user")
//option pour l utilisateur
etendre.addEventListener("click",function(e){
	e.preventDefault()
	etendu=!etendu
	if(etendu){
		utilisateur.style.width="300px";
		utilisateur.style.height="auto";
		etendre.style.marginLeft="230px";
		etendre.classList.remove("fa-caret-right");
		etendre.classList.add("fa-caret-left");
	}
	else{
		utilisateur.style.width="100px";
		utilisateur.style.height="20px";
		etendre.style.marginLeft="30px";
		etendre.classList.remove("fa-caret-left");
		etendre.classList.add("fa-caret-right");
	}
	
})
//gere la deconnection
deconnecter.addEventListener("click",function(e){
	e.preventDefault()
	fetch("https://zioncall.herokuapp.com/"+localStorage.getItem("iduserconnecte")).then(function(reponse){
	return reponse.json()
}).then(function(disponible){
	localStorage.removeItem("user")
	localStorage.removeItem("iduserconnecte")

	
})
	setTimeout(function(){window.location="/login"},3000)
	
})
//liste des agents disponible
fetch("https://zioncall.herokuapp.com/disponible").then(function(reponse){
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
		appelerAgent.style.cursor="pointer"

		//appeler un agent 
		appelerAgent.addEventListener('click',function(e) {
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

		listAgent.appendChild(appelerAgent)
		listConnecte.appendChild(listAgent)

	})
})
// Refuser appel  
      socket.on("refuser",function(refus){
            if(refus===localStorage.getItem("user")){
             appel.style.display="none"
            }
         })
  
    
