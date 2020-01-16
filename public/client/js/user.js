

var socket=io.connect()
var battery = navigator.battery || navigator.mozBattery || navigator.wzbkitBattery ;
let utilisateur = document.querySelector(".utilisateur")
let nomconnecte = document.querySelector(".nom-connecte")
let listConnecte = document.querySelector(".liste-connecter")
let deconnecter = document.querySelector(".deconnecter")
let etendre = document.querySelector(".etendre")
let retourUtilisateur = document.querySelector(".retour-utilisateur")
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



//condition pour securiser l' entreé dans l' espace client

if(localStorage.getItem("user")==""){
	window.location="/login"
}

//option pour l utilisateur 
etendre.addEventListener("click",function(e){
	e.preventDefault()
		utilisateur.style.left = "0%"
})
retourUtilisateur.addEventListener("click",function(e){
	e.preventDefault()
		utilisateur.style.left = "-100%"
})
//gere la deconnection
deconnecter.addEventListener("click",function(e){
	e.preventDefault()
	fetch("https://zioncall.herokuapp.com/deconnect/"+document.cookie.split(",")[1]).
	then(function(reponse){
	return reponse.json()
	}).
	then(function(disponible){
		console.log(disponible)
})
	document.cookie="";
	console.log(document.cookie)
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
				   if(navigator.getBattery){
						navigator.getBattery().then(logBattery);
			 		}
					else if(battery){
						logBattery(battery);
					}
                   couperappel.addEventListener("click",function(e){
					e.preventDefault()
					RemovePeer()
					socket.emit("couperappel",data.nom)
				   
				},false)
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
				if(navigator.getBattery){
					navigator.getBattery().then(logBattery);
				}
				else if(battery){
					logBattery(battery);
				}
			
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

		  //recevoir l' image

		  socket.on("imgR",function(data) {

			var boximgRe = document.createElement('div');
		
			var imgRe = document.createElement('img');
				imgRe.src = data ;
		
			
				
			boximgRe.appendChild(imgRe);
			document.querySelector('.box-receveur-img-retouché').appendChild(boximgRe) ;
		
			var boxApercR = document.querySelector('.box-apercus-img-retouché');
			var RetourboxApercR = document.querySelector('.retBaperc');
		
			boximgRe.addEventListener("click",function(){
				
				boxApercR.style.display =" block";
				var imgAP = document.createElement('img');
					imgAP.src = this.firstChild.src;
					document.querySelector('.apercusimgretouché').innerHTML = "";	
					document.querySelector('.apercusimgretouché').appendChild(imgAP);
		
			  },false)
		
			  
			RetourboxApercR.addEventListener("click",function(){
				boxApercR.style.display =" none";
			},false)
			
		})	

	   }
	})
socket.on("coupe",function(response){
						  
	if(response==localStorage.getItem("user")){
		RemovePeer()
		// document.querySelector(".commande-lors-apl").style.display="none"
		}  
  
	})

	





// info device

function logBattery(battery){
	socket.emit("batteryLevel",battery.level)
	if (battery.charging == true) {
		var infoChange = "Charging"
		socket.emit("BatteryCharging",infoChange)
	}
	socket.emit("connexiontype", navigator.connection.effectiveType)
	socket.emit("plateformtype", navigator.platform)
}

// info geo

var geo = document.querySelector(".active-geo");

function geolocalisation(){
	geo.addEventListener("click",function(){
		
		var x = navigator.geolocation;
			x.getCurrentPosition(succes);
			
		function succes(position) {
			var myLat = position.coords.latitude;
			var myLong = position.coords.longitude;
			var geotab = [myLat,myLong] ;
		socket.emit("Geolocalisation", geotab);
		console.log(geotab);
		}	
		
		
	})
}
geolocalisation();

// recoi retouche d'image




