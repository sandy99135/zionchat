var     BLOCKmn = document.querySelectorAll('.MN'), 
        mn = document.querySelectorAll('.mn'),
        theme = document.querySelector('.mn1'),    
        contenue = document.querySelector('.mn2'),
        email = document.querySelector('.mn3'),
        BLtheme = document.querySelector('.theme'),
        BLcontenue = document.querySelector('.contenue'),
        BLemail = document.querySelector('.email'),
        entete = document.querySelector('.en-tt'),
        affichage = document.querySelector('.aff-dt'),
        activité = document.querySelector('.tb-act'),
        pied = document.querySelector('.pd'),
        BLtete = document.querySelector('.formulaire-tete'),
        BLaffichage = document.querySelector('.document-affichage'),
        BLactivité = document.querySelector('.BLactivité'),
        BLpied = document.querySelector('.BLpied');

       
                  mnclick = function(){
                     var tabmn = [];
                     for(var  bm = 0; bm < mn.length ;bm++) { 
                     tabmn.push(mn[bm]);
                    }
                  
                    tabmn.map((call3,index3)=>{
                    call3.addEventListener('click',function() {
                           var wn;
                           wn = index3;
                           
                           for(var ms = 0; ms < mn.length ;ms++) {
                            mn[ms].style.color ="white";
                            mn[ms].style.backgroundColor ="rgb(9, 172, 77)";
                           } 
                           call3.style.color ="rgb(9, 172, 77)";
                           call3.style.backgroundColor ="white";

                           for(var qm = 0; qm < BLOCKmn.length ;qm++) {
                            BLOCKmn[wn].style.display = "block";
                            BLOCKmn[qm].style.display = "none";
                           }
                        },true)
                    })
                       
                        // gere affichage dans parametre contenues
                        entete.addEventListener('click',function() {         // CLICK ENTETE
                            BLtete.style.display ="block";
                            BLaffichage.style.display ="none";
                            BLactivité.style.display ="none";
                            BLpied.style.display ="none";

                            this.style.color = "rgb(9, 172, 77)";
                            affichage.style.color ="black";
                            activité.style.color ="black";
                            pied.style.color ="black";

                          },false);
                        affichage.addEventListener('click',function() {       // CLICK AFFICHAGE
                            BLtete.style.display ="none";
                            BLaffichage.style.display ="block";
                            BLactivité.style.display ="none";
                            BLpied.style.display ="none";

                            this.style.color = "rgb(9, 172, 77)";
                            entete.style.color ="black";
                            activité.style.color ="black";
                            pied.style.color ="black";
                          },false);

                        activité.addEventListener('click',function() {         // CLICK ENTETE
                            BLtete.style.display ="none";
                            BLaffichage.style.display ="none";
                            BLactivité.style.display ="block";
                            BLpied.style.display ="none";

                            this.style.color = "rgb(9, 172, 77)";
                            affichage.style.color ="black";
                            entete.style.color ="black";
                            pied.style.color ="black";

                          },false);
                        pied.addEventListener('click',function() {       // CLICK pied
                            BLtete.style.display ="none";
                            BLaffichage.style.display ="none";
                            BLactivité.style.display ="none";
                            BLpied.style.display ="block";

                            this.style.color = "rgb(9, 172, 77)";
                            activité.style.color ="black";
                            affichage.style.color ="black";
                            entete.style.color ="black";
                          },false);
                          
                       
                       
                       
                      
            };
            mnclick();

// gere range zoom de dezoom
function rangeSlider(value){
  document.querySelector('.affiche-zoom').innerHTML = 100-(value*10) +"%" ; 
  var zoom = document.querySelector('.apercus');
      zoom.style.transform = "scale("+(1-value*0.1)+")" ; 
}
// gere ok font-family theme
var okFont = document.querySelector('.ok-font');
   okFont.addEventListener('click',function() {
   document.querySelector('.apercus').style.fontFamily = document.querySelector('.font').value;
  },true)  
// gere POLICE mention légale
var mention = document.querySelectorAll('.mention-légale'),
    police = document.querySelectorAll('.po');
    for(var po = 0; po < police.length ;po++) { 
        police[po].addEventListener('click',function() {
        var pt = this.value;
        for(var me = 0; me < mention.length ;me++) {
          mention[me].style.fontSize = pt+"px";
         }
       },true)
     } 

// gere affiche  Theme  par selection
changetheme = function(){ 
  var  theme = document.querySelectorAll('.change-theme'),
       BLtheme = document.querySelectorAll('.chg-th');  
   var a;
   var tabtheme = [];
  for(var  b = 0; b < theme.length ;b++) { 
        tabtheme.push(theme[b]);
      }
     
   tabtheme.map((call,index)=>{
       call.addEventListener('click',function() {
              
              a = index;
              for(var q = 0; q < BLtheme.length ;q++) {
                  BLtheme[q].style.opacity = "0";
                  BLtheme[a].style.opacity = "1"; 
              }
           },true)
      })
  
           
   };
changetheme();    

// gere affichage logo  
afficheLogo = function(){ 
   var logo = document.querySelectorAll('.apercus-logo'),
       afficheLogo = document.querySelector('.aff-logo'), 
       supLogo = document.querySelector('.sup-logo');
       
       afficheLogo.addEventListener('click',function() { 
        for(var l = 0; l < logo.length ;l++) { 
          logo[l].style.display ="block";
        }
        },false);
       supLogo.addEventListener('click',function() { 
        for(var lo = 0; lo < logo.length ;lo++) { 
          logo[lo].style.display ="none";
        }  
       },false);
  };
afficheLogo(); 

// gere theme couleur
 changeColor = function(){ 
  var ok = document.querySelector('.ok');
     ok.addEventListener('click',function() {  
         var couleur = document.querySelector('.color').value; 
         var colorer = document.querySelectorAll('.a-colorer'); 
         var actFond = document.querySelectorAll('.a-fond'); 
         for(var n = 0; n < colorer.length ;n++) { 
             colorer[n].style.color = couleur;
          }
         for(var m = 0; m < colorer.length ;m++) { 
          actFond[m].style.backgroundColor = couleur;
         } 
         
      },false);
  };
  changeColor();

