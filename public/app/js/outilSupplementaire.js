   var  BLadmin = document.querySelectorAll('.BL-admin'),
        InterfaceBL = document.querySelectorAll('.INTERFACE-BL'),
        icoInterfaceBL = document.querySelectorAll('.int-ico'),

        
        iconeOutil = document.querySelector('.icone-outil'),
        iconePLusOutil = document.querySelector('.ico-plus-outil'),
        iconeRight = document.querySelectorAll('.button-aff'),

        retourBl = document.querySelectorAll('.retour-int-bl'),
        retourBLAdmin = document.querySelectorAll('.retour-right'); 
       

 outilAffichage = function(){ 


   
        //    reglage ICONE ADMINISTRATEUR box-shadow: 

        var tabiconeRight = [];
        for(var r = 0; r < iconeRight.length ;r++) { 
            tabiconeRight.push(iconeRight[r]);
          }
        tabiconeRight.map((call,index)=>{
         call.addEventListener('click',function() {
            e = index;
            for(var b = 0; b < BLadmin.length ;b++) { 
                BLadmin[e].style.right = "0%";
                BLadmin[e].style.boxShadow = "-5px 5px 5px rgba(0, 0, 0, 0.199)";
              }
           
           },true)
        }) 
        // RETOUR BL admin)
        for(var rb = 0; rb < retourBLAdmin.length ;rb++) { 
            retourBLAdmin[rb].addEventListener('click',function() {
                this.parentNode.style.right = "-100%";
                this.parentNode.style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)";
             },true)
          }
       // affiche opacity BL text
        // var range = document.querySelector('.range');
        //  range.addEventListener('change',function() {
        //     document.querySelector('.aff-opacity').innerHTML = range.value;
        //  },true)
        
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
       // Gere J M A dans chart admin
           // Gere J M A dans chart LINE admin
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
            // Gere J M A dans chart AREA admin
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
            // Gere J M A dans chart PIE admin
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
            // Gere J M A dans chart BAR admin
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
              // Gere J M A dans chart MAP admin
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
      


           


             








 };
 outilAffichage();


