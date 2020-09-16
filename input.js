function handleKeyUp(keyEvent){
  if(keyEvent.key == "x"){
    mainMenuZoom();
  }
}

function handleKeyDown(keyEvent){

}

function onMouseMove(event){
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseDown(event){

}
