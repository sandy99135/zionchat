
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
var wys2 = document.querySelector('.Bl-affwys');

function toggleSource(){
  if(showingSourceCode){
      richeTextField.document.getElementsByTagName('body')[0].innerHTML = richeTextField.document.getElementsByTagName('body')[0].textContent;
      showingSourceCode = false;
      wys1.innerHTML = 'Enregistrer';
      wys2.style.display = 'none';
   }
   else{
      richeTextField.document.getElementsByTagName('body')[0].textContent =  richeTextField.document.getElementsByTagName('body')[0].innerHTML;
      showingSourceCode = true;
      wys1.innerHTML = 'Editer';
      wys2.style.display = 'block';
      wys2.innerHTML += richeTextField.document.getElementsByTagName('body')[0].textContent;
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

// var wyswingHTML = richeTextField.document.getElementsByTagName('body')[0].textContent;
// var val =  document.querySelector('.textVal');
// var wys = document.querySelector('.aff-wyswing');
//       wys.addEventListener('click',function(e) {
//         if(showingSourceCode){
//             richeTextField.document.getElementsByTagName('body')[0].innerHTML = richeTextField.document.getElementsByTagName('body')[0].textContent;
//             showingSourceCode = false;
//          }
//          else{
//             richeTextField.document.getElementsByTagName('body')[0].textContent =  richeTextField.document.getElementsByTagName('body')[0].innerHTML;
//             showingSourceCode = true;
//          }
//             e.preventDefault() 
//             socket.emit("envoiewys",wyswingHTML)
//             val.value = wyswingHTML;
//       },true)