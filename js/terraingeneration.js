import {ConvexGeometry} from "./ConvexGeometry.js";
import {scene} from "./game.js";
import {Tauntaun} from "./models.js";

export function createFloor(){
  let points = [new THREE.Vector3(-150,1,-150),new THREE.Vector3(-150,1,150),new THREE.Vector3(150,1,150),new THREE.Vector3(150,1,-150)];
  let geometry = new ConvexGeometry( points );
  let material = new THREE.MeshBasicMaterial( {color: 0xc5dbde} );
  let mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
}

export function generateHill(height, dD, dW){
  var leftHill = createInclinePlane(150, height, dD, dW, "L");
  leftHill.rotateOnWorldAxis(new THREE.Vector3(0,1,0), -1.57);
  leftHill.position.x = -45-height/2;
  leftHill.position.y = 2+height/2;
  leftHill.position.z = -75+7.5;
  leftHill.rotateOnWorldAxis(new THREE.Vector3(0,0,1), 0.78);

  var rightHill = createInclinePlane(150, height, dD, dW, "R");
  rightHill.rotateOnWorldAxis(new THREE.Vector3(0,1,0), -1.57);
  rightHill.position.x = -45-height/2;
  rightHill.position.y = 2+height/2;
  rightHill.position.z = 75+7.5;
  rightHill.rotateOnWorldAxis(new THREE.Vector3(0,0,1), 0.78);

  var middleHill = createInclinePlane(15, height, dD, dW, "M");
  middleHill.rotateOnWorldAxis(new THREE.Vector3(0,1,0), -1.57);
  middleHill.position.x = -45-height/2;
  middleHill.position.y = 2+height/2;
  middleHill.position.z = 0;
  middleHill.rotateOnWorldAxis(new THREE.Vector3(0,0,1), 0.78);


  for(var i = 0; i < leftHill.geometry.vertices.length; i++){
      // leftHill.geometry.vertices[i].y+= -10+Math.random()*20;
  }
  for(var i = 0; i < rightHill.geometry.vertices.length; i++){
      // rightHill.geometry.vertices[i].y+= -10+Math.random()*20;
  }
  scene.add(leftHill);
  scene.add(rightHill);
  scene.add(middleHill);

}

function createInclinePlane(width, height, dD, dW){
  //function draws from bottom left to top right, generates points across and up
  var geometry = new THREE.PlaneGeometry(width, height*Math.sqrt(2), dW, dD);
  var material = new THREE.MeshBasicMaterial( {color: 0xb4cacd, side: THREE.DoubleSide} );
  var plane = new THREE.Mesh( geometry, material );
  return plane;

}
