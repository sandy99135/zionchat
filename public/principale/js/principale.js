var  menusPrincipale = document.querySelectorAll('.m-p'), 
     BLmenus = document.querySelectorAll('.BL-Menu');
    // affiche Block menus
    PricipaleMenus = function(){
            var tabmn = [];
            for(var r = 0; r < menusPrincipale.length ;r++) { 
                tabmn.push(menusPrincipale[r]);
            }
            tabmn.map((call,index)=>{
            call.addEventListener('click',function() {
                e = index;
                var  menusP = document.querySelectorAll('.m-p'); 
                for(var i = 0; i <  menusP.length ;i++) { 
                    menusP[i].style.backgroundColor = "white";
                    menusP[i].style.color = "black";
                }
                this.style.backgroundColor = "#292929";
                this.style.color = "white";
                for(var b = 0; b <  BLmenus.length ;b++) { 
                    BLmenus[b].style.display = "none";
                    BLmenus[e].style.display = "block";
                }
        
            },true)
            }) 
     }
     PricipaleMenus();

    //  deconnexion affichage     

    //  gere client         
       var  form = document.querySelector('.forme-nouveau'),
            retourClient = document.querySelector  ('.retour-form')  ;
            nouvelle = document.querySelector('.nouvelle');

       nouvelleclick = function(){                       // CLIQUER nouvelle client
                        nouvelle.addEventListener('click',function() {
                              form.style.transition = "left 0.2s";
                              form.style.right = "0%";
                          },false);	 
                        retourClient .addEventListener('click',function() {
                            form.style.transition = "left 0.2s";
                            form.style.right = "-100%";
                            },false);
                  
              };
        nouvelleclick();
         
           