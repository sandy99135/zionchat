

 var socket=io.connect();	
        var message = document.getElementById("txt-message"),
            color = document.getElementById("color"),
            font = document.getElementById("font"),
            opacity = document.getElementById("opacity"),
            police = document.getElementById("police");
        var show = document.querySelectorAll(".show")[0] ;
		var messages = document.querySelector(".block-soket");
        var send = document.getElementById("send");
        var chart = document.getElementById("chart");
        var emoji  = document.querySelectorAll(".emo");
        
        var sendLineJ = document.querySelector("#sendLine-J"),
            sendLineM = document.querySelector("#sendLine-M"),
            sendLineA = document.querySelector("#sendLine-A");
        var LineJour = document.querySelectorAll("#LJ"),
            LineSemaine = document.querySelectorAll("#LM"),
            LineAnnee = document.querySelectorAll("#LA");

        var sendareaJ = document.querySelector("#sendarea-J"),
            sendpieJ = document.querySelector("#sendpie-J"),
            sendhistoJ = document.querySelector("#sendhisto-J");

        var sendimage = document.querySelector(".envoyer-image"),
            sendvideo = document.querySelector(".envoyer-video");
        var lienimage = document.querySelector(".lien-image"),
            lienvideo = document.querySelector(".lien-video");

        var sendbrowser = document.querySelector(".envoyer-browser"),
            lienbrowser = document.querySelector(".lien-browser");
          

		message.addEventListener('change',function(e) {
            message.value=e.target.value;
        },false)
        

		

      // gere emoji
        var lien;
        for(var ji = 0; ji < emoji.length ;ji++) { 
            emoji[ji].addEventListener('click',function() {
                lien = this.src;
                console.log(lien);
                socket.emit("envoiemoji",lien)
                
             },true)
         }       
         socket.on("emoji",function(data) {
            var emoj = document.createElement('div');
                emoj.className ='image show';
            var emo = document.createElement('img');
                emo.src = data ;
                emo.style.animation = " slide 0.2s ";
                emo.style.width = "100px";
                emo.style.animation = " slide 0.2s ";
                emoj.appendChild(emo);
                show.insertBefore(emoj,show.firstChild) ;
          })  

       // gere texte


       send.addEventListener('click',function(e) {
        e.preventDefault() 
          socket.emit("envoitext",message.value)
          message.value =" "
          socket.emit("envoicolor",color.value)
          socket.emit("envoifont",font.value)
          socket.emit("envoiopacity",opacity.value)
          socket.emit("envoipolice",police.value)
          console.log(opacity.value);
         },true)

		socket.on("text",function(data) {
             var msg = document.createElement('div');
                msg.className ='socketaff show';
                msg.innerHTML+=` ${data.message} `;

                socket.on("color",function(data1) {
                    var ms = document.querySelectorAll('.socketaff');
                    for(var m = 0; m < ms.length ;m++) { 
                     ms[0].style.color = `${data1.color}` ;
                    }
                  })
                socket.on("font",function(data2) {
                    var msfont = document.querySelectorAll('.socketaff');
                    for(var m = 0; m < msfont.length ;m++) { 
                     msfont[0].style.fontFamily = `${data2.font}` ;
                    }
                  })
                socket.on("opacity",function(data3) {
                    var msopacity = document.querySelectorAll('.socketaff');
                    for(var m = 0; m < msopacity.length ;m++) { 
                        msopacity[0].style.background= "rgba(254, 254,254,"+`${(data3.opacity)*0.1}` +")" ;
                    }
                  })
                socket.on("police",function(data4) {
                    var mspolice = document.querySelectorAll('.socketaff');
                    for(var m = 0; m < mspolice.length ;m++) { 
                        mspolice[0].style.fontSize = `${data4.police}px` ;
                    }
                  })
                
                msg.style.animation = " slide 0.2s ";
                show.insertBefore(msg,show.firstChild) ;
         
      })

        // gere WYSIWING affiche ifframe editable
        // gere WYSIWING soket affichage (sans liste)
        socket.on("wysHTML",function(data) {
            var affWys = document.createElement('div');
                affWys.className = 'affWys show';
                affWys.id = 'exportContent';
                affWys.innerHTML = ''+data+'';
                affWys.style.background = 'rgba(255, 255, 255, 0.95)';
                affWys.style.animation = " slide 0.2s ";

            var exportdoc = document.createElement('button');  
                exportdoc.innerHTML = '<i class="fa fa-download" ></i>';
                exportdoc.className = 'exportdoc'
                exportdoc.addEventListener('click',function() {
                       // function 
                        var preHTML = " <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head> <meta charset='utf-8'><title>Export to doc</title></head><body> ";
                        var postHtml = "</body></html>";
                        var html = preHTML+this.parentNode.innerHTML+postHtml;
                     
                        var blob = new Blob (['\ufeff',html],{
                            type:'application/msword'
                        });
                        // specifier link url
                        var url = 'data:application/vnd.ms-word;charset=utf-8,'+ encodeURIComponent(html);
                        // specifier nom du file
                        filename = ''
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
                  
                  },true)
                  // impression soket (editeur)
                  var impressionWys = document.createElement('button');
                      impressionWys.innerHTML = '<i class="fa fa-print" ></i>';
                      impressionWys.className = 'impression-Wys'; 

                      
                    impressionWys.addEventListener('click',function() {
                        // var printContents = document.getElementById('exportContent').innerHTML;   
                        // var originalContents = document.body.innerHTML;      
                        //     document.body.innerHTML = printContents;     
                        //     window.print();     
                        //     document.body.innerHTML = originalContents;
                        window.print();
                    },true)
                
                affWys.insertBefore(exportdoc,affWys.firstChild);
                affWys.insertBefore(impressionWys,affWys.firstChild);
                show.insertBefore(affWys,show.firstChild) ;
          })


         // gere WYSIWING affiche LISTE sur clique (soket emite dans wysiwing.js)
                socket.on("wysHTMLliste",function(data) {
                    var affWys2 = document.createElement('div');
                        affWys2.className = 'affWys2 show';
                        affWys2.id = 'exportContent2';
                        affWys2.innerHTML = ''+data+'';
                        affWys2.style.background = 'rgba(255, 255, 255, 0.95)';
                        affWys2.style.animation = " slide 0.2s ";

            var exportdoc2 = document.createElement('button');  
                exportdoc2.innerHTML = '<i class="fa fa-download" ></i>';
                exportdoc2.className = 'exportdoc2'
                exportdoc2.addEventListener('click',function() {
                    // function Export2DocSoket(element, filename = ''){ 
                        var preHTML = " <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head> <meta charset='utf-8'><title>Export to doc</title></head><body> ";
                        var postHtml = "</body></html>";
                        var html = preHTML+this.parentNode.innerHTML+postHtml;
                     
                        var blob = new Blob (['\ufeff',html],{
                            type:'application/msword'
                        });
                        // specifier link url
                        var url = 'data:application/vnd.ms-word;charset=utf-8,'+ encodeURIComponent(html);
                        // specifier nom du file
                        filename = ''
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
                    //  }
                    //  Export2DocSoket();
                  },true)
                 
                     affWys2.insertBefore(exportdoc2,affWys2.firstChild);
                     show.insertBefore(affWys2,show.firstChild) 
                })


         // gere image

        sendimage.addEventListener('click',function(e) {
            e.preventDefault() 
            socket.emit("envoieimage",lienimage.value)
          },true)
          socket.on("image",function(data) {
            var image = document.createElement('img');
                image.className ='image2 show';
                image.src= ` ${data.lienimage} `;
                image.style.animation = " slide 0.2s ";
                image.style.width = "100%";
                show.insertBefore(image,show.firstChild) ;
          })
          // gerer base de donné upload  image 
            var upImage = document.querySelector("#up-image");
            var apercus = document.querySelector(".apercus-image");
            var upload = document.querySelector("#im");
            // console.log(upImage.files);


            fetch("http://localhost:4000/photo")
                .then(data => {
                return data.json();
                })
                .then(json1 => {

                console.log(json1)
                json1.map(data => {
                    let img = document.createElement("img");
                        img.id ='upimg';
                        // img.style.opacity ='0.2';
                    img.src= "http://localhost:4000/public/"+data.image;
                    img.src= "http://localhost:4000/public/"+data.image;
                    img.addEventListener('click',function() {
                        var lienimg = this.src;
                        socket.emit("envoieimageup",lienimg)
                      },true)

                    apercus.insertBefore(img,apercus.firstChild);
                    
                });
                
                });
                upload.addEventListener("click", (e) => {
                    e.preventDefault();
                  
                    const data = new FormData();
                    let img = document.createElement("img");
                        img.id ='upimg';
                        img.addEventListener('click',function() {
                            socket.emit("envoieimageup",lienimg)
                          },true)
                    data.append("image",upImage.files[0])
                    fetch('http://localhost:4000/upload', {
                        method: 'POST',
                        body: data,
                    }).then((response) => {
                        response.json().then((body) => {
                        fetch("http://localhost:4000/photo")
                        .then(data => {
                            return data.json();
                        })
                        .then(json1 => {
                    
                            console.log(json1)
                            apercus.innerHTML=""
                            json1.map(data => {
                            let img = document.createElement("img");
                                img.id ='upimg';
                                img.src= "http://localhost:4000/public/"+data.image;
                                img.addEventListener('click',function() {
                                    var lienimg = this.src;
                                    socket.emit("envoieimageup",lienimg)
                                  },true)
            
                                apercus.insertBefore(img,apercus.firstChild);
                            });
                            
                        });
                        });
                
                });
            },false);
      
         // gere upload image affichage  soket
          socket.on("imageup",function(data) {
                var imgUP = document.createElement('div');
                    imgUP.className ='imageup show';
                var im = document.createElement('img');
                    im.className ='imgup show';
                    im.src = data;
                    im.style.animation = " slide 0.2s ";
                    im.style.width = "100p%";
                    im.style.animation = " slide 0.2s ";
                    imgUP.appendChild(im);
                    show.insertBefore(imgUP,show.firstChild) ;
            })

        // gere video

            sendvideo.addEventListener('click',function(e) {
                e.preventDefault() 
                socket.emit("envoievideo",lienvideo.value)
              },true)
        
            socket.on("video",function(data) {
                var video = document.createElement('div');
                    video.className ='video2 show';
                    video.innerHTML = ` <iframe src="${data.lienvideo}" frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                    video.style.animation = " slide 0.2s ";
                    video.style.width = "100%";
                    video.style.height = "400px";
                    // video.style.background = "rgba(245,245,245,0.4)" ;
                    show.insertBefore(video,show.firstChild) ;
              })

              // gerer base de donné upload  video
            var upVideo = document.querySelector("#up-video");
            var apercusvd = document.querySelector(".apercus-video");
            var uploadvd = document.querySelector("#vid");
            // console.log(upVideo.files);


            fetch("http://localhost:4000/video")
                .then(data => {
                return data.json();
                })
                .then(json1 => {

                console.log(json1)
                json1.map(data => {
                    let vd = document.createElement("video");
                        vd.id ='upvid';
                    vd.src= "http://localhost:4000/public/"+data.video;
                    vd.addEventListener('click',function() {
                        var lienvd = this.src;
                        socket.emit("envoievideoup",lienvd)
                      },true)
                      
                    apercusvd.insertBefore(vd,apercusvd.firstChild);
                    
                });
                
                });
                uploadvd.addEventListener("click", (e) => {
                    e.preventDefault();
                  
                    const data = new FormData();
                    let vd = document.createElement("video");
                        vd.id ='upvid';
                        vd.addEventListener('click',function() {
                            socket.emit("envoievideoup",lienvd)
                          },true)
                    data.append("video",upVideo.files[0])
                    fetch('http://localhost:4000/uploadvideo', {
                        method: 'POST',
                        body: data,
                    }).then((response) => {
                        response.json().then((body) => {
                        fetch("http://localhost:4000/video")
                        .then(data => {
                            return data.json();
                        })
                        .then(json1 => {
                    
                            console.log(json1)
                            apercusvd.innerHTML=""
                            json1.map(data => {
                            let vd = document.createElement("video");
                                vd.id ='upvid';
                                vd.src= "http://localhost:4000/public/"+data.video;
                                vd.addEventListener('click',function() {
                                    var lienvd = this.src;
                                    socket.emit("envoievideoup",lienvd)
                                  },true)
            
                                  apercusvd.insertBefore(vd,apercusvd.firstChild);
                            
                            });
                            
                        });
                        });
                
                });
            },false);
         
        socket.on("videoup",function(data) {
            var videoUP = document.createElement('div');
                videoUP.className ='videoup show';
                videoUP.innerHTML = ` <iframe src="${data}" frameborder="0" allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                videoUP.style.animation = " slide 0.2s ";
                videoUP.style.width = "100%";
                videoUP.style.height = "400px";
                show.insertBefore(videoUP,show.firstChild) ;
                console.log(data);
          })

            // gerer base de donné upload  fichier

            // var upFichier = document.querySelector("#up-fichier");
            // var apercusfl = document.querySelector(".apercus-fichier");
            // var namefl = document.querySelector("#name");
            // var uploadfl = document.querySelector("#fl");
            // console.log(upFichier.files);


            // fetch("http://localhost:4000/video")
            //     .then(data => {
            //     return data.json();
            //     })
            //     .then(json1 => {

            //     console.log(json1)
            //     json1.map(data => {
            //         let fl = document.createElement("div");
            //             fl.id ='upfl';
            //             fl.innerHTML = upFichier.files[0].name;
            //         var route = "http://localhost:4000/public/"+data.fichier;
                    
            //         apercusfl.appendChild(fl);
                    
            //     });
                
            //  });
                // uploadfl.addEventListener("click", (e) => {
                //     e.preventDefault();
                
                //     const data = new FormData();
                //        namefl.value = upFichier.files[0].name; 
                    // let fl = document.createElement("div");
                    //     fl.id ='upfl';
                    //     fl.innerHTML = upFichier.files[0].name;
                    //     console.log(upFichier.files[0].name);
                    // data.append("fichier",upFichier.files[0])
                    // fetch('http://localhost:4000/uploadfichier', {
                    //     method: 'POST',
                    //     body: data,
                    // }).then((response) => {
                    //     response.json().then((body) => {
                    //     fetch("http://localhost:4000/fichier")
                    //     .then(data => {
                    //         return data.json();
                    //     })
                    //     .then(json1 => {
                    
                    //         console.log(json1)
                    //         apercusfl.innerHTML=""
                    //         json1.map(data => {
                    //             namefl.value = upFichier.files[0].name;
                            // let fl = document.createElement("div");
                            //     fl.id ='upfl';
                            //     fl.innerHTML = upFichier.files[0].name;
                            //     var route = "http://localhost:4000/public/"+data.fichier;
                            //     apercusfl.appendChild(fl)
                            
                            // });
                            
            //             });
            //             });
                
            //     });
            // },false);

        // gere browser
            sendbrowser.addEventListener('click',function(e) {
               e.preventDefault() 
               socket.emit("envoiebrowser",lienbrowser.value)
            },true)
            socket.on("browser",function(data) {
                var video = document.createElement('div');
                    video.className ='browser2 show';
                    video.innerHTML = ` <iframe src="${data.lienbrowser}"  class="web" width = "100%" height="100%" allowfullscreen></iframe>`;
                    video.style.animation = " slide 0.2s ";
                    video.style.width = "100%";
                    video.style.height = "800px";
                    video.style.background = "rgba(245,245,245,0.4)" ;
                    show.insertBefore(video,show.firstChild) ;
              })  
              
              
     // gere chart 
      // gere chart Line Jour
        sendLineJ.addEventListener('click',function(e) {
            e.preventDefault() 
            var tab =[];
            for(var lj = 0; lj < LineJour.length ;lj++) { 
                tab.push(parseInt(LineJour[lj].value ))
            }
            socket.emit("envoiechartLJ",tab)
        },true)
    
      socket.on("chartLJ",function(data) {
            //  chart canvas
            var chartA = document.createElement('div');
                chartA.className ='chart show';
                chartA.style.animation = " slide 0.2s ";

            var chartAh2  = document.createElement('h2');
                chartAh2.innerHTML+="Jours";
                chartA.appendChild(chartAh2);
            
            //   canvas
            var canvas  = document.createElement('canvas');
                canvas.className ='canvas';
                canvas.width = 600;
                canvas.height = 410;
                
                let xGrid = 10;
                let yGrid = 10;
                let cellsize = 100; 
                let ctx = canvas.getContext('2d');
                
                let dataCanvas = {
                    Lu:data[0],
                    Ma:data[1],
                    Me:data[2],
                    Je:data[3],
                    Ve:data[4],
                    Sa:data[5],
                    Di:data[6]
                } 
                const entries = Object.entries(dataCanvas);
                function drawGrid(){
                ctx.beginPath();
                
                while(xGrid<canvas.height){
                    ctx.moveTo(0,xGrid);
                    ctx.lineTo(canvas.width,xGrid);
                    xGrid +=cellsize;
                }
                while(yGrid<canvas.width){
                    ctx.moveTo(yGrid,0);
                    ctx.lineTo(yGrid,canvas.height);
                    yGrid +=cellsize;
                }
                
                ctx.strokeStyle = "rgb(221, 221, 221,0.05)";    
                ctx.stroke();
                }
                function blocks(count){
                return count*10;
                }
                function drawAxis(){
                let yPlot = 40;
                let pop = 0;
                    ctx.beginPath();
                    ctx.strokeStyle = "white";
                    ctx.lineTo(blocks(5),blocks(40));
                    ctx.lineTo(blocks(60),blocks(40)); //Barre line Jour 
                
                    ctx.moveTo(blocks(5),blocks(40));
                
                for(let i= 1 ; i<=6 ; i++ ){
                ctx.strokeText(pop,blocks(2),blocks(yPlot));
                yPlot -= 5;
                pop += 500;                  //Echelle
                }
                ctx.stroke();
                }
                
                function drawChart(){              // trace du courbe
                ctx.beginPath();
                ctx.strokeStyle = "rgb(33, 150, 243)";
                ctx.moveTo(blocks(5),blocks(40));
                
                var xPlot = 10;
                
                for(const[jour,benefice] of entries){
                    var beneficeInBlocks = benefice/100;
                    ctx.strokeText(jour,blocks(xPlot),blocks(40-beneficeInBlocks-2));  //Affiche les noms du jour dans chart , -2 pour decaler l'ecriture
                    ctx.lineTo(blocks(xPlot),blocks(40-beneficeInBlocks));
                    ctx.arc(blocks(xPlot),blocks(40-beneficeInBlocks),4,0,Math.PI*2,true);
                    xPlot += 8;              // largeur de chaque jour dans chart
                }
                ctx.stroke();
                }
                drawGrid();
                drawAxis()
                drawChart()
                
            chartA.appendChild(canvas);
            show.insertBefore(chartA,show.firstChild);
           })

        // gere chart Line MOIS
        sendLineM.addEventListener('click',function(e) {
            e.preventDefault() 
            var tabM =[];
            for(var lm = 0; lm <  LineSemaine.length ;lm++) { 
                tabM.push(parseInt( LineSemaine[lm].value ))
            }
            socket.emit("envoiechartLM",tabM)
        },true)
    
      socket.on("chartLM",function(data) {
            var chartA = document.createElement('div');
                chartA.className ='chart show';
                chartA.style.animation = " slide 0.2s ";

            var chartAh2  = document.createElement('h2');
                chartAh2.innerHTML+="Résultat du mois";
                chartA.appendChild(chartAh2);
            
            //   canvas
            var canvas  = document.createElement('canvas');
                canvas.className ='canvas';
                canvas.width = 600;
                canvas.height = 410;
                
                let xGrid = 10;
                let yGrid = 10;
                let cellsize = 100; 
                let ctx = canvas.getContext('2d');
                
                let dataCanvas = {
                    Semaine1:data[0],
                    Semaine2:data[1],
                    Semaine3:data[2],
                    Semaine4:data[3],
                    Semaine5:data[5]
                } 
                const entries = Object.entries(dataCanvas);
                function drawGrid(){
                ctx.beginPath();
                
                while(xGrid<canvas.height){
                    ctx.moveTo(0,xGrid);
                    ctx.lineTo(canvas.width,xGrid);
                    xGrid +=cellsize;
                }
                while(yGrid<canvas.width){
                    ctx.moveTo(yGrid,0);
                    ctx.lineTo(yGrid,canvas.height);
                    yGrid +=cellsize;
                }
                
                ctx.strokeStyle = "rgb(221, 221, 221,0.05)";    
                ctx.stroke();
                }
                function blocks(count){
                return count*10;
                }
                function drawAxis(){
                let yPlot = 40;
                let pop = 0;
                    ctx.beginPath();
                    ctx.strokeStyle = "white";
                    ctx.lineTo(blocks(5),blocks(40));
                    ctx.lineTo(blocks(60),blocks(40)); //Barre line Jour 
                
                    ctx.moveTo(blocks(5),blocks(40));
                
                for(let i= 1 ; i<=6 ; i++ ){
                ctx.strokeText(pop,blocks(2),blocks(yPlot));
                yPlot -= 5;
                pop += 500;                  //Echelle
                }
                ctx.stroke();
                }
                
                function drawChart(){              // trace du courbe
                ctx.beginPath();
                ctx.strokeStyle = "rgb(33, 150, 243)";
                ctx.moveTo(blocks(5),blocks(40));
                
                var xPlot = 10;
                
                for(const[jour,benefice] of entries){
                    var beneficeInBlocks = benefice/100;
                    ctx.strokeText(jour,blocks(xPlot),blocks(40-beneficeInBlocks-2));  //Affiche les noms du jour dans chart , -2 pour decaler l'ecriture
                    ctx.lineTo(blocks(xPlot),blocks(40-beneficeInBlocks));
                    ctx.arc(blocks(xPlot),blocks(40-beneficeInBlocks),4,0,Math.PI*2,true);
                    xPlot += 10;              // largeur de chaque jour dans chart
                }
                ctx.stroke();
                }
                drawGrid();
                drawAxis()
                drawChart()
                
            chartA.appendChild(canvas);
            show.insertBefore(chartA,show.firstChild);
           })

        // gere chart Line de l'année
        sendLineA.addEventListener('click',function(e) {
            e.preventDefault() 
            var tabA =[];
            for(var la = 0; la < LineAnnee.length ;la++) { 
                tabA.push(parseInt( LineAnnee[la].value ))
            }
            socket.emit("envoiechartLA",tabA)
        },true)
    
      socket.on("chartLA",function(data) {
         
            var chartA = document.createElement('div');
                chartA.className ='chart show';
                chartA.style.animation = " slide 0.2s ";

            var chartAh2  = document.createElement('h2');
                chartAh2.innerHTML+="Rapport de l'année";
                chartA.appendChild(chartAh2);
            
            //   canvas
            var canvas  = document.createElement('canvas');
                canvas.className ='canvas';
                canvas.width = 600;
                canvas.height = 410;
                
                let xGrid = 10;
                let yGrid = 10;
                let cellsize = 100; 
                let ctx = canvas.getContext('2d');
                
                let dataCanvasA = {
                    J:data[0],
                    F:data[1],
                    M:data[2],
                    A:data[3],
                    M:data[4],
                    J:data[5],
                    JL:data[6],
                    A:data[7],
                    S:data[8],
                    O:data[9],
                    N:data[10],
                    D:data[11]
                } 
                const entries = Object.entries(dataCanvasA);
                function drawGrid(){
                ctx.beginPath();
                
                while(xGrid<canvas.height){
                    ctx.moveTo(0,xGrid);
                    ctx.lineTo(canvas.width,xGrid);
                    xGrid +=cellsize;
                }
                while(yGrid<canvas.width){
                    ctx.moveTo(yGrid,0);
                    ctx.lineTo(yGrid,canvas.height);
                    yGrid +=cellsize;
                }
                
                ctx.strokeStyle = "rgb(221, 221, 221,0.05)";    
                ctx.stroke();
                }
                function blocks(count){
                return count*10;
                }
                function drawAxis(){
                let yPlot = 40;
                let pop = 0;
                    ctx.beginPath();
                    ctx.strokeStyle = "white";
                    ctx.lineTo(blocks(5),blocks(40));
                    ctx.lineTo(blocks(60),blocks(40)); //Barre line Jour 
                
                    ctx.moveTo(blocks(5),blocks(40));
                
                for(let i= 1 ; i<=6 ; i++ ){
                ctx.strokeText(pop,blocks(2),blocks(yPlot));
                yPlot -= 5;
                pop += 500;                  //Echelle
                }
                ctx.stroke();
                }
                
                function drawChart(){              // trace du courbe
                ctx.beginPath();
                ctx.strokeStyle = "rgb(33, 150, 243)";
                ctx.moveTo(blocks(5),blocks(39));
                
                var xPlot = 10;
                
                for(const[jour,benefice] of entries){
                    var beneficeInBlocks = benefice/100;
                    ctx.strokeText(jour,blocks(xPlot),blocks(40-beneficeInBlocks-2));  //Affiche les noms du jour dans chart , -2 pour decaler l'ecriture
                    ctx.lineTo(blocks(xPlot),blocks(40-beneficeInBlocks));
                    ctx.arc(blocks(xPlot),blocks(40-beneficeInBlocks),4,0,Math.PI*2,true);
                    xPlot += 5;              // largeur de chaque jour dans chart
                }
                ctx.stroke();
                }
                drawGrid();
                drawAxis()
                drawChart()
                
            chartA.appendChild(canvas);
            show.insertBefore(chartA,show.firstChild);
           })

                 // gere chart AREA Jour

                 sendareaJ.addEventListener('click',function(e) {
                    e.preventDefault() 
                    socket.emit("envoiechartAJ")
                },true)
         
                socket.on("chartAJ",function(data) {
                    var chartAJ = document.createElement('div');
                        chartAJ.className = "show g-chart chartAJ";
                        chartAJ.style.height= "500px";
                        chartAJ.style.marginBottom= "30px";
                        chartAJ.style.animation = " slide 0.2s ";
                        

                    show.insertBefore( chartAJ,show.firstChild);

                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {
                        var data = google.visualization.arrayToDataTable([
                        ['Year', 'Sales', 'Expenses'],
                        ['2013',  1000,      400],
                        ['2014',  1170,      460],
                        ['2015',  660,       1120],
                        ['2016',  1030,      540]
                        ]);

                        var options = {
                        title: 'Company Performance',
                        hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
                        vAxis: {minValue: 0},
                        backgroundColor: 'none'
                        };

                        var chart = new google.visualization.AreaChart(chartAJ);
                        chart.draw(data, options);
                    }
                })

                 // gere chart PIE Jour

                 sendpieJ.addEventListener('click',function(e) {
                    e.preventDefault() 
                    socket.emit("envoiechartPJ")
                },true)
         
                socket.on("chartPJ",function(data) {
                    var chartPJ = document.createElement('div');
                        chartPJ.className = "show g-chart chartPJ";
                        chartPJ.style.height= "450px";
                        chartPJ.style.marginBotton= "30px";
                        chartPJ.style.animation = " slide 0.2s ";

                    show.insertBefore( chartPJ,show.firstChild);

                    google.charts.load("current", {packages:["corechart"]});
                    google.charts.setOnLoadCallback(drawChart);
                    function drawChart() {
                        var data = google.visualization.arrayToDataTable([
                        ['Task', 'Hours per Day'],
                        ['Prayer',     11],
                        ['worship',      2],
                        ['code',  2],
                        ['Sychronisation', 2],
                        ['Prayer',    7]
                        ]);

                        var options = {
                        title: 'My Daily Discipline',
                        pieHole: 0.4,
                        backgroundColor: 'none'
                        };

                        var chart = new google.visualization.PieChart(chartPJ);
                        chart.draw(data, options);
                    }
                })

                 // gere chart HISTO Jour

                 sendhistoJ.addEventListener('click',function(e) {
                    e.preventDefault() 
                    socket.emit("envoiechartHJ")
                },true)
         
                socket.on("chartHJ",function(data) {
                    var chartHJ = document.createElement('div');
                        chartHJ.className = "show g-chart chartHJ";
                        chartHJ.style.height= "500px";
                        chartHJ.style.marginBotton= "30px";
                        chartHJ.style.animation = " slide 0.2s ";

                    show.insertBefore( chartHJ,show.firstChild);

                    google.charts.load("current", {packages:["corechart"]});
                    google.charts.setOnLoadCallback(drawChart);
                    function drawChart() {
                        var data = google.visualization.arrayToDataTable([
                        ['Dinosaur', 'Length'],
                        ['Acrocanthosaurus (top-spined lizard)', 12.2],
                        ['Albertosaurus (Alberta lizard)', 9.1],
                        ['Allosaurus (other lizard)', 12.2],
                        ['Apatosaurus (deceptive lizard)', 22.9],
                        ['Archaeopteryx (ancient wing)', 0.9],
                        ['Argentinosaurus (Argentina lizard)', 36.6],
                        ['Baryonyx (heavy claws)', 9.1],
                        ['Brachiosaurus (arm lizard)', 30.5],
                        ['Ceratosaurus (horned lizard)', 6.1],
                        ['Coelophysis (hollow form)', 2.7],
                        ['Compsognathus (elegant jaw)', 0.9],
                        ['Deinonychus (terrible claw)', 2.7],
                        ['Diplodocus (double beam)', 27.1],
                        ['Dromicelomimus (emu mimic)', 3.4],
                        ['Gallimimus (fowl mimic)', 5.5],
                        ['Mamenchisaurus (Mamenchi lizard)', 21.0],
                        ['Megalosaurus (big lizard)', 7.9],
                        ['Microvenator (small hunter)', 1.2],
                        ['Ornithomimus (bird mimic)', 4.6],
                        ['Oviraptor (egg robber)', 1.5],
                        ['Plateosaurus (flat lizard)', 7.9],
                        ['Sauronithoides (narrow-clawed lizard)', 2.0],
                        ['Seismosaurus (tremor lizard)', 45.7],
                        ['Spinosaurus (spiny lizard)', 12.2],
                        ['Supersaurus (super lizard)', 30.5],
                        ['Tyrannosaurus (tyrant lizard)', 15.2],
                        ['Ultrasaurus (ultra lizard)', 30.5],
                        ['Velociraptor (swift robber)', 1.8]]);

                        var options = {
                        title: 'Lengths of dinosaurs, in meters',
                        legend: { position: 'none' },
                        backgroundColor: 'none'
                        };

                        var chart = new google.visualization.Histogram(chartHJ);
                        chart.draw(data, options);
                    }
                })



                // GERER Fichier

                var affFichierPDF = document.querySelector('.aff-pdf');

                affFichierPDF.addEventListener('click',function(e) {
                    e.preventDefault() 
                    socket.emit("envoiePDF")
                 },true)
                socket.on("fichierPDF",function(data) { 
                    var viewPDF = document.createElement('object');
                        viewPDF.data="uploadfichier/test.pdf";
                        viewPDF.style.width="100%";
                        viewPDF.style.height="900px";
                        viewPDF.style.animation = " slide 0.2s ";
                    show.insertBefore(viewPDF,show.firstChild) ;
                 })


                // GERER THEMER
                 
                //   gere theme 1
                var theme1 = document.querySelector('.theme-1');
                var list1 = document.querySelectorAll('.ls1');

                var ajoutliste = document.querySelector('.ajout-liste');
                var boxtheme1 = document.querySelector('.box-theme-1');
                var nbListe = document.querySelector('.nb-listes');
                var nb = document.querySelector('.nb-listes');
                var titreth1 = document.querySelector('.theme1-titre');
                var imp = document.querySelectorAll('.ls1');
                var imp2 = document.querySelectorAll('.ls2');

                theme1.addEventListener('click',function(e) {
                    e.preventDefault() 
                    var tab =[];
                    for(var l = 0; l< list1.length ;l++) { 
                        tab.push(list1[l].value)
                    }
                    socket.emit("envoietheme1",tab)
                    socket.emit("envoietheme1nb",nb.value)
                    socket.emit("envoietheme1titre",titreth1.value)
                    },true)

                 //   gere theme 1 administrateur
               
                
                ajoutliste.addEventListener('click',function(e) {
                        e.preventDefault() 
                        for(var tx = 0; tx < imp2.length  ;tx++) { 
                          imp2[tx].style.display = 'none'  ; 
                        }
                        for(var t = 0 ; t <(nbListe.value)   ;t++) { 
                          imp[t].style.display = 'block'  ; 
                        //   imp[8].style.display = 'none'  ; 
                        }

                       
                     },true)
               

                   socket.on("theme1",function(data) {
                    var theme1 = document.createElement('div');
                        theme1.className ='theme1 show';
                        theme1.style.width = "100%";
                        theme1.style.paddingBottom = "30px";
                        theme1.style.background = "rgba(0,0,0,0.3)" ;
                        theme1.style.animation = " slide 0.2s ";

                    var titre = document.createElement('h1');
                        socket.on("titreth1",function(data) { 
                        titre.innerHTML = '<i class="fa fa-tasks ico-titre"></i>'+data+'';
                        })
                        titre.style.background = 'white';
                        titre.style.texteAligne = 'center';

                    theme1.appendChild(titre);

                     
                     t1 = document.createElement('div');t1.innerHTML = '<i class="fa fa-caret-right "></i> '+data[0] +'';
                     t2 = document.createElement('div');t2.innerHTML = '<i class="fa fa-caret-right "></i> '+data[1] +'';
                     t3 = document.createElement('div');t3.innerHTML = '<i class="fa fa-caret-right "></i> '+data[2] +'';
                     t4 = document.createElement('div');t4.innerHTML = '<i class="fa fa-caret-right "></i> '+data[3] +'';
                     t5 = document.createElement('div');t5.innerHTML = '<i class="fa fa-caret-right "></i> '+data[4] +'';
                     t6 = document.createElement('div'); t6.innerHTML = '<i class="fa fa-caret-right "></i> '+data[5] +'';
                     t7 = document.createElement('div'); t7.innerHTML = '<i class="fa fa-caret-right "></i> '+data[6] +'';
                     t8 = document.createElement('div'); t8.innerHTML = '<i class="fa fa-caret-right "></i> '+data[7] +'';
                     t9 = document.createElement('div'); t9.innerHTML = '<i class="fa fa-caret-right "></i> '+data[8] +'';//t9 est remplacer pa t9t
                     t9t = document.createElement('div'); t9t.innerHTML = '<i class="fa fa-caret-right "></i> '+data[8] +'';
                     t10 = document.createElement('div'); t10.innerHTML = '<i class="fa fa-caret-right "></i> '+data[9] +'';
                     t11 = document.createElement('div');t11.innerHTML = '<i class="fa fa-caret-right "></i> '+data[10] +'';
                     t12 = document.createElement('div');t12.innerHTML = '<i class="fa fa-caret-right "></i> '+data[11] +'';
                     t13 = document.createElement('div');t13.innerHTML = '<i class="fa fa-caret-right "></i> '+data[12] +'';
                     t14 = document.createElement('div');t14.innerHTML = '<i class="fa fa-caret-right "></i> '+data[13] +'';
                     t15 = document.createElement('div');t15.innerHTML = '<i class="fa fa-caret-right "></i> '+data[14] +'';
                     t16 = document.createElement('div'); t16.innerHTML = '<i class="fa fa-caret-right "></i> '+data[15] +'';
                     t17 = document.createElement('div'); t17.innerHTML = '<i class="fa fa-caret-right "></i> '+data[16] +'';
                     t18 = document.createElement('div'); t18.innerHTML = '<i class="fa fa-caret-right "></i> '+data[17] +'';
                     t19 = document.createElement('div'); t9.innerHTML = '<i class="fa fa-caret-right "></i> '+data[18] +'';
                     t20 = document.createElement('div'); t20.innerHTML = '<i class="fa fa-caret-right "></i> '+data[19] +'';
                     t21 = document.createElement('div'); t20.innerHTML = '<i class="fa fa-caret-right "></i> '+data[20] +'';
                     console.log(data);
                    
                     
                    
                             
                    var tb = [];
                         tb[0] = t1;tb[1] = t2;tb[2] = t3;tb[3] = t4;tb[4] = t5; tb[5] = t6;tb[6] = t7; tb[7] = t8;tb[8] = t9t; tb[9] = t10; tb[10] = t11;tb[11] = t12;tb[12] = t13;tb[13] = t14;tb[14] = t15; tb[15] = t16;tb[16] = t17; tb[17] = t18;tb[18] = t19; tb[19] = t20;  
                       socket.on("nb",function(data) {    
                          for(var w = 0; w < data ;w++) { 
                              theme1.appendChild(tb[w]);
                          }
                        })
                  
                    show.insertBefore(theme1,show.firstChild) ;
                  })




                    //   gere theme 2
                    var theme2 = document.querySelector('.theme-2');
                    theme2.addEventListener('click',function() {
                         socket.emit("envoietheme2")
                    },true)
                    socket.on("theme2",function(data) {
                     var theme2 = document.createElement('div');
                        theme2.className ='theme2 show';
                        theme2.style.width = "100%";
                        theme2.style.paddingBottom = "30px";
                        theme2.style.animation = " slide 0.2s ";

                     var box1 = document.createElement('div');box1.innerHTML = '<i class="fa fa-car "></i><br> Car';
                     var box2 = document.createElement('div');box2.innerHTML = '<i class="fa fa-taxi "></i><br> Taxi';
                     var box3 = document.createElement('div');box3.innerHTML = '<i class="fa fa-bus "></i><br> Bus';
                     theme2.appendChild(box1);theme2.appendChild(box2);theme2.appendChild(box3);
                        show.insertBefore(theme2,show.firstChild) ;
                    })

                   //   gere theme 3
                   var theme3 = document.querySelector('.theme-3');
                   var tm3 = document.querySelectorAll('.tm3');

                   theme3.addEventListener('click',function() {
                        var tabtm3 =[];
                        for(var l3 = 0; l3< tm3.length ;l3++) { 
                            tabtm3.push(tm3[l3].value)
                        }
                        socket.emit("envoietheme3",tabtm3)
                   },true)

                   socket.on("theme3",function(data) {
                    var theme3 = document.createElement('div');
                       theme3.className ='theme3 show';
                       theme3.style.width = "100%";
                    //    theme2.style.animation = " slide 0.2s ";

                    var box1 = document.createElement('div');
                        box1.className = 'box' ;
                    var img = document.createElement('img');img.src = ''+data[0]+'';
                    var name = document.createElement('h2');name.innerHTML =''+data[1]+'';
                    var desc = document.createElement('span');desc.innerHTML ="" +data[2]+"";
                    var para = document.createElement('p');para.innerHTML ="" +data[3]+"";
                    var ico = document.createElement('div');ico.innerHTML = '<a href="http://"><i class="fa fa-facebook "></i></a><a href="http://"><i class="fa fa-google-plus "></i></a>';
                    box1.appendChild(img); box1.appendChild(name); box1.appendChild(desc); box1.appendChild(para); box1.appendChild(ico);

                    theme3.appendChild(box1);
                    show.insertBefore(theme3,show.firstChild) ;
                   })

                    //   gere theme 4
                    var theme4 = document.querySelector('.theme-4');
                    var tm4 = document.querySelectorAll('.tm4');

                    theme4.addEventListener('click',function() {
                        var tabtm4 =[];
                        for(var l4 = 0; l4< tm4.length ;l4++) { 
                            tabtm4.push(tm4[l4].value)
                        }
                        socket.emit("envoietheme4",tabtm4)
                    },true)

                    socket.on("theme4",function(data) {
                    var theme4 = document.createElement('div');
                        theme4.className ='theme4 show';
                        theme4.innerHTML += ''+data[1]+'';

                    var titre4 = document.createElement('h3');
                        titre4.innerHTML = ''+data[0]+'';
                    


                    theme4.appendChild(titre4);
                    show.insertBefore(theme4,show.firstChild) ;
                    })

                    //   gere theme 5 chart line interval
                    var theme5 = document.querySelector('.theme-5');

                    theme5.addEventListener('click',function() {
                        socket.emit("envoietheme5")
                    },true)

                    socket.on("theme5",function(data) {

                        var theme5 = document.createElement('div');
                            theme5.className = "show g-chart theme5";
                            theme5.style.height= "500px";
                            theme5.style.marginBotton= "30px";
                            theme5.style.animation = " slide 0.2s ";

                        show.insertBefore( theme5,show.firstChild);

                        google.charts.load('current', {'packages':['corechart']});
                        google.charts.setOnLoadCallback(drawChart);
                  
                        function drawChart() {
                          var data = google.visualization.arrayToDataTable([
                            ['Year', 'Sales', 'Expenses'],
                            ['2004',  1000,      400],
                            ['2005',  1170,      460],
                            ['2006',  660,       1120],
                            ['2007',  1030,      540]
                          ]);
                  
                          var options = {
                            title: 'Company Performance',
                            curveType: 'function',
                            legend: { position: 'bottom' }
                          };
                  
                          var chart = new google.visualization.LineChart(theme5);
                  
                          chart.draw(data, options);
                        }
                    })

                     //   gere theme 6 Tableau
                     var theme6 = document.querySelector('.theme-6');

                     theme6.addEventListener('click',function() {
                         socket.emit("envoietheme6")
                     },true)
 
                     socket.on("theme6",function(data) {
 
                         var theme6 = document.createElement('div');
                             theme6.className = "show g-chart theme6";
                             theme6.style.height= "500px";
                             theme6.style.marginBotton= "30px";
                             theme6.style.animation = " slide 0.2s ";
 
                         show.insertBefore( theme6,show.firstChild);
 
                         google.charts.load('current', {'packages':['table']});
                         google.charts.setOnLoadCallback(drawTable);
                   
                         function drawTable() {
                           var data = new google.visualization.DataTable();
                           data.addColumn('string', 'Name');
                           data.addColumn('number', 'Salary');
                           data.addColumn('boolean', 'Full Time Employee');
                           data.addRows([
                             ['Mike',  {v: 10000, f: '$10,000'}, true],
                             ['Jim',   {v:8000,   f: '$8,000'},  false],
                             ['Alice', {v: 12500, f: '$12,500'}, true],
                             ['Bob',   {v: 7000,  f: '$7,000'},  true]
                           ]);
                   
                           var table = new google.visualization.Table(theme6);
                   
                           table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
                         }
                     })

                     //   gere theme 7 waterfal
                     var theme7 = document.querySelector('.theme-7');

                     theme7.addEventListener('click',function() {
                         socket.emit("envoietheme7")
                     },true)
 
                     socket.on("theme7",function(data) {
 
                         var theme7 = document.createElement('div');
                             theme7.className = "show g-chart theme7";
                             theme7.style.height= "500px";
                             theme7.style.marginBotton= "30px";
                             theme7.style.animation = " slide 0.2s ";
 
                         show.insertBefore( theme7,show.firstChild);
 
                            google.charts.load('current', {'packages':['corechart']});
                            google.charts.setOnLoadCallback(drawChart);
                            function drawChart() {
                                var data = google.visualization.arrayToDataTable([
                                ['Mon', 28, 28, 38, 38],
                                ['Tue', 38, 38, 55, 55],
                                ['Wed', 55, 55, 77, 77],
                                ['Thu', 77, 77, 66, 66],
                                ['Fri', 66, 66, 22, 22]
                                // Treat the first row as data.
                                ], true);

                                var options = {
                                legend: 'none',
                                bar: { groupWidth: '100%' }, // Remove space between bars.
                                candlestick: {
                                    fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                                    risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
                                }
                                };

                                var chart = new google.visualization.CandlestickChart(theme7);
                                chart.draw(data, options);
                            }
                     })

                       
                      //   gere theme 8 Geo
                      var theme8 = document.querySelector('.theme-8');

                      theme8.addEventListener('click',function() {
                          socket.emit("envoietheme8")
                      },true)
  
                      socket.on("theme8",function(data) {
  
                          var theme8 = document.createElement('div');
                              theme8.className = "show g-chart theme8";
                              theme8.style.height= "500px";
                              theme8.style.marginBotton= "30px";
                              theme8.style.animation = " slide 0.2s ";
  
                          show.insertBefore( theme8,show.firstChild);
  
                          google.charts.load('current', {
                            'packages':['geochart'],
                            
                            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                          });
                          google.charts.setOnLoadCallback(drawRegionsMap);
                    
                          function drawRegionsMap() {
                            var data = google.visualization.arrayToDataTable([
                              ['Country',   'Latitude'],
                              ['Algeria', 36], ['Angola', -8], ['Benin', 6], ['Botswana', -24],
                              ['Burkina Faso', 12], ['Burundi', -3], ['Cameroon', 3],
                              ['Canary Islands', 28], ['Cape Verde', 15],
                              ['Central African Republic', 4], ['Ceuta', 35], ['Chad', 12],
                              ['Comoros', -12], ['Cote d\'Ivoire', 6],
                              ['Democratic Republic of the Congo', -3], ['Djibouti', 12],
                              ['Egypt', 26], ['Equatorial Guinea', 3], ['Eritrea', 15],
                              ['Ethiopia', 9], ['Gabon', 0], ['Gambia', 13], ['Ghana', 5],
                              ['Guinea', 10], ['Guinea-Bissau', 12], ['Kenya', -1],
                              ['Lesotho', -29], ['Liberia', 6], ['Libya', 32], ['Madagascar', null],
                              ['Madeira', 33], ['Malawi', -14], ['Mali', 12], ['Mauritania', 18],
                              ['Mauritius', -20], ['Mayotte', -13], ['Melilla', 35],
                              ['Morocco', 32], ['Mozambique', -25], ['Namibia', -22],
                              ['Niger', 14], ['Nigeria', 8], ['Republic of the Congo', -1],
                              ['Réunion', -21], ['Rwanda', -2], ['Saint Helena', -16],
                              ['São Tomé and Principe', 0], ['Senegal', 15],
                              ['Seychelles', -5], ['Sierra Leone', 8], ['Somalia', 2],
                              ['Sudan', 15], ['South Africa', -30], ['South Sudan', 5],
                              ['Swaziland', -26], ['Tanzania', -6], ['Togo', 6], ['Tunisia', 34],
                              ['Uganda', 1], ['Western Sahara', 25], ['Zambia', -15],
                              ['Zimbabwe', -18]
                            ]);
                    
                            var options = {
                              region: '002', // Africa
                              colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
                              backgroundColor: '#81d4fa',
                              datalessRegionColor: '#f8bbd0',
                              defaultColor: '#f5f5f5',
                            };
                    
                            var chart = new google.visualization.GeoChart(theme8);
                            chart.draw(data, options);
                          };
                      })


                      //   gere theme 9 Organigramme
                      var theme9 = document.querySelector('.theme-9');

                      theme9.addEventListener('click',function() {
                          socket.emit("envoietheme9")
                      },true)
  
                      socket.on("theme9",function() {
  
                          var theme9 = document.createElement('div');
                              theme9.className = "show g-chart theme9";
                              theme9.style.animation = " slide 0.2s ";
                             
                          var tme9 = document.createElement('iframe');
                              tme9.src = "theme/tableau/table.html";
                              tme9.style.width= "100%";
                              tme9.style.height= "1600px";
                              tme9.style.marginBotton= "30px";
                              
  
                         theme9.appendChild(tme9);
                         show.insertBefore( theme9,show.firstChild);
  
                          
                      })

                      //   gere theme 10 Formulaire
                      var theme10 = document.querySelector('.theme-10');

                      theme10.addEventListener('click',function() {
                          socket.emit("envoietheme10")
                      },true)
  
                      socket.on("theme10",function() {
  
                          var theme10 = document.createElement('div');
                              theme10.className = "show g-chart theme10";
                              theme10.style.animation = " slide 0.2s ";
                              theme10.style.background = " white ";
                             
                          var tme10 = document.createElement('iframe');
                              tme10.src = "theme/formulaire/index.html";
                              tme10.style.width= "100%";
                              tme10.style.height= "600px";
                              tme10.style.marginBotton= "30px";
                              
  
                         theme10.appendChild(tme10);
                         show.insertBefore( theme10,show.firstChild);
  
                          
                      })

                     

                   
                   //   gere Affichage GALLERIE

                   socket.on("gal",function(data) {
                      var gal = document.createElement('img'); 
                          gal.src = data;
                          gal.className = "aff-gallerie show"
                          gal.style.width = "100%";
                     show.insertBefore(gal,show.firstChild) ;    

                    })


                   







