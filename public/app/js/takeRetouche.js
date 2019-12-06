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



function takeRetouche(){ 

  saveRetouche.addEventListener('click',function() { 
     takeretouche.style.display = 'block';
     boxTakeRetouche.innerHTML = " ";
      
   domtoimage.toPng(BoxContRetouche).then(function(dataUrl) {
        console.log(dataUrl)
        var aperc = document.createElement("img");
            aperc.src = dataUrl;
            aperc.style.width = "100%";
        boxTakeRetouche.innerHTML = " ";
        boxTakeRetouche.appendChild(aperc);

        // envoyer image
        document.querySelector(".envoyer-image").addEventListener('click',function() { 
            socket.emit("imageRetouché", dataUrl);
            console.log('lasa lasa')
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