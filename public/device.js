
// gere info device

socket.on("level",function(data2) {
   document.querySelector('.battery-level').innerHTML = data*100 + '%';
  })