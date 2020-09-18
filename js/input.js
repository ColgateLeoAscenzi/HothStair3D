import {gameStage,cameraData, mouse, mediaElement, radio, stepNum, scene} from "./game.js";
import {mainMenuZoom} from "./cameramovements.js";


export function handleKeyUp(keyEvent){
  if(cameraData.cameraStage == 10){
    if(keyEvent.key != "Alt" && keyEvent.key != "Tab" || keyEvent.key != "Shift"){
      var boxVar = document.getElementById("playAgain");
      boxVar.parentNode.removeChild(boxVar);
      var boxVar = document.getElementById("stats");
      boxVar.parentNode.removeChild(boxVar);
      stepNum.currStep = 0;
      stepNum.n = 0;
      stepNum.differentChoices = 0;
      cameraData.cameraStage = 3;
      cameraData.spawnedBanner = false;
    }
  }
}

export function handleKeyDown(keyEvent){
  if(keyEvent.key == "m"){
    if(!radio.playingM){
      mediaElement.play();
      radio.playingM = true;
    }
    else if (radio.playingM){
      mediaElement.pause();
      radio.playingM = false;
    }
  }


  if(gameStage.stage == 0){
    if(keyEvent.key != "Alt" && keyEvent.key != "Tab" || keyEvent.key != "Shift"){
      mediaElement.play();
      radio.playingM = true;

      var boxVar = document.getElementById("banner");
      boxVar.parentNode.removeChild(boxVar);
      var boxVar = document.getElementById("title");
      boxVar.parentNode.removeChild(boxVar);

      mainMenuZoom();
      gameStage.stage = 1;

    }
  }
}

export function onMouseMove(event){
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

export function onMouseDown(event){
}
