
var showingSourceCode = false;
var isInEditMode = true;

function enableEditMode(){                                                 //rend l'iframe editable
    richeTextField.document.designMode = 'On';
}
function execCmd(command){                                                 //execute les boutons
    richeTextField.document.execCommand(command,false,null);
}
function execCmdWithArg(command,arg){                                      //execute les selects options
    richeTextField.document.execCommand(command,false,arg);
}

// function toggleSource(){
//     if(showingSourceCode){
//        richeTextField.document.getElementsByTagName('body')[0].innerHTML = richeTextField.document.getElementsByTagName('body')[0].textContent;
//        showingSourceCode = false;
//     }
//     else{
//        richeTextField.document.getElementsByTagName('body')[0].textContent =  richeTextField.document.getElementsByTagName('body')[0].innerHTML;
//        showingSourceCode = true;
//     }
//     var wyswingHTML = richeTextField.document.getElementsByTagName('body')[0].textContent;
//     var val =  document.querySelector('.textVal');
//     var wys = document.querySelector('.aff-wyswing');
//     socket.emit("envoiewys",wyswingHTML);
//     val.value = wyswingHTML;
//  }
var wys1 = document.querySelector('.aff-wyswing');
var wys1save2 = document.querySelector('.save2');
var wys2 = document.querySelector('.aff-wyswing2');
var exportWys = document.querySelector('.export-wyswing');
var imprimeWys = document.querySelector('.imprime-wyswing');
var ajoutwysliste = document.querySelector('.ajout-wys-liste');
var affwys = document.querySelector('.Bl-affwys');
function toggleSource(){
  if(showingSourceCode){
      richeTextField.document.getElementsByTagName('body')[0].innerHTML = richeTextField.document.getElementsByTagName('body')[0].textContent;
      showingSourceCode = false;
      wys1.innerHTML = 'Enregistrer';
      wys1.style.background = 'black';
      wys2.style.display = 'none';
      affwys.style.display = 'none';
      ajoutwysliste.style.display = 'none';
      exportWys.style.display = 'none';
      imprimeWys.style.display = 'none';
      
   }
   else{
      richeTextField.document.getElementsByTagName('body')[0].textContent =  richeTextField.document.getElementsByTagName('body')[0].innerHTML;
      showingSourceCode = true;
      wys2.style.display = 'block';
      wys1.innerHTML = 'Editer';
      wys1.style.background = 'red';
      affwys.style.display = 'block';
      exportWys.style.display = 'block';
      imprimeWys.style.display = 'block';
      ajoutwysliste.style.display = 'block';
      
      affwys.innerHTML = richeTextField.document.getElementsByTagName('body')[0].textContent;

      
   }
   
}

function envoieaff(){
    var wyswingHTML = richeTextField.document.getElementsByTagName('body')[0].textContent;
    socket.emit("envoiewys",wyswingHTML);
}

function toggleEdit(){
    if(isInEditMode){
        richeTextField.document.designMode = 'Off';
        isInEditMode = false;
    }else{
        richeTextField.document.designMode = 'On';
        isInEditMode = true;
    }
}

//  Bl-ADMIN wysiwing boutom commande
// var boutWys = document.querySelectorAll('.btw');
//     for(var bt = 0; bt < boutWys.length ;bt++) { 
//         boutWys[bt].addEventListener('click',function(){
//             console.log(boutWys.length);
//         },true)
//     }
    
// Bl-ADMIN wysiwing Export to world
function Export2Doc(element, filename = ''){ 
   var preHTML = " <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head> <meta charset='utf-8'><title>Export to doc</title></head><body> ";
   var postHtml = "</body></html>";
   var html = preHTML+document.getElementById(element).innerHTML+postHtml;

   var blob = new Blob (['\ufeff',html],{
       type:'application/msword'
   });
   // specifier link url
   var url = 'data:application/vnd.ms-word;charset=utf-8,'+ encodeURIComponent(html);
   // specifier nom du file
   filename = filename?filename+'.doc':'document.doc';
   // creer dowload link element  affWys
   var downloadLink = document.createElement('a');

   document.querySelector('.block-soket').appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        navigator.msSaveOrOpenBlob(blob,filename)
    }else{
        downloadLink.href = url; // creer link to file
        downloadLink.download = filename; // sitting  nom du file
        downloadLink.click();
    }
  document.querySelector('.block-soket').removeChild(downloadLink);
}


// Bl-Tableau affiche SOKET Export to world
function Export2DocSoket(element, filename = ''){ 
    var preHTML = " <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head> <meta charset='utf-8'><title>Export to doc</title></head><body> ";
    var postHtml = "</body></html>";
    var html = preHTML+exportdoc.parentNode.innerHTML+postHtml;
 
    var blob = new Blob (['\ufeff',html],{
        type:'application/msword'
    });
    // specifier link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,'+ encodeURIComponent(html);
    // specifier nom du file
    filename = filename?filename+'.doc':'document.doc';
    // creer dowload link element  affWys
    var downloadLink = document.createElement('a');
 
    document.querySelector('.block-soket').appendChild(downloadLink);
 
     if(navigator.msSaveOrOpenBlob){
         navigator.msSaveOrOpenBlob(blob,filename)
     }else{
         downloadLink.href = url; // creer link to file
         downloadLink.download = filename; // sitting  nom du file
         downloadLink.click();
     }
   document.querySelector('.block-soket').removeChild(downloadLink);
 }

