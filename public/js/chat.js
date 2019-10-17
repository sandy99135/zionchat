   var  tableau = document.querySelector('.tableau'), 
        outil = document.querySelector('.outil'), 
        icones = document.querySelector('.icones'),
        BLadmin = document.querySelectorAll('.BL-admin'),

        iconeTableau = document.querySelector('.icone-tableau'),
        iconeOutil = document.querySelector('.icone-outil'),
        iconeTache = document.querySelector('.icones-tache'),
        iconeRight = document.querySelectorAll('.ico-r'),

        iconeComferance = document.querySelector('.icone-comferance'),

        reglageRight = document.querySelector('.reglage-right'),
        milieu = document.querySelector('.milieu'),
        full = document.querySelector('.full'),  
        retourBLoutil = document.querySelector('.retour-bl-outil'),
        retourBLeft = document.querySelectorAll('.retour-bl'),
        retourBLAdmin = document.querySelectorAll('.retour-right'); 
       

 tab = function(){ 

       iconeTableau.addEventListener('click',function() {
        icones.style.opacity = "0";
        tableau.style.transform = "translateX(0%)";
       },true) 
      // gere outil
       
       iconeOutil.addEventListener('click',function() {
        icones.style.opacity = "0";
        outil.style.transform = "translateX(0%)";
        var facture = document.createElement('iframe');
            facture.src = "facture/facture.html";
            facture.frameborder ="0";
            facture.style.width = "100%";
            facture.style.height = "100%";
        outil.appendChild(facture);    
       },true) 
       retourBLoutil.addEventListener('click',function() {
        icones.style.opacity = "1";
        outil.style.transform = "translateX(-100%)";
       },true) 
      


       //    reglage taille tableau
       full.addEventListener('click',function() {
          tableau.style.width = "100%";
          reglageRight.style.background ="rgba(0, 0, 0, 0.749)"
       },true)
       milieu.addEventListener('click',function() {
        tableau.style.width = "50%";
        reglageRight.style.background ="rgba(0, 0, 0, 0.349)"
       },true)

       for(var i = 0; i <  retourBLeft.length ;i++) {
        retourBLeft[i].addEventListener('click',function() {
            tableau.style.width = "50%";   
            tableau.style.transform = "translateX(-100%)";
            
            icones.style.opacity = "1";
            reglageRight.style.background ="rgba(0, 0, 0, 0.349)"
           },true)
       }  
      

        //    reglage ICONE ADMINISTRATEUR

        var tabiconeRight = [];
        for(var r = 0; r < iconeRight.length ;r++) { 
            tabiconeRight.push(iconeRight[r]);
          }
        tabiconeRight.map((call,index)=>{
         call.addEventListener('click',function() {
            e = index;
            iconeTache.style.display ="none";
            for(var b = 0; b < BLadmin.length ;b++) { 
                BLadmin[e].style.transform = "translateX(0%)";
              }

           },true)
        }) 
        // RETOUR BL admin)
        for(var rb = 0; rb < retourBLAdmin.length ;rb++) { 
            retourBLAdmin[rb].addEventListener('click',function() {
                this.parentNode.style.transform = "translateX(100%)";
                iconeTache.style.display ="block";
             },true)
          }
       // affiche opacity BL text
        var range = document.querySelector('.range');
         range.addEventListener('change',function() {
            document.querySelector('.aff-opacity').innerHTML = range.value;
         },true)
        
       // Gere choix type de chart a afficher
       var type2 = type = document.querySelectorAll('.type');
       var affType = document.querySelectorAll('.box-chart');
       var tabtype = [];
       for(var ty = 0; ty < type.length ;ty++) { 
          tabtype.push(type[ty]);
       }
       tabtype.map((call1,index1)=>{
        call1.addEventListener('click',function() {
           te1 = index1;
           for(var ty2 = 0; ty2 < type2.length ;ty2++) { 
             type2[ty2].style.color ="black";
            }
           this.style.color ="rgb(248, 252, 3)";
           for(var ty3 = 0; ty3 < affType.length ;ty3++) { 
               affType[ty3].style.display ="none";
               affType[te1].style.display ="block";
            }
       },true)
       }) 
       // Gere J M A dans chart
           // Gere J M A dans chart LINE
            var time2 = time = document.querySelectorAll('.time');
            
            var affTime = document.querySelectorAll('.aff-time');
            var tabtime = [];
            for(var t = 0; t < time.length ;t++) { 
               tabtime.push(time[t]);
            }
            tabtime.map((call2,index2)=>{
             call2.addEventListener('click',function() {
                te = index2;
                for(var t2 = 0; t2 < time2.length ;t2++) { 
                    time2[t2].style.background ="white";
                 }
                this.style.background ="rgb(248, 252, 3)";
                for(var t3 = 0; t3 < affTime.length ;t3++) { 
                    affTime[t3].style.display ="none";
                    affTime[te].style.display ="block";
                 }
            },true)
            }) 
            // Gere J M A dans chart AREA
            var timeA2 = timeA = document.querySelectorAll('.timeA');
            var affTimeA = document.querySelectorAll('.aff-timeA');
            
            var tabtimeA = [];
            for(var tA = 0; tA < timeA.length ;tA++) { 
            tabtimeA.push(timeA[tA]);
            }
            tabtimeA.map((callA2,indexA2)=>{
            callA2.addEventListener('click',function() {
                teA = indexA2;
                for(var tA2 = 0; tA2 < timeA2.length ;tA2++) { 
                    timeA2[tA2].style.background ="white";
                }
                this.style.background ="rgb(248, 252, 3)";
                for(var tA3 = 0; tA3 < affTimeA.length ;tA3++) { 
                    affTimeA[tA3].style.display ="none";
                    affTimeA[teA].style.display ="block";
                }
            },true)
            }) 
            // Gere J M A dans chart PIE
            var timeP2 = timeP = document.querySelectorAll('.timeP');
            var affTimeP = document.querySelectorAll('.aff-timeP');
            
            var tabtimeP = [];
            for(var tP = 0; tP < timeP.length ;tP++) { 
            tabtimeP.push(timeP[tP]);
            }
            tabtimeP.map((callP2,indexP2)=>{
            callP2.addEventListener('click',function() {
                teP = indexP2;
                for(var tP2 = 0; tP2 < timeP2.length ;tP2++) { 
                    timeP2[tP2].style.background ="white";
                }
                this.style.background ="rgb(248, 252, 3)";
                for(var tP3 = 0; tP3 < affTimeP.length ;tP3++) { 
                    affTimeP[tP3].style.display ="none";
                    affTimeP[teP].style.display ="block";
                }
            },true)
            }) 
            // Gere J M A dans chart BAR
            var timeB2 = timeB = document.querySelectorAll('.timeB');
            var affTimeB = document.querySelectorAll('.aff-timeB');
            
            var tabtimeB = [];
            for(var tB = 0; tB < timeB.length ;tB++) { 
            tabtimeB.push(timeB[tB]);
            }
            tabtimeB.map((callB2,indexB2)=>{
            callB2.addEventListener('click',function() {
                teB = indexB2;
                for(var tB2 = 0; tB2 < timeB2.length ;tB2++) { 
                    timeB2[tB2].style.background ="white";
                }
                this.style.background ="rgb(248, 252, 3)";
                for(var tB3 = 0; tB3 < affTimeB.length ;tB3++) { 
                    affTimeB[tB3].style.display ="none";
                    affTimeB[teB].style.display ="block";
                }
            },true)
            }) 
              // Gere J M A dans chart MAP
              var timeM2 = timeM = document.querySelectorAll('.timeM');
              var affTimeM = document.querySelectorAll('.aff-timeM');
              
              var tabtimeM = [];
              for(var tM = 0; tM < timeM.length ;tM++) { 
              tabtimeM.push(timeM[tM]);
              }
              tabtimeM.map((callM2,indexM2)=>{
              callM2.addEventListener('click',function() {
                  teM = indexM2;
                  for(var tM2 = 0; tM2 < timeM2.length ;tM2++) { 
                      timeM2[tM2].style.background ="white";
                  }
                  this.style.background ="rgb(248, 252, 3)";
                  for(var tM3 = 0; tM3 < affTimeM.length ;tM3++) { 
                      affTimeM[tM3].style.display ="none";
                      affTimeM[teM].style.display ="block";
                  }
              },true)
              }) 
      


               // Gere video aide affichage
               var videoaide = document.querySelector('.aide');
                   videoaide.addEventListener('click',function() {
                        this.style.height = "auto"
                   },true)




               // Gere THEME admine affichage choix
                    var Choix = document.querySelectorAll('.choix');
                    var BLChoix = document.querySelectorAll('.admin-tm');
                    var tabChoix = [];
                    for(var r3 = 0; r3 < Choix.length ;r3++) { 
                        tabChoix.push(Choix[r3]);
                    }
                    tabChoix.map((call3,index3)=>{
                    call3.addEventListener('click',function() {
                        e = index3;
                        for(var b3 = 0; b3 < BLadmin.length ;b3++) { 
                            BLChoix[b3].style.display = 'none';
                            BLChoix[e].style.display = 'block';
                        }

                    },true)
                    }) 

             
 
            
                
                            
                   
                
                   





 };
 tab();


