var  toriteny = document.querySelectorAll('#toriteny'),  
    retour = document.querySelectorAll('.tap');  

for(var i = 0; i < toriteny.length ;i++) { 
	// toriteny[i].style.backgroundColor= "red";
	toriteny[i].addEventListener('click',function() {
		this.style.transition = "transform 0.5s";
		this.style.height= "auto";
		},true);
		
}
console.log(retour.length);
for(var r = 0; r < retour.length ;r++) { 
	
		retour[r].addEventListener('click',function() {
			this.parentNode.style.height= "70px";
			},false);	
}				 


toritenyclick = function(){    
                 
	 
			
	};
	toritenyclick();
