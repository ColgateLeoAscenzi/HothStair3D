import {cameraData} from "./game.js";
export function mainMenuZoom(){
  cameraData.cameraMoving = true;
  cameraData.cameraStage = 1;
}


export function moveTowardPoint(camera, x, y, z, thresh){
  return [Math.abs(camera.position.x-x) > thresh,
          Math.abs(camera.position.y-y) > thresh,
          Math.abs(camera.position.z-z) > thresh];
          //returns an array indicating if the current camera
          //coordinates are the target
}

export function genCircle(){
  var points = [];
  for(var i = 1; i < 100; i++){
    points.push([(10-2.49*(i/100))*Math.cos(2*3.14159*(i/100)),
                10-i*0.1,
                (10-2.49*(i/100))*Math.sin(2*3.14159*(i/100))])
  }
  return points;
}
