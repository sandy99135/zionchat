var  menu = document.querySelector('#blockmenu'),    
             hamberger = document.querySelector('.hamberger'),
             retour = document.querySelector('.retour');
             
             initiation = 0;
             hambergerclick = function(){                       // CLIQUER SUR AMBERGER
                             hamberger.addEventListener('click',function() {
                                 initiation = 1; 
                                 menu.style.transition = "transform 0.2s";
                                 menu.style.transform = "translateY(0%) ";
                                 hamberger.style.opacity = "0";
                                 retour.style.opacity = "1";
                             },false);	 
                             if(initiation = 1){	 
                                retour.addEventListener('click',function() {
                                menu.style.transition = "transform 0.2s";
                                menu.style.transform = "translateY(-150%) ";
                                hamberger.style.opacity = "1";
                                retour.style.opacity = "0";
                             },false);
                            
                           }
                 };
                     hambergerclick();