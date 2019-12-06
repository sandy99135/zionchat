// gere menus droite

var geoExpand = document.querySelector(".expand-geo");
var boxgeo = document.querySelector(".box-geo");
var compressegeo = document.querySelector(".compresse-geo");

geoExpand.addEventListener("click",function(){
    boxgeo.style.position = "fixed" ;
    boxgeo.style.top = "0px" ;
    boxgeo.style.left = "0px" ;
    boxgeo.style.height= "100%" ;
    boxgeo.style.zIndex = "4" ;

    compressegeo.style.display = "block" ; 
    compressegeo.addEventListener("click",function(){
       this.style.display = "none" ; 
       boxgeo.style.position = "relative" ;
       boxgeo.style.height= "400px" ;
       boxgeo.style.zIndex = "0" ;
       
    })
})