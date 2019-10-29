

var  OutilPricipale = document.querySelectorAll('.out-pr'); 
var  OutilPr = document.querySelectorAll('.out-pr'); 
var  BLdetaile = document.querySelectorAll('.Bl-outil-detail');
var  zoneDeTravail = document.querySelector('.zone-de-travail');
var  BLzoneEditable = document.querySelector('.bl-zone-editable');
var  zoneEditable = document.querySelector('.zone-editable');
var  editimage = document.querySelector('.edit-image');


    // gere affichage Bl-outil-detail

    var tabOutil = [];
    for(var o = 0; o < OutilPricipale.length ;o++) { 
        tabOutil.push(OutilPricipale[o]);
    }
    tabOutil.map((call,index)=>{
    call.addEventListener('click',function() {
        ot = index;
        for(var b = 0; b <  OutilPr.length ;b++) { 
            OutilPr[b].style.color ='white';
            OutilPr[b].style.background =' rgb(34, 32, 32)';
        }
        
        this.style.background = 'white';
        this.style.color ='rgb(56, 1, 255)';

        for(var ob = 0; ob <  BLdetaile.length ;ob++) { 
            BLdetaile[ob].style.display = "none";
            BLdetaile[ot].style.display = "block";
        }

    },true)
    }) 


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
	


	// mettre Image drap end drop
	// var imgDrap = document.querySelector('.img-drap');
	//     imgDrap.addEventListener('mousedown',function() {
	// 		imgDrap.style.position ="absolute";
	// 		drapdrop(imgDrap);
	// 	},true)
	

	// Gere bl outil TEXT et Affichage reglage-text-zn

	var reglageTextZn = document.querySelector('.reglage-text-zn');
	var NoneTxt = document.querySelector('.d-none-txt');

	var txtSave = document.querySelector('.txt-save');
	var txtTailleValue = document.querySelector('.txt-taille-value');
	var txtTaille = document.querySelector('.txt-range-taille');
	var txtColor = document.querySelector('.txt-color');
	var txtBackground = document.querySelector('.txt-background');
	var txtBackgroundOff = document.querySelector('.txt-background-off');
	var txtFondTranspValue = document.querySelector('.txt-fond-transp-value');
	var txtFondTransp = document.querySelector('.txt-range-fond-transpa');
	var txtPoliceValue = document.querySelector('.txt-police-value');
	var txtPolice = document.querySelector('.txt-range-police');
	var txtTranspValue = document.querySelector('.txt-transp-value');
	var txtTransp = document.querySelector('.txt-range-transp');
	var txtPaddingValue = document.querySelector('.txt-padding-value');
	var txtPadding = document.querySelector('.txt-range-padding');
	var txtBorderRadiusValue = document.querySelector('.txt-border-radius-value');
	var txtBorderRadius = document.querySelector('.txt-range-border-radius');
	var txtRotationValue = document.querySelector('.txt-rotation-value');
	var txtRotation = document.querySelector('.txt-range-rotation');
    var txtReset = document.querySelector('.txt-reglageReset');
	var txtSup = document.querySelector('.txt-reglageSup');

	// reglage suplementaire
	var alignLeft = document.querySelector('.a-left'); 
	var alignCenter = document.querySelector('.a-center');
	var alignRight = document.querySelector('.a-right');
	var txtBold = document.querySelector('.t-bold');
	var txtItalic = document.querySelector('.t-italic');
	var txtUnderline = document.querySelector('.t-underline');
	var txtFont = document.querySelectorAll('.txt-ft');  // style du font
		

    function ajoutText(){
		reglageTextZn.style.display = 'block';
		NoneTxt.addEventListener('click',function() {
			reglageTextZn.style.display = 'none';
		},true)
		
		var boxtext = document.createElement('div');
			boxtext.className = 'zn-boxtext';
			boxtext.style.position = 'absolute';
			// boxtext.style.width= '200px';
			boxtext.style.top= '100px'
			boxtext.style.left= '25%'
			boxtext.style.padding = '10px';

		var boxParentBackground = document.createElement('div');
			boxParentBackground.style.position = 'relative';
			boxParentBackground.style.overflow = 'hidden';
			
		var boxBackground = document.createElement('div');
			boxBackground.style.position = 'absolute';
			boxBackground.style.top = '0px';
			boxBackground.style.width = '100%';
			boxBackground.style.height = '100%';

		var text = document.createElement('div');
		    text.style.position = 'relative';
			text.className = 'zn-text';
			text.innerHTML = 'Double click pour editer ';
			text.style.width= '200px';
			text.style.padding = '10px';
			text.style.overflow = 'hidden';
			text.addEventListener('dblclick',function() {
				this.contentEditable = true;
			},true)

			
            boxtext.addEventListener('mouseout',function() {
				// text.contentEditable = false;
				this.style.border = "none";
			},true)

			boxtext.addEventListener('mouseover',function() {
				this.style.border = " 4px dotted  rgba(0, 0, 0, 0.719)";
			},true)
		
		boxParentBackground.appendChild(boxBackground);	//prier enfant jour le background
		boxParentBackground.appendChild(text);
		boxtext.appendChild(boxParentBackground);
		zoneEditable.appendChild(boxtext);
		drapdrop(boxtext);

	function reglageText(element){

        element.addEventListener('click',function() { 
			reglageTextZn.style.display = 'block';
			cib = this;
			
			txtSave.addEventListener('click',function() { 
				cib.contentEditable = false;

			},true)
			
			txtTaille.addEventListener('change',function() {
				txtTailleValue.innerHTML =  this.value +'px';
				cib.style.width = this.value+'px';
			},true)
			txtColor.addEventListener('change',function() { 
				cib.style.color = this.value;

			},true)
			txtBackground.addEventListener('change',function() {
				cib.parentNode.firstChild.style.background = this.value;
			},true)
			
			txtFondTransp.addEventListener('change',function() {
				txtFondTranspValue.innerHTML = this.value;
				cib.parentNode.firstChild.style.opacity = (this.value)/10;
			},true)
			txtBackgroundOff.addEventListener('click',function() {
				cib.parentNode.firstChild.style.background = 'rgba(255, 255, 255, 0)';
			},true)
			txtPolice.addEventListener('change',function() { 
				txtPoliceValue.innerHTML = this.value +'pt';
				cib.style.fontSize = this.value +'px';

			},true)
			txtTransp.addEventListener('change',function() {
				txtTranspValue.innerHTML = this.value;
				cib.parentNode.style.opacity = (this.value)/10;
			},true)
			txtPadding.addEventListener('change',function() {
				txtPaddingValue.innerHTML = this.value +'px';
				cib.style.padding = this.value+'px';
			},true)
			txtBorderRadius.addEventListener('change',function() {
				txtBorderRadiusValue.innerHTML = this.value +'px';
				cib.parentNode.style.borderRadius = this.value+'px';
			},true)

			txtRotation.addEventListener('change',function() {
				txtRotationValue.innerHTML = this.value +'deg';
				cib.parentNode.parentNode.style.transform = 'rotate('+this.value+'deg)';
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
				cib.style.width = '200px';
				cib.style.color = 'black';
				cib.parentNode.firstChild.style.background = 'white';
				cib.parentNode.firstChild.style.opacity = '1';
				cib.style.fontSize = '20px';
				cib.parentNode.style.opacity = '1';
				cib.style.padding = '10px';
				cib.parentNode.style.borderRadius = '0px';
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
			

			
        },true)
    }
    reglageText(text);

	}


// gere BL filtre outil et affichage 


var brightness = 100;
var contrast = 100;
var saturate = 100;
var grayscale = 0;
var invert = 0;
var huerotate = 0;
var blur = 0;
var opacity = 100;
var sepia = 0;
var dropshadow = 0;

const imgture = document.getElementById("img");
const resetAll = document.getElementById("filtre-resetAll");

const slider1 = document.getElementById("slider1");
const value1 = document.getElementById("bright");
const slider2 = document.getElementById("slider2");
const value2 = document.getElementById("contrast");
const slider3 = document.getElementById("slider3");
const value3 = document.getElementById("saturate");
const slider4 = document.getElementById("slider4");
const value4 = document.getElementById("gray");
const slider5 = document.getElementById("slider5");
const value5 = document.getElementById("invert");
const slider6 = document.getElementById("slider6");
const value6 = document.getElementById("hue");
const slider7 = document.getElementById("slider7");
const value7 = document.getElementById("blur");
const slider8 = document.getElementById("slider8");
const value8 = document.getElementById("s-opacity");
const slider9 = document.getElementById("slider9");
const value9 = document.getElementById("sepia");

//Update filters
function updateFilters() {
	imgture.style.filter =
		"brightness(" +
		brightness +
		"%) contrast(" +
		contrast +
		"%) saturate(" +
		saturate +
		"%) grayscale(" +
		grayscale +
		"%) invert(" +
		invert +
		"%) hue-rotate(" +
		huerotate +
		"deg) blur(" +
		blur +
		"px) opacity(" +
		opacity +
		"%) sepia(" +
		sepia +
		"%)";
}
//Reset All
function resetALL(){
    brightness = 100;
	slider1.value = 100;
	value1.innerHTML = slider1.value + "%";
	contrast = 100;
	slider2.value = 100;
	value2.innerHTML = slider2.value + "%";
	saturate = 100;
	slider3.value = 100;
	value3.innerHTML = slider3.value + "%";
	grayscale = 0;
	slider4.value = 0;
	value4.innerHTML = slider4.value + "%";
	invert = 0;
	slider5.value = 0;
	value5.innerHTML = slider5.value + "%";
	huerotate = 0;
	slider6.value = 0;
	value6.innerHTML = slider6.value + "%";
	blur = 0;
	slider7.value = 0;
	value7.innerHTML = slider7.value + "px";
	opacity = 100;
	slider8.value = 0;
	value8.innerHTML = 100 - slider8.value + "%";
	sepia = 0;
	slider9.value = 0;
	value9.innerHTML = slider9.value + "%";
	updateFilters();
}
resetAll.addEventListener("click", function() {
	// console.log("resset");
    resetALL();
});

//Brightness slider
slider1.addEventListener("input", function() {
	value1.innerHTML = slider1.value + "%";
	brightness = slider1.value;
	updateFilters();
});

slider1.addEventListener("focus", function() {
	// console.log("focus gotten");
	value1.style.visibility = "visible";
});



//Contrast slider
slider2.addEventListener("input", function() {
	value2.innerHTML = slider2.value + "%";
	contrast = slider2.value;
	updateFilters();
});

slider2.addEventListener("focus", function() {
	value2.style.visibility = "visible";
});



//Saturation slider
slider3.addEventListener("input", function() {
	value3.innerHTML = slider3.value + "%";
	saturate = slider3.value;
	updateFilters();
});

slider3.addEventListener("focus", function() {
	value3.style.visibility = "visible";
});




//Grayscale slider
slider4.addEventListener("input", function() {
	value4.innerHTML = slider4.value + "%";
	grayscale = slider4.value;
	updateFilters();
});

slider4.addEventListener("focus", function() {
	value4.style.visibility = "visible";
});


//Invert slider
slider5.addEventListener("input", function() {
	value5.innerHTML = slider5.value + "%";
	invert = slider5.value;
	updateFilters();
});

slider5.addEventListener("focus", function() {
	value5.style.visibility = "visible";
});


//Hue-rotate slider
slider6.addEventListener("input", function() {
	value6.innerHTML = slider6.value + "%";
	huerotate = slider6.value;
	updateFilters();
});

slider6.addEventListener("focus", function() {
	value6.style.visibility = "visible";
});



//Blur slider
slider7.addEventListener("input", function() {
	value7.innerHTML = slider7.value + "px";
	blur = slider7.value;
	updateFilters();
});

slider7.addEventListener("focus", function() {
	value7.style.visibility = "visible";
});

//Opacity slider
slider8.addEventListener("input", function() {
    // console.log(100 - slider8.value);
    opacity = 100 - slider8.value;
    value8.innerHTML = (100- slider8.value) + "%";
	updateFilters();
});

slider8.addEventListener("focus", function() {
	value8.style.visibility = "visible";
});


//Sepia slider
slider9.addEventListener("input", function() {
	value9.innerHTML = slider9.value + "%";
	sepia = slider9.value;
	updateFilters();
});

slider9.addEventListener("focus", function() {
	value9.style.visibility = "visible";
});


   

 



	 //    gere affichage av box STICKER ET ICONES

	 var titreSTIKERS = document.querySelectorAll('.t-o-stk');
	 var boxSTIKERS = document.querySelectorAll('.av-box');
		var tabSTK = [];
		for(var i = 0; i < titreSTIKERS.length ;i++) { 
			tabSTK.push(titreSTIKERS[i]);
		}
		tabSTK.map((call,index)=>{
		call.addEventListener('click',function() {
			stk = index;
		
			for(var i = 0; i <  boxSTIKERS.length ;i++) { 
				boxSTIKERS[i].style.display ='none';
				boxSTIKERS[stk].style.display ='block';
			}
			
		

		},true)
		}) 
	
		
		
	 
		
		// gere BL Icones et affichage zone de travaille  reglageSup

		var iconesOutil = document.querySelectorAll('.ic');

		var reglageIcone = document.querySelector('.reglage-icone-zn');
		
		var rgColor = document.querySelector('.ico-color');
		var rgFond = document.querySelector('.ico-background');
		var backgroundOff = document.querySelector('.background-off ');
		var rgTranspa = document.querySelector('.range-transpa');
		var rgTranspaValue = document.querySelector('.ico-transp-value ');
		var rgTaille = document.querySelector('.range-taille');
		var rgTailleValue = document.querySelector('.ico-taille-value ');
		var reglageIconeReset = document.querySelector('.reglageReset ');
		var reglageIconeSup = document.querySelector('.reglageSup ');
		var retourNone = document.querySelector('.d-none ');
		var apercusIco = document.querySelector('.apercus-ico');
		
		for(var i = 0; i < iconesOutil.length ;i++) { 
			iconesOutil[i].addEventListener("click", function() {
				reglageIcone.style.display = "block";
				var znIcone = document.createElement('span');
					znIcone.innerHTML = this.innerHTML;
					znIcone.className = 'znIcone';
					znIcone.style.position = 'absolute';
					znIcone.style.top = '20px';
					znIcone.style.right = '20px';
					znIcone.style.width = '65px';
					znIcone.style.height = '65px';
					znIcone.style.lineHeight = '65px';
					znIcone.style.textAlign = 'center';
					znIcone.style.fontSize = '30px';
					znIcone.style.color = 'white';
					znIcone.style.background = 'red';
					znIcone.style.borderRadius = '50px';
					znIcone.style.transition = '0.1s';
                    // znIcone.onclick = reglage();
				var icoS = this.innerHTML;	
				zoneEditable.appendChild(znIcone);
				drapdrop(znIcone);

				// console.log(document.querySelectorAll('.znIcone').length);
				var  IconeZN = document.querySelectorAll('.znIcone');
				var  ICONEzn = document.querySelectorAll('.znIcone');
				// console.log(ICONEzn.length);

				
				retourNone.addEventListener('click',function() { 
					reglageIcone.style.display = "none";
				},true)
						 
				function reglageIco(element){
						//    var isICO = false;
						   element.addEventListener('click',function() {
								// isICO = true;
								cible = this;
								reglageIcone.style.display = "block";
								apercusIco.style.display = "block";
								apercusIco.innerHTML =  icoS;
								   
									
								   rgColor.addEventListener('change',function() { 
										var couleur = rgColor.value;
										cible.style.color = couleur;
										
									},true)
									
									rgFond.addEventListener('change',function() { 
										cible.style.backgroundColor = this.value;
									},true)
									backgroundOff.addEventListener('click',function() { 
										cible.style.backgroundColor = 'rgb(255, 255, 255,0)';
									},true)
									rgTranspa.addEventListener('change',function() { 
										rgTranspaValue.innerHTML  = this.value ;
										cible.style.opacity = (rgTranspa.value)/10;
				
									},true)
									rgTaille.addEventListener('change',function() { 
										rgTailleValue.innerHTML = this.value ;
										cible.style.transform = "scale("+(0+(this.value)/10)+")";
									},true)
				
									reglageIconeReset.addEventListener('click',function() { 
										cible.style.color = 'white';
										cible.style.backgroundColor = 'red';
										cible.style.opacity = '1';
										cible.style.transform = "scale(1)";
									},true)
									reglageIconeSup.addEventListener('click',function() { 
										cible.remove();
									},true)
									
									
					       },true)
  
				}
				reglageIco(znIcone);
				
			
			}, true);
		}
	

		// gere BL Sticker 
	 
		var stikers = document.querySelectorAll('.stk');
		var reglageStikers = document.querySelector('.reglage-sticker-zn');
		var retourNoneStk = document.querySelector('.d-none-stk');
		var apercusStk = document.querySelector('.apercus-stk');
		var fondStkOff = document.querySelector('.stk-background-off');
		var transpaStk = document.querySelector('.stk-range-transpa');
		var transpaStkValue = document.querySelector('.stk-transp-value');
		var tailleStk = document.querySelector('.stk-range-taille');
		var tailleStkValue = document.querySelector('.stk-taille-value');
		var rotationStk = document.querySelector('.stk-range-rotation');
		var rotationStkValue = document.querySelector('.stk-rotation-value');
		var resetStk = document.querySelector('.stk-reglageReset');
		var supStk = document.querySelector('.stk-reglageSup');
		
		for(var i = 0; i < stikers.length ;i++) { 
			stikers[i].addEventListener("click", function() {
				reglageStikers.style.display = "block";
				var znstiker = document.createElement('span');
					znstiker.style.position = 'absolute';
					znstiker.className = 'znstiker';
					znstiker.style.top = '100px';
					znstiker.style.right = '20px';
					znstiker.style.width = '100px';
					znstiker.style.transition = '0.1s';
				var znStkImg = document.createElement('img');
					znStkImg.src = this.src;
					znStkImg.style.width = '100%';
				var srcStk = this.src;	

				znstiker.appendChild(znStkImg);	
				zoneEditable.appendChild(znstiker);
				drapdrop(znstiker);

				retourNoneStk.addEventListener('click',function() { 
					reglageStikers.style.display = "none";
				},true)
				function reglageSticker(element){

					element.addEventListener('click',function() { 
									reglageStikers.style.display = "block";	
									cib = this;
									apercusStk.src = srcStk;  // apercu stk

									
									transpaStk.addEventListener('change',function() { 
										transpaStkValue.innerHTML  = this.value ;
										cib.style.opacity = (this.value)/10;
				
									},true)
									tailleStk.addEventListener('change',function() { 
										tailleStkValue.innerHTML = this.value ;
										cib.style.width = ((this.value)*10)+"px" ;
									},false)

									rotationStk.addEventListener('change',function() { 
										rotationStkValue.innerHTML = this.value ;
										cib.style.transform = "rotate("+this.value+"deg)";
									},false)

									resetStk.addEventListener('click',function() { 
										cib.style.opacity = '1';
										cib.style.transform = "scale(1)";
										cib.style.width = "100px" ;
										cib.style.transform = "rotate(0deg)";
									},true)

									supStk.addEventListener('click',function() { 
										cib.remove();
									},true)

									
					},true)
				}
				reglageSticker(znstiker);
			}, true);
		}

		// OPEN 
		var open = document.querySelector('.file-open');
		open.addEventListener('change',function(e) { 
			e.preventDefault();
			const data = new FormData();
                  
                    data.append("image",open.files[0])
                    fetch('http://localhost:4000/retouche', {
                        method: 'POST',
                        body: data,
                    }).then(function(response){
						return response.json()
					}).then(function(params) {
						
						let imgZN=document.createElement("img");
						var image=document.querySelector(".img-drap");
						// imgZN.src = ""
						// var tab=[]
						// for(var i = 0; i < image.length ;i++) {
							// image[i].src = ""
							image.remove();
					
						// }
						imgZN.src = "";
						imgZN.src ="retouche/0.jpg";
						imgZN.setAttribute("id","img");
						imgZN.setAttribute("class","img-drap");	
						editimage.innerHTML = "";			
						editimage.appendChild( imgZN);
						console.log(image)
					
						
					})
				
		},true)

		// SAVE IMAGE APERCUS ET DOWNLOAD 

		var SaveImage = document.querySelector('.im-save');
		var ZNimageSorti = document.querySelector('.image-sorti');
		var ApercusZN = document.querySelector('.apercus-zn');
		var ApImg = document.querySelector('.ap-img');
		var saveImgPNG = document.querySelector('.save-img-png');
		var saveImgJPEG = document.querySelector('.save-img-jpeg');
		var apercuImgNone = document.querySelector('.apercu-img-none');
		var gallerieBouton = document.querySelector('.save-img-gallery');
		var contenaireGallerie = document.querySelector('.contenaire-gallerie');
		var BLgallerie = document.querySelector('.gallerie');

		SaveImage.addEventListener('click',function() { 
			ZNimageSorti.style.display = 'block';
			apercuImgNone.addEventListener('click',function() { 
			    ZNimageSorti.style.display = 'none';	 
			},true)

			saveImgPNG.addEventListener('click',function() { 
			    domtoimage.toBlob(zoneEditable).then(function (blob) {
					window.saveAs(blob, 'my-img.png');
					 });	 
			},true)
			
			saveImgJPEG.addEventListener('click',function() { 
			    domtoimage.toBlob(zoneEditable).then(function (blob) {
					window.saveAs(blob, 'my-img.jpg');
					 });	 
			},true)
			
			
			domtoimage.toPng(zoneEditable).then(function(dataUrl) {
			// console.log(dataUrl);
			var imgZN = new Image();
			imgZN.src = dataUrl;
			ApImg.src = dataUrl;
			})
			.catch(function(error) {
			console.error('oops, something went wrong!', error);
			});

			gallerieBouton.addEventListener('click',function() {
				
			    domtoimage.toPng(zoneEditable).then(function(dataUrl) {
					const data = new FormData()
					data.append("image",dataUrl)
				    fetch('http://localhost:4000/gallerie', {
						method: 'POST',
						body: data,
					}).then((response) => {
						response.json().then((body) => {
							contenaireGallerie.innerHTML ="";
							fetch('http://localhost:4000/gallerie').then(function(reponse){
								return reponse.json()
								}).then(function(photo){
									photo.map(function(gal){
										var boxImgRetouche = document.createElement('div');
											
										var retoucheImg = document.createElement('img');
											retoucheImg.src = gal.image;
											retoucheImg.addEventListener('click',function() { 
												socket.emit("envoieGallerie",this.src); 
											},true)

										boxImgRetouche.appendChild(retoucheImg);
										contenaireGallerie.insertBefore(boxImgRetouche,contenaireGallerie.firstChild) ;;

                                })
								})	
						})
							  
						})
					})
					BLgallerie.style.transform = "translateX(0%)";
					BLgallerie.style.zIndex = "4";
			    },true)
		    
			
		},true)

		                 fetch('http://localhost:4000/gallerie').then(function(reponse){
								return reponse.json()
								}).then(function(photo){
									photo.map(function(gal){
										var boxImgRetouche = document.createElement('div');
											
										var retoucheImg = document.createElement('img');
											retoucheImg.src = gal.image;
											retoucheImg.addEventListener('click',function() { 
												socket.emit("envoieGallerie",this.src); 
											},true)

										boxImgRetouche.appendChild(retoucheImg);
										contenaireGallerie.insertBefore(boxImgRetouche,contenaireGallerie.firstChild) ;

                                })
								})
		// ZOOM PRINCIPALE

        var zoomPrincipale = document.querySelector('.zoom-principale');
		zoomPrincipale.addEventListener('change',function() { 
			BLzoneEditable.style.width = this.value +"%";
			BLzoneEditable.style.left = (100-(this.value))/2 +"%";
		},false)

		// zoomPrincipale.addEventListener('change',function() { 
		// 	BLzoneEditable.style.transform =  "scale("+(0+(this.value)/10)+")";
		// 	BLzoneEditable.style.top =  "scale("+(0+(this.value)/10)+")";
		// },false)
