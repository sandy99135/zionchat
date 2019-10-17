let liste=document.querySelector("#listemembre")
let notification=document.querySelector("#listnotif")
let participant=document.querySelector("#participant")
let titre=document.querySelector("#titre")
let date=document.querySelector("#date")
let creer=document.querySelector("#creer")
var tab=[]
 fetch("http://localhost:4000/user")
                .then(data => {
                return data.json();
                })
                .then(json1 => {

                json1.filter(user=>user.nom!==localStorage.getItem("user")).map(function(user,index){
                	let li =document.createElement("li")
                	let label=document.createElement("label")
                	let div=document.createElement("div")
                	div.style.width="20px"
                	div.style.height="20px"
                	div.style.border="1px solid black"
                	label.innerHTML=user.nom
                	
                	var chev=false
               		if(chev===true){
          					div.style.background="silver"
                			tab.push(user.nom)
                			
                		}
                		else{
                			console.log(user.nom,chev)
                			div.style.background="white"
                			for(let index=0;index<tab.length;index++){
                				if(tab[index]==user.nom){
                					
                					tab.splice(index,1)

                				}
                			}
                		}
                	participant.value=tab.join(",")
                	div.addEventListener("click",function(e){
                		e.preventDefault()
                		participant.value=""
                		chev=!chev
                		if(chev===true){
          					div.style.background="silver"
                			tab.push(user.nom)
                		}
                		else{
                			console.log(user.nom,chev)
                			div.style.background="white"
                			for(let index=0;index<tab.length;index++){
                				if(tab[index]==user.nom){
                					tab.splice(index,1)

                				}
                			}
                			
                		}

                	participant.value=tab.join(",")
                	},false)
                	
                	li.appendChild(div)
                	li.appendChild(label)
                	liste.appendChild(li)
                })
                
             });

 //creer conference 
 creer.addEventListener("click",function(e){
                		e.preventDefault()
                	const data = new FormData();
                	data.append("titre",titre.value)
                    data.append("date",date.value)
                       data.append("participant",participant.value)
                    fetch('http://localhost:4000/conference/'+localStorage.getItem("iduserconnecte"), {
                        method: 'POST',
                        body: data,
                    }).then((response) => 
                        response.json()).then(data=>{
                           console.log(data)
                           socket.emit("envoiereceivernotif",data.participant)
                        })
                	},false)
 var nombre2=document.querySelector(".nombre2")
 socket.on("receivernotif",function(rece) {
            console.log(rece)
            var liste=rece.split(",")
            console.log(liste)
             for (var i = 0; i <liste.length; i++) {
             if(liste[i]==localStorage.getItem("user")){
                audio.play()
                nombre2.innerHTML=parseInt(nombre2.innerHTML)+1
                  }
                 }
            
                     
              })     
//gerer la liste de notification recu par un utilisateur
fetch("http://localhost:4000/conference").then(response=>response.json()).
 then(function(data){

 	data.map(function(conf){
 		let li = document.createElement("li")
 	li.innerHTML=conf.titre
 	var liste=conf.participant.split(",")
 for (var i = 0; i <liste.length; i++) {
 if(liste[i]==localStorage.getItem("user")){
   notification.appendChild(li)
 }
 }
 	})

 	})

 // affichage ajout conference
     var discussion= false
       
        var barajout=document.querySelector(".conf")
        var ajout=document.querySelector(".ajoutconf")
         if(discussion){
           barajout.style.display="block"
            // nombre.innerHTML=0
        }
        else{
             barajout.style.display="none"
        }        
        ajout.addEventListener('click',function(e) {
               e.preventDefault() 
               discussion=!discussion
               console.log(discussion)
               if(discussion){
            barajout.style.display="block"
            }
        else{
            barajout.style.display="none"
        }        
            },true) 
 	
    // affichage notification
     var discussion1= false
       
        var notification1=document.querySelector(".notif")
        var afficnotif=document.querySelector(".confe")
         if(discussion1){
           notification1.style.display="block"
            fetch("http://localhost:4000/conference").then(response=>response.json()).
                 then(function(data){

                    data.map(function(conf){
                        let li = document.createElement("li")
                    li.innerHTML=conf.titre
                    var liste=conf.participant.split(",")
                 for (var i = 0; i <liste.length; i++) {
                 if(liste[i]==localStorage.getItem("user")){
                   notification.appendChild(li)
                 }
                 }
                    })

        })
        }
        else{
            notification1.style.display="none"
        }        
       afficnotif.addEventListener('click',function(e) {
               e.preventDefault() 
               discussion1=!discussion1
               console.log(discussion1)
               if(discussion1){
            notification1.style.display="block"

            nombre2.innerHTML=0
            notification.innerHTML=""
             fetch("http://localhost:4000/conference").then(response=>response.json()).
                 then(function(data){

                data.map(function(conf){
                        let li = document.createElement("li")
                        var date2 = new Date(conf.createdAt);

                var date1 = new Date();
                var duree= ""
                if((date1-date2)/1000<60){
               duree=(date1-date2)/1000 + " secondes";
                }
                else if((date1-date2)/1000>=60 && (date1-date2)/1000<3600) {
                duree=Math.round((date1-date2)/60000) + " minutes"
                }
                else if((date1-date2)/1000>=3600 && (date1-date2)/1000<86400) {
                duree=Math.round((date1-date2)/3600000) + " heures"
                }
                else if((date1-date2)/1000>=86400 && (date1-date2)/1000<604800) {
                duree=Math.round((date1-date2)/86400000) + " jours"
                }
                else if((date1-date2)/1000>=604800 && (date1-date2)/1000<2419200) {
                duree=Math.round((date1-date2)/604800000) + " semaines"
                }
                else if((date1-date2)/1000>=2419200 && (date1-date2)/1000<9676800) {
               duree=Math.round((date1-date2)/2419200000) + " mois"
                }
                else{
                  duree=Math.round((date1-date2)/29030400000) + " ans"
}
                    li.innerHTML=conf.titre + "  il a "+ duree
                    var liste=conf.participant.split(",")
                 for (var i = 0; i <liste.length; i++) {
                 if(liste[i]==localStorage.getItem("user")){
                   notification.appendChild(li)
                 }
                 }
                    })

        })
        }
        else{
            notification1.style.display="none"
        }        
            },true) 
    