// Bl-ADMIN wysiwing Imprime to world
    // function imprimer(divName) {
    //         var printContents = document.getElementById(divName).innerHTML;    
    //     var originalContents = document.body.innerHTML;      
    //     document.body.innerHTML = printContents;     
    //     window.print();     
    //     document.body.innerHTML = originalContents;
    //     }



//  GErE wysiwing Liste
// gere retour list wys open-wys-liste

var BlList = document.querySelector('.wysi-liste');
var lesListe = document.querySelector('.les-wysi');
var openwysliste = document.querySelector('.open-wys-liste');
var retWys = document.querySelector('.retour-wysi-liste');

    openwysliste.addEventListener('click',function() {
        BlList.style.display = "block" ; 
        BlList.style.animation = "slide-left 0.2s" ; 
    },true)
    retWys.addEventListener('click',function() {
        BlList.style.display = "none" ; 
    },true)


    fetch("http://localhost:4000/wysiwing")
    .then(data => {
        return data.json();
    })
    .then(json1 => {
        console.log(json1)
        json1.map(function(data){
            var boxlist = document.createElement('span');
            var boxinner = document.createElement('img');
                boxinner.src = data.image;
                boxinner.className = "boxinner";
                boxinner.addEventListener('click',function() {
                    fetch("http://localhost:4000/wysiwing/"+data._id).then(function(dat){
                        return dat.json()
                    }).then(function(json){
                         socket.emit("envoiewysiListe",json.wysiwing);
                    })
                },true)
                // boxinner.style.transform = "scale(0.2)";
            var modif = document.createElement('div');
                modif.innerHTML = '<i class="fa fa-pencil-square-o" ></i>';
                modif.className =' modif-wys-liste';
                modif.addEventListener('click',function() {
                   
                    affwys.style.display  = 'none';
                    wys2.style.display = 'none';
                    ajoutwysliste.style.display = 'none';
                    exportWys.style.display = 'none';
                   
                   fetch("http://localhost:4000/wysiwing/"+data._id).then(function(dat){
                       return dat.json()
                   }).then(function(json){
                      richeTextField.document.getElementsByTagName('body')[0].innerHTML=json.wysiwing;
                   })
               },true)
            boxlist.appendChild(boxinner);
            boxlist.appendChild(modif);
            lesListe.insertBefore(boxlist,lesListe.firstChild)
        })
   
     });
    // ajou liste dans bl liste
    ajoutwysliste.addEventListener('click',function() {
        BlList.style.display = "block" ; 
        BlList.style.animation = "slide-left 0.2s" ; 

        
        domtoimage.toPng(affwys).then(function(url){
            const data = new FormData();
            data.append('wysiwing',richeTextField.document.getElementsByTagName('body')[0].textContent)
            data.append('image',url)
            fetch('http://localhost:4000/wysiwing', {
                method: 'POST',
                body: data,
            }).then((response) => {
                response.json().then((body) => {
                    lesListe.innerHTML ='';
                fetch("http://localhost:4000/wysiwing")
                .then(data => {
                    return data.json();
                })
                .then(json1 => {
                    json1.map(function(data){
                        var boxlist = document.createElement('span');
                        var boxinner = document.createElement('img');
                            boxinner.src = data.image;
                            boxinner.className = "boxinner";
                            boxinner.addEventListener('click',function() {
                                fetch("http://localhost:4000/wysiwing/"+data._id).then(function(dat){
                                    return dat.json()
                                }).then(function(json){
                                     socket.emit("envoiewysiListe",json.wysiwing);
                                })
                            },true)
                            // boxinner.style.transform = "scale(0.2)";
                        var modif = document.createElement('div');
                            modif.innerHTML = '<i class="fa fa-pencil-square-o" ></i>';
                            modif.className =' modif-wys-liste';
                            modif.addEventListener('click',function() {
                              
                                affwys.style.display  = 'none';
                                wys2.style.display = 'none';
                                ajoutwysliste.style.display = 'none';
                                exportWys.style.display = 'none';
                               
                               fetch("http://localhost:4000/wysiwing/"+data._id).then(function(dat){
                                   return dat.json()
                               }).then(function(json){
                                  richeTextField.document.getElementsByTagName('body')[0].innerHTML=json.wysiwing;
                               })
                           },true)
                          
                         boxlist.appendChild(boxinner);
                         boxlist.appendChild(modif);
                         lesListe.insertBefore(boxlist,lesListe.firstChild);
                     
                     })
                 });
                });
        
        });
        }).catch(function(erreur){
            console.log(erreur);
        })
     
   
    },true)
   
    // Edite sur click apercus Modification liste wysiwing 
  