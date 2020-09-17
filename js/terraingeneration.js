import {ConvexGeometry} from "./ConvexGeometry.js";
import {scene} from "./game.js";

export function testPlane(){
  let points = [new THREE.Vector3(0,15,0),new THREE.Vector3(20,15,0),new THREE.Vector3(20,15,20),new THREE.Vector3(0,15,20)];
  let geometry = new ConvexGeometry( points );
  let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  let mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
}
