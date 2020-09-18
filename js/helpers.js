import {moveTowardPoint} from "./cameramovements.js";
import {stepNum, differentChoices, climbingStairs, scene, cameraData, gameStage} from "./game.js";
import {platMesh2, createStairs} from "./models.js";
//MATH HELPERS
export function parabolicJumpH(TTX, TTY, jumpH){
  if(jumpH == 1){
    return parabolicJump(TTX, TTX-3, TTY+6);
  }
  else{
    return parabolicJump(TTX,TTX-6,TTY+12);
  }
}

export function parabolicJump(startX, endX, midY){
    return [[startX+4*(endX-startX)/5, midY,0]];
}


export function moveObjectTo(object, x, y, z, thresh, speed, smooth){
  var moves = moveTowardPoint(object, x, y, z, thresh);
  var pos = new THREE.Vector3(object.position.x,object.position.y,object.position.z);
  if(moves[0]){
    if(pos.x < x){
      pos.x += speed*(Math.abs(x-pos.x)/smooth);
    }
    else{
      pos.x -= speed*(Math.abs(x-pos.x)/smooth);
    }
  }
  if(moves[1]){
    if(pos.y < y){
      pos.y += speed*(Math.abs(y-pos.y)/smooth);
    }
    else{
      pos.y -= speed*(Math.abs(y-pos.y)/smooth);
    }
  }
  if(moves[2]){
    if(pos.z < z){
      pos.z += speed*(Math.abs(z-pos.z)/smooth);
    }
    else{
      pos.z -= speed*(Math.abs(z-pos.z)/smooth);
    }
  }


  return [moves, pos];
}






///HTML HELPERS
export function createBanner(){
  var container = document.getElementById("container");
  var banner = document.createElement("div");
  banner.id = "banner";
  banner.innerHTML = "<div id='banner' style = 'overflow:hidden'>"
     +"<div style='background-color:black; display:block; height: 20%; width: 100%; position:absolute; bottom:0%;'>"
       +"<div id='start' style='color:white; position:relative; bottom: -10%; left: 35%; font-size:50px; width:50%'> Press any button to start!</div>"
     +"</div>";
  container.appendChild(banner);

  var title = document.createElement("div");
  title.id = "title";
  title.innerHTML = "<div id = 'title'>Climb-I-Must</div>";
  container.appendChild(title);
}

export function playAgainBanner(){
  var container = document.getElementById("container");
  var banner = document.createElement("div");
  banner.id = "playAgain";
  banner.innerHTML = "<div id='banner' style = 'overflow:hidden'>"
     +"<div style='background-color:black; display:block; height: 20%; width: 100%; position:absolute; bottom:0%;'>"
       +"<div id='playAgain' style='color:white; position:relative; bottom: -10%; left: 10%; font-size:50px; width:100%'> You got to the top! Press any key to climb again!</div>"
     +"</div>";
  container.appendChild(banner);
}

export function createStats(){
  var container = document.getElementById("container");
  var stats = document.createElement("div");
  stats.id = "stats";
  stats.innerHTML = "<div id='stats' style = 'overflow:hidden'>"
     +"<div style='background-color:black; display:block; height: 5%; width: 100%; position:absolute; top:0%;'>"
       +"<div id='stats' style='color:white; position:relative; top:0%; left: 1%; font-size:50px; width:100%'>Stair Height: "+(stepNum.n)+" Total Possibilities: "+(stepNum.differentChoices)+" Stairs Left: "+(stepNum.n-stepNum.currStep)+"</div>"
     +"</div>";
  container.appendChild(stats);
}

export function updateStats(){
  var stats = document.getElementById("stats");
  stats.innerHTML = "<div id='stats' style = 'overflow:hidden'>"
     +"<div style='background-color:black; display:block; height: 5%; width: 100%; position:absolute; top:0%;'>"
       +"<div id='stats' style='color:white; position:relative; top:0%; left: 1%; font-size:50px; width:100%'>Stair Height: "+(stepNum.n)+" Total Possibilities: "+(stepNum.differentChoices)+" Stairs Left: "+(stepNum.n-stepNum.currStep)+"</div>"
     +"</div>";
     +"</div>";
}

export function createInputModal(){

  var container = document.getElementById("container");
  var modalDiv = document.createElement("div");
  modalDiv.class = "modal";
  modalDiv.innerHTML = '<div class="modal-content" id = "introModal"><div class="modal-header"><h2>Welcome to Climb-I-Must</h2></div><div class="modal-body"><p>You\'re a rebel scout on the ice planet, Hoth. While killing time waiting for the Empire to find your base, you ride your trusty Tauntaun around the plant. </p>'+
                      '<p>You wander upon a very tall ice staircase leading up a mountainside that takes n steps to reach.</p><p>Having plenty of time on your hands, you decide you want to figure out how many ways are there to reach the top.</p>'+
                      '<p>The catch is that your Tauntaun can only climb 1 or 2 steps at a given time.</p>'+'<p>Luckily, if you tell me how tall that staircase is, HQ can run a calculation and tell you how many ways there are!</p>'+
                      '<div class="modal-footer1" id = "closeButton"><h3>Next</h3></div>';
  container.appendChild(modalDiv)


  var modal = document.getElementById("introModal");

  modal.style.display = "block";

  var close = document.getElementById("closeButton");


  close.onclick = function(event) {
      modal.parentNode.removeChild(modal);
    //  modal.style.display = "none";
      modalDiv = document.createElement("div");
      modalDiv.class = "modal";
      modalDiv.innerHTML = '<div class="modal-content" id = "introModal"><div class="modal-header"><h2>How Many Steps Are There?</h2></div><div class="modal-body"><p><input id = "numStairs" type = "text"></p>'+
                          '<div class="modal-footer1" id = "closeButton"><h3>Submit</h3></div>';
      container.appendChild(modalDiv)
      modal = document.getElementById("introModal");
      close = document.getElementById("closeButton");

      close.onclick =function(event){

        // modal.style.display = "none"
        var answer = document.getElementById("numStairs");
        stepNum.n = parseInt(answer.value);

        stepNum.differentChoices = climbingStairs(stepNum.n);
        scene.remove(platMesh2);
        createStairs(stepNum.n);
        cameraData.cameraStage = 4;
        cameraData.cameraMoving = true;
        gameStage.stage = 3;
        modal = document.getElementById("introModal");
        modal.parentNode.removeChild(modal);
        createStats();


      }
  }
}
