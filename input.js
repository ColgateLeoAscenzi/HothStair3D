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
    if(keyEvent){
      mediaElement.play();
      playingM = true;

      var boxVar = document.getElementById("banner");
      boxVar.parentNode.removeChild(boxVar);

      mainMenuZoom();
    }
    gameStage = 1;
  }
}

function onMouseMove(event){
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseDown(event){
  if(gameStage == 2){
    //n = parseInt(prompt("How many stairs would you like to climb?"));
    n = 18;
    console.log(n);
    var differentChoices = climbingStairs(n);
    console.log(differentChoices);

  //  alert("You have "+differentChoices+" number of different ways to ascend this mountain");
    scene.remove(platMesh2);
    createStairs(n);
    cameraStage = 4;
    cameraMoving = true;
  }
}