// gere checked dynamique et Table activity
 ajoutColonne = function(){ 
        var  colonne = document.querySelectorAll('.col'),
             décolonne = document.querySelectorAll('.col2'),   
             tap = document.querySelectorAll('.tap'),
             actiAjout = document.querySelectorAll('.act'),
             Ajout = document.querySelectorAll('.aj');

         var co1 = document.querySelector('.co-1'),
             co2 = document.querySelector('.co-2'),   
             co3 = document.querySelector('.co-3'), 
             co4 = document.querySelector('.co-4'), 
             co5 = document.querySelector('.co-5'), 
             co6 = document.querySelector('.co-6'), 
             co7 = document.querySelector('.co-7'), 
             co8 = document.querySelector('.co-8'), 
             co9 = document.querySelector('.co-9');

         var de1 = document.querySelector('.de-1'),
             de2 = document.querySelector('.de-2'),
             de3 = document.querySelector('.de-3'),
             de4 = document.querySelector('.de-4'),
             de5 = document.querySelector('.de-5'),
             de6 = document.querySelector('.de-6'),
             de7 = document.querySelector('.de-7'),
             de8 = document.querySelector('.de-8'),
             de9 = document.querySelector('.de-9');  

        var  t1 = document.querySelectorAll('.t-1'), 
             t2 = document.querySelectorAll('.t-2'),
             t3 = document.querySelectorAll('.t-3'),
             t4 = document.querySelectorAll('.t-4'),
             t5 = document.querySelectorAll('.t-5'),
             t6 = document.querySelectorAll('.t-6'),
             t7 = document.querySelectorAll('.t-7'),
             t8 = document.querySelectorAll('.t-8'),
             t9 = document.querySelectorAll('.t-9');    
         var e;
         var tabColonne = [];
        
         //  1er clic  pour afficher champ  
         for(var i = 0; i < colonne.length ;i++) { 
              tabColonne.push(colonne[i]);
            }
           
         tabColonne.map((call,index)=>{
             call.addEventListener('click',function() {
                    e = index;                            //bouttom z-index 0 (bouton rouge en arriere plan)
                    call.style.zIndex = "0";
                    for(var r = 0; r < tap.length ;r++) {  //champ
                        tap[e].style.display = "block";  
                    }
               
                 },true)
          })
          //  1er clic pour Ajout tableau dynamique
          co1.addEventListener('click',function() {
            for(var tb1 = 0; tb1 < t1.length ;tb1++) {t1[tb1].innerHTML ="DATE";  }
          },true)
          co2.addEventListener('click',function() {
            for(var tb2 = 0; tb2 < t2.length ;tb2++) {t2[tb2].innerHTML ="P/S";  }
          },true)
          co3.addEventListener('click',function() {
            for(var tb3 = 0; tb3 < t3.length ;tb3++) {t3[tb3].innerHTML ="DESCRIPTION";  }
          },true)
          co4.addEventListener('click',function() {
            for(var tb4 = 0; tb4 < t4.length ;tb4++) {t4[tb4].innerHTML ="QT";  }
          },true)
          co5.addEventListener('click',function() {
            for(var tb5 = 0; tb5 < t5.length ;tb5++) {t5[tb5].innerHTML ="PU";  }
          },true)
          co6.addEventListener('click',function() {
            for(var tb6 = 0; tb6 < t6.length ;tb6++) {t6[tb6].innerHTML ="TVA";  }
          },true)
          co7.addEventListener('click',function() {
            for(var tb7 = 0; tb7 < t7.length ;tb7++) {t7[tb7].innerHTML ="REF";  }
          },true)
          co8.addEventListener('click',function() {
            for(var tb8 = 0; tb8 < t8.length ;tb8++) {t8[tb8].innerHTML ="REMISE";  }
          },true)
          co9.addEventListener('click',function() {
            for(var tb9 = 0; tb9 < t9.length ;tb9++) {t9[tb9].innerHTML ="MONTANT EN AR";  }
          },true)


          //  2er clic pour enlever champ et tableau  
          de1.addEventListener('click',function() {
             co1.style.zIndex = "1";                     //boutt pour supp
             tap[0].style.display = "none";              //champ
             for(var tb1 = 0; tb1 < t1.length ;tb1++) {t1[tb1].innerHTML ="";  }
          },true)
          de2.addEventListener('click',function() {
             co2.style.zIndex = "1";            
             tap[1].style.display = "none";   
             for(var tb2 = 0; tb2 < t2.length ;tb2++) {t2[tb2].innerHTML ="";  }  
          },true)
          de3.addEventListener('click',function() {
             co3.style.zIndex = "1";            
             tap[2].style.display = "none";  
             for(var tb3 = 0; tb3 < t3.length ;tb3++) {t3[tb3].innerHTML ="";  }   
          },true)
          de4.addEventListener('click',function() {
             co4.style.zIndex = "1";            
             tap[3].style.display = "none"; 
             for(var tb4 = 0; tb4 < t4.length ;tb4++) {t4[tb4].innerHTML ="";  } 
            },true)   
          de5.addEventListener('click',function() {
             co5.style.zIndex = "1";            
             tap[4].style.display = "none";  
             for(var tb5 = 0; tb5 < t5.length ;tb5++) {t5[tb5].innerHTML ="";  }   
          },true)
          de6.addEventListener('click',function() {
            co6.style.zIndex = "1";            
            tap[5].style.display = "none"; 
            for(var tb6 = 0; tb6 < t6.length ;tb6++) {t6[tb6].innerHTML ="";  }    
          },true)
          de7.addEventListener('click',function() {
            co7.style.zIndex = "1";            
            tap[6].style.display = "none"; 
            for(var tb7 = 0; tb7 < t7.length ;tb7++) {t7[tb7].innerHTML ="";  }    
          },true)
          de8.addEventListener('click',function() {
            co8.style.zIndex = "1";            
            tap[7].style.display = "none";  
            for(var tb8 = 0; tb8 < t8.length ;tb8++) {t8[tb8].innerHTML ="";  }
          },true)   
          de9.addEventListener('click',function() {
            co9.style.zIndex = "1";            
            tap[8].style.display = "none"; 
            for(var tb9 = 0; tb9 < t9.length ;tb9++) {t9[tb9].innerHTML ="";  }    
           },true)
  
   

             
            
            
                    
	       };
     ajoutColonne();
