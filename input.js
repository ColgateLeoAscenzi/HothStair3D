function handleKeyUp(keyEvent){

}

function handleKeyDown(keyEvent){
  if(keyEvent.key == "m"){
    if(!playingM){
      mediaElement.play();
      playingM = true;
    }
    else if (playingM){
      mediaElement.pause();
      playingM = false;
    }
  }


  if(gameStage == 0){
    if(keyEvent.key != "Alt" && keyEvent.key != "Tab"){
      mediaElement.play();
      playingM = true;

      var boxVar = document.getElementById("banner");
      boxVar.parentNode.removeChild(boxVar);
      var boxVar = document.getElementById("title");
      boxVar.parentNode.removeChild(boxVar);

      mainMenuZoom();
      gameStage = 1;

    }
  }
}

function onMouseMove(event){
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseDown(event){

}
