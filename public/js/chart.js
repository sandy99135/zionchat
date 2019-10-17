//  chart canvas
  function chartcanvas(){ 

  var canvas  = document.createElement('canvas');
  canvas.className ='canvas';
  canvas.width = 600;
  canvas.height = 410;
  
  let xGrid = 10;
  let yGrid = 10;
  let cellsize = 100; 
  let ctx = canvas.getContext('2d');
  
  let dataCanvas = {
      Lu:1000,
      Ma:700,
      Me:500,
      Je:1100,
      Ve:1510,
      Sa:1100,
      Di:2000
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
  ctx.moveTo(blocks(5),blocks(39));
  
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
  
  }
  

