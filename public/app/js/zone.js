


const canvas = document.querySelector('.canvas-zone');
const ctx = canvas.getContext('2d');
var isDrawing = false;
    canvas.width = 1229;
    canvas.height = 800;
    // prendre par taille de screen
    // canvas.width = window.innerWidth - (window.innerWidth*(0.368));
    // canvas.height = window.innerHeight;
    
const clearButton = document.querySelector('.clear');
const stroke_weight = document.querySelector('.stroke-weight');
const color_picker = document.querySelector('.color-picker');


  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stop);



clearButton.addEventListener('click', clearCanvas);

function start (e) {
  isDrawing = true;
  draw(e);
}

function draw ({offsetX: x, offsetY: y}) {
  if (!isDrawing) return;
  ctx.lineWidth = stroke_weight.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = color_picker.value;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stop () {
  isDrawing = false;
  ctx.beginPath();
}



function clearCanvas () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



document.querySelector('.pencil').addEventListener('click',function() {
    document.querySelector('.to-stop-drawing').style.display = 'none'
},true)

// arret temporell de drawing canvas lors click autre instrument 

var stopDraw = document.querySelectorAll('.no-draw')
var tabdraw = [];

for(var r = 0; r < stopDraw.length ;r++) { 
    tabdraw.push(stopDraw[r]);
  }

  tabdraw.map((call,index)=>{
  call.addEventListener('click',function() {
    document.querySelector('.to-stop-drawing').style.display = 'block'
  },true)
}) 

// Remove retouche canvas : Bouton droit d'ecran pour enlever l'image et canvas

    document.querySelector('.remove-retouche').addEventListener('click',function() {
      this.style.display = 'none';
      document.querySelector('.box-img-aRetouché').innerHTML = "";
      clearCanvas ();
},true)





// take retouche block-video-live

var blockvideolive = document.querySelector('.block-video-live');
var BoxContRetouche = document.querySelector('.retouche-zone');
var saveRetouche = document.querySelector('.save-retouche');
var boxTakeRetouche = document.querySelector('.box-apercus');
var downretouche = document.querySelector('.down-retouche');
var boxapercus = document.querySelector('.box-apercus');
var takeretouche = document.querySelector('.take-retouche');

var retourtake = document.querySelector('.retour-take');
var downretouche = document.querySelector('.down-retouche');

var EleveRetouche = document.querySelector('.remove-retouche');
var imgValue = document.querySelector(".stock-img-value");

function takeRetouche(){ 

  saveRetouche.addEventListener('click',function() { 
     takeretouche.style.display = 'block';
     boxTakeRetouche.innerHTML = " ";
      
   domtoimage.toPng(BoxContRetouche).then(function(dataUrl) {
        // console.log(dataUrl)
        var aperc = document.createElement("img");
            aperc.src = dataUrl;
            aperc.style.width = "100%";
        boxTakeRetouche.innerHTML = " ";
        boxTakeRetouche.appendChild(aperc);

        // envoyer image
        document.querySelector(".envoyer-image").addEventListener('click',function() { 
          socket.emit("imageRetouché", dataUrl);
          
      },true)

      
    })

      
    
},true)


}
takeRetouche();


downretouche.addEventListener('click',function() { 
    domtoimage.toBlob(boxTakeRetouche).then(function (blob) {
        window.saveAs(blob, 'my-img.png');
        });	 
},true)

retourtake.addEventListener('click',function() { 
    takeretouche.style.display = 'none'; 
},true)







          // REGLAGE GENERALE D'AFFICHAGE BL

          var bt = document.querySelectorAll('.bt');
          var bl = document.querySelectorAll('.bl');
          var tab= [];
          for(var b = 0; b < bt.length ;b++) { 
              tab.push(bt[b]);
            }
            tab.map((call,index)=>{
            call.addEventListener('click',function() {
              e = index;
              for(var c = 0; c <  bl.length ;c++) { 
                  bl[c].style.display = "none";
                  bl[e].style.display = "block";
                }

            },true)
           }) 
           
          // GERE AFFICHAGE BL CIRCLE

          var circle = document.querySelector('.circle');
          var BLcircle = document.querySelector('.bl-circle');
          var BLcircleRetour = document.querySelector('.retour-bl-circle');

          circle.addEventListener('click',function() { 
            BLcircle.style.display = 'block'; 
          },true)

          BLcircleRetour.addEventListener('click',function() { 
            BLcircle.style.display = 'none'; 
          },true)

          // gere PENCIL  

          var pencil = document.querySelector('.pencil');
          var BLpencil = document.querySelector('.bl-pencil');
          var Removepencil = document.querySelector('.remove-bl-pencil');
          var BLpencilRetour = document.querySelector('.retour-bl-pencil');
          var strokeweight = document.querySelector('.stroke-weight');
          var strokeweightValue = document.querySelector('.txt-pencil-value');

          pencil.addEventListener('click',function() {
              canvas.style.display = "block" ; 
              BLpencil.style.display = "block" ; 
          },true)

          Removepencil.addEventListener('click',function() {
            clearCanvas();
          },true)

          BLpencilRetour.addEventListener('click',function() {
            BLpencil.style.display = 'none';
          },true)

          strokeweight.addEventListener('change',function() {
            strokeweightValue.innerHTML = this.value+"px";
          },true)
          // GERE AFFICHAGE BL FILTRE  ---- le reglage est dans bundle 

          var filtre = document.querySelector('.filtre');
          var BLfiltre = document.querySelector('.bl-filtre');
          var BLfiltreRetour = document.querySelector('.retour-bl-filtre');

          // filtre.addEventListener('click',function() { 
          //   BLfiltre.style.display = 'block'; 
          // },true)

          BLfiltreRetour.addEventListener('click',function() { 
            BLfiltre.style.display = 'none'; 
          },true)


          // GERE AFFICHAGE BL MARKER
          var marker = document.querySelector('.marker');
          var BLmarker = document.querySelector('.bl-marker');
          var BLmarkerRetour = document.querySelector('.retour-bl-marker');

          // marker.addEventListener('click',function() { 
          //   BLmarker.style.display = 'block'; 
          // },true)

          BLmarkerRetour.addEventListener('click',function() { 
            BLmarker.style.display = 'none'; 
          },true)

          // GERE AFFICHAGE BL TEXTE
          var text = document.querySelector('.text');
          var BLtext = document.querySelector('.bl-text');
          var BLtextRetour = document.querySelector('.retour-bl-text');

          // text.addEventListener('click',function() { 
          //   BLtext.style.display = 'block'; 
          // },true)

          BLtextRetour.addEventListener('click',function() { 
            BLtext.style.display = 'none'; 
          },true)

          // GERE AFFICHAGE BL Picture
          var picture = document.querySelector('.picture');
          var BLpicture = document.querySelector('.bl-picture');
          var BLpictureRetour = document.querySelector('.retour-bl-picture');

          // picture.addEventListener('click',function() { 
          //   BLpicture.style.display = 'block'; 
          // },true)

          BLpictureRetour.addEventListener('click',function() { 
            BLpicture.style.display = 'none'; 
          },true)

          







// GERE DRAP DROP

function drapdrop(element){

  var mousePosition;
  var offset = [0,0];
  
  var isDown = false;

  element.addEventListener('mousedown', function(e) {
      isDown = true;
      offset = [
          element.offsetLeft - e.clientX,
          element.offsetTop - e.clientY
      ];
  }, true);
  
  element.parentNode.addEventListener('mouseup', function() {
      isDown = false;
  }, true);
  
  element.parentNode.addEventListener('mousemove', function(event) {
      event.preventDefault();
      if (isDown) {
          mousePosition = {
  
              x : event.clientX,
              y : event.clientY
  
          };
          element.style.left = (mousePosition.x + offset[0]) + 'px';
          element.style.top  = (mousePosition.y + offset[1]) + 'px';
      }
  }, true);
}




// GERE CIRCLE  

var circle = document.querySelector('.circle');
var TailleCircle = document.querySelector('.txt-range-circle');
var TailleCircleVal = document.querySelector('.txt-circle-value');


TailleCircle.addEventListener('change',function() { 
  TailleCircleVal.innerHTML = this.value +'px';

},true)
    circle.addEventListener('click',function() {
            isCircle = true;
            color_picker.value = "#ff0404";
            BoxContRetouche.addEventListener('click',function(e) { 
                var circle = document.createElement ('div');
                    circle.style.position = "absolute";
                    circle.style.top = e.offsetY - (TailleCircle.value/2) +"px";
                    circle.style.left = e.offsetX- (TailleCircle.value/2) +"px";
                    circle.style.width = TailleCircle.value +"px";
                    circle.style.height = TailleCircle.value +"px";
                    circle.style.borderRadius = "50%";
                    circle.style.border = "4px solid " +color_picker.value+"";
                    
                  this.appendChild(circle);
                  
                  document.querySelector('.remove-bl-circle').addEventListener('click',function() { 
                    BoxContRetouche.removeChild(circle);
                  },true)

                  clearButton .addEventListener('click',function() {  //bouton reset all
                    BoxContRetouche.removeChild(circle);
                  },true)

                  EleveRetouche.addEventListener('click',function() {  //bouton droit X remove
                    BoxContRetouche.removeChild(circle);
                  },true)
          },true)
              
    },true)

    

// GERE TEXTE



	var txtColor = document.querySelector('.txt-color');
	var txtPoliceValue = document.querySelector('.txt-police-value');
	var txtPolice = document.querySelector('.txt-range-police');
	var txtTranspValue = document.querySelector('.txt-transp-value');
	var txtTransp = document.querySelector('.txt-range-transp');
	var txtRotationValue = document.querySelector('.txt-rotation-value');
  var txtRotation = document.querySelector('.txt-range-rotation');
  var txtColor = document.querySelector('.txt-color');
  
  var txtReset = document.querySelector('.txt-reglageReset');
  var txtSup = document.querySelector('.txt-reglageSup');
  var txtSave = document.querySelector('.txt-save');

  var alignLeft = document.querySelector('.a-left'); 
	var alignCenter = document.querySelector('.a-center');
	var alignRight = document.querySelector('.a-right');
	var txtBold = document.querySelector('.t-bold');
	var txtItalic = document.querySelector('.t-italic');
	var txtUnderline = document.querySelector('.t-underline');
	var txtFont = document.querySelectorAll('.txt-ft');  // style du font

function ajoutText(){
  
  
  var boxtext = document.createElement('div');
    boxtext.className = 'zn-boxtext';
    boxtext.style.position = 'absolute';
    // boxtext.style.width= '200px';
    boxtext.style.top= '100px'
    boxtext.style.left= '25%'
    boxtext.style.padding = '10px';
    boxtext.style.border = '4px dotted  rgba(0, 0, 0, 0.001)';
    boxtext.style.cursor = 'move';
    boxtext.style.transition = '0.2s';

  var boxParentBackground = document.createElement('div');
    boxParentBackground.style.position = 'relative';
    boxParentBackground.style.overflow = 'hidden';
    
  

  var text = document.createElement('div');
      text.style.position = 'relative';
    text.className = 'zn-text';
    text.innerHTML = 'Double click pour editer ';
    text.style.fontSize = '20px';
    text.style.color = txtColor.value;
    text.style.padding = '10px';
    text.style.overflow = 'hidden';
    text.addEventListener('dblclick',function() {
      this.contentEditable = true;
    },true)

    
    boxtext.addEventListener('mouseout',function() {
      // text.contentEditable = false;
      this.style.border = "4px dotted  rgba(0, 0, 0, 0.001)";
    },true)

    boxtext.addEventListener('mouseover',function() {
      this.style.border = " 4px dotted  rgba(0, 0, 0, 0.719)";
    },true)
  

  boxParentBackground.appendChild(text);
  boxtext.appendChild(boxParentBackground);
  BoxContRetouche.appendChild(boxtext);

  drapdrop(boxtext);

  document.querySelector('.remove-bl-text').addEventListener('click',function() { // simple reset
    BoxContRetouche.removeChild(boxtext);
  },true)

  clearButton .addEventListener('click',function() {  //bouton reset all
    BoxContRetouche.removeChild(boxtext);
  },true)

  EleveRetouche.addEventListener('click',function() {  //bouton droit X remove
    BoxContRetouche.removeChild(boxtext);
  },true)

function reglageText(element){

    element.addEventListener('click',function() { 
    cib = this;
    BLtext.style.display = 'block'; 
    
    document.querySelector('.color-picker').addEventListener('change',function() { 
      cib.style.color = this.value;

    },true)
    
    txtPolice.addEventListener('change',function() { 
      txtPoliceValue.innerHTML = this.value +'pt';
      cib.style.fontSize = this.value +'px';

    },true)
    txtTransp.addEventListener('change',function() {
      txtTranspValue.innerHTML = this.value;
      cib.parentNode.style.opacity = (this.value)/10;
    },true)
    
   txtRotation.addEventListener('change',function() {
      txtRotationValue.innerHTML = this.value +'deg';
      cib.parentNode.parentNode.style.transform = 'rotate('+this.value+'deg)';
    },true)

    txtColor.addEventListener('change',function() { 
      cib.style.color = this.value;

    },true)



    txtBold.addEventListener('click',function() {
      cib.style.fontWeight = "bold";
    },true)
    txtItalic.addEventListener('click',function() {
      cib.style.fontStyle = "italic";
    },true)
    txtUnderline.addEventListener('click',function() {
      cib.style.textDecoration = "underline";
    },true)

    alignLeft.addEventListener('click',function() {
      cib.style.textAlign = "left";
    },true)
    alignCenter.addEventListener('click',function() {
      cib.style.textAlign = "center";
    },true)
    alignRight.addEventListener('click',function() {
      cib.style.textAlign = "right";
    },true)
    for(var i = 0; i < txtFont.length ;i++) { 
      txtFont[i].addEventListener('click',function() {
        cib.style.fontFamily = this.value;
      },true)
    }

    txtReset.addEventListener('click',function() { 
      
      cib.style.color = 'black';
      cib.parentNode.firstChild.style.opacity = '1';
      cib.style.fontSize = '20px';
      cib.parentNode.style.opacity = '1';
      cib.parentNode.parentNode.style.transform = 'rotate(0deg)';
      cib.style.fontWeight = "normal";
      cib.style.fontStyle = "normal";
      cib.style.textDecoration = "none";
      cib.style.textAlign = "left";
      cib.style.fontFamily = 'sans serif';
    },true)
    txtSup.addEventListener('click',function() { 
      cib.remove();
    },true)

    txtSave.addEventListener('click',function() { 
      text.contentEditable = false;

    },true)

    
      },true)
  }
  reglageText(text);

}


		// gere MARKER

		var iconesOutil = document.querySelectorAll('.ic');

		// var reglageIcone = document.querySelector('.reglage-icone-zn');
		
		var rgColor = document.querySelector('.marker-color');
		// var rgFond = document.querySelector('.ico-background');
		// var backgroundOff = document.querySelector('.background-off ');
		var rgTranspa = document.querySelector('.marker-range-transpa');
		var rgTranspaValue = document.querySelector('.marker-transp-value ');
		var rgTaille = document.querySelector('.marker-range-taille');
		var rgTailleValue = document.querySelector('.marker-taille-value ');
		var reglageIconeReset = document.querySelector('.marker-reglageReset ');
		var reglageIconeSup = document.querySelector('.marker-reglageSup ');
		var retourNone = document.querySelector('.d-none ');
		// var apercusIco = document.querySelector('.apercus-ico');
		
		for(var i = 0; i < iconesOutil.length ;i++) { 
			iconesOutil[i].addEventListener("click", function() {
				
				var znIcone = document.createElement('span');
            znIcone.innerHTML = this.innerHTML;
            znIcone.className = 'znIcone';
            znIcone.style.position = 'absolute';
            znIcone.style.top = '30px';
            znIcone.style.right = '30px';
            znIcone.style.width = '65px';
            znIcone.style.height = '65px';
            znIcone.style.lineHeight = '65px';
            znIcone.style.textAlign = 'center';
            znIcone.style.fontSize = '30px';
            znIcone.style.color = 'white';
            znIcone.style.cursor = 'move';
            znIcone.style.transition = '0.1s';

        var icoS = this.innerHTML;	
        
				BoxContRetouche.appendChild(znIcone);
        drapdrop(znIcone);

        document.querySelector('.remove-bl-marker').addEventListener('click',function() { 
          BoxContRetouche.removeChild(znIcone);
        },true)

        clearButton .addEventListener('click',function() {  //bouton reset all
          BoxContRetouche.removeChild(znIcone);
        },true)

        EleveRetouche.addEventListener('click',function() {  //bouton droit X remove
          BoxContRetouche.removeChild(znIcone);
        },true)
        
				
				var  IconeZN = document.querySelectorAll('.znIcone');
				var  ICONEzn = document.querySelectorAll('.znIcone');

						 
				function reglagemarker(element){

						element.addEventListener('click',function() {
								cible = this;
                BLmarker.style.display = "block";
                rgColor.value =  '#000000' ;
                // rgColor.value =  this.style.color;
									
								   rgColor.addEventListener('change',function() { 
										var couleur = rgColor.value;
										cible.style.color = couleur;
										
									},true)
									
							
									rgTaille.addEventListener('change',function() { 
										rgTailleValue.innerHTML = this.value ;
										cible.style.transform = "scale("+(0+(this.value)/10)+")";
									},true)
        
                  rgTranspa.addEventListener('change',function() { 
										rgTranspaValue.innerHTML  = this.value ;
										cible.style.opacity = (rgTranspa.value)/10;
				
                  },true)
                  
									reglageIconeReset.addEventListener('click',function() { 
										cible.style.color = 'white';
										cible.style.opacity = '1';
										cible.style.transform = "scale(1)";
                  },true)
                  
									reglageIconeSup.addEventListener('click',function() { 
										cible.remove();
									},true)
									
									
					   },true)
  
				}
				reglagemarker(znIcone);
				
			
			}, true);
		}
  




  
     



