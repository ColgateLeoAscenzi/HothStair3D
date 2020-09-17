//MATH HELPERS
function parabolicJumpH(TTX, TTY, jumpH){
  if(jumpH == 1){
    return parabolicJump(TTX, TTX-3, TTY+6);
  }
  else{
    return parabolicJump(TTX,TTX-6,TTY+12);
  }
}

function parabolicJump(startX, endX, midY){
    return [[startX+4*(endX-startX)/5, midY,0]];
}


function moveObjectTo(object, x, y, z, thresh, speed, smooth){
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
function createBanner(){
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

function createStats(){
  var container = document.getElementById("container");
  var stats = document.createElement("div");
  stats.id = "stats";
  stats.innerHTML = "<div id='stats' style = 'overflow:hidden'>"
     +"<div style='background-color:black; display:block; height: 5%; width: 100%; position:absolute; top:0%;'>"
       +"<div id='stats' style='color:white; position:relative; top:0%; left: 1%; font-size:50px; width:100%'>Stair Height: "+(n)+" Total Possibilities: "+(differentChoices)+" Stairs Left: "+(n-currStep)+"</div>"
     +"</div>";
  container.appendChild(stats);
}

function updateStats(){
  var stats = document.getElementById("stats");
  stats.innerHTML = "<div id='stats' style = 'overflow:hidden'>"
     +"<div style='background-color:black; display:block; height: 5%; width: 100%; position:absolute; top:0%;'>"
       +"<div id='stats' style='color:white; position:relative; top:0%; left: 1%; font-size:50px; width:100%'>Stair Height: "+(n)+" Total Possibilities: "+(differentChoices)+" Stairs Left: "+(n-currStep)+"</div>"
     +"</div>";
     +"</div>";
}
