function parabolicJumpH(TTX, TTY, jumpH){
  if(jumpH == 1){
    return parabolicJump(TTX, TTX-3, TTY+6);
  }
  else{
    return parabolicJump(TTX,TTX-6,TTY+12);
  }
}

function parabolicJump(startX, endX, midY){
    return [[startX+(endX-startX)/2, midY,0]];
}


function createBanner(){
  var container = document.getElementById("container");
  var banner = document.createElement("div");
  banner.id = "banner";
  banner.innerHTML = "<div id='banner' style = 'overflow:hidden'>"
     +"<div style='background-color:black; display:block; height: 20%; width: 100%; position:absolute; bottom:0%;'>"
       +"<div id='start' style='color:white; position:relative; bottom: -10%; left: 30%; font-size:50px; width:50%'> Press any button to start!</div>"
     +"</div>";
  container.appendChild(banner);
}
