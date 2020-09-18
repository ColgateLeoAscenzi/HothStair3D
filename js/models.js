import {scene, snowObj, stepNum} from "./game.js";
import {ConvexGeometry} from "./ConvexGeometry.js";
import {createFloor, generateHill} from "./terraingeneration.js";

var Tauntaun = {mesh: undefined};
var rock1 = {mesh: undefined};
var rock2 = {mesh: undefined};
var rock3 = {mesh: undefined};
var rock4 = {mesh: undefined};


function createRider(){
  //TODO if I have time
}

var platMesh2;
export function createStairs(number){
  for(var i = 0; i < number; i++){
    var stair = createStair();
    stair.position.set(-43-i*3,2+i*3,0);
    scene.add(stair);

    if(Math.random() > 0.2){
      var numRocks = Math.round(Math.random()*4);
      for(var j = 0; j < numRocks; j++){
        var selector = Math.random();
        var selectedRock = rock1.mesh.clone();
        var scale = 1;
        scale = 2+Math.random()*3;
        scene.add(selectedRock);
        selectedRock.position.set(-45-i*3,2+i*3,10+Math.random()*130);
        selectedRock.scale.set(scale+Math.random()*0.6,scale+Math.random()*0.2,scale+Math.random()*0.6);
        selectedRock.rotation.set(Math.random(), Math.random(), Math.random());
      }

      var numRocks = Math.round(Math.random()*2);
      for(var j = 0; j < numRocks; j++){
        var selector = Math.random();
        var selectedRock = rock1.mesh.clone();
        var scale = 1;
        scale = 2+Math.random()*5;
        scene.add(selectedRock);
        selectedRock.position.set(-45-i*3,2+i*3,-11 -Math.random()*130);
        selectedRock.scale.set(scale+Math.random()*0.6,scale+Math.random()*0.2,scale+Math.random()*0.6);
        selectedRock.rotation.set(Math.random(), Math.random(), Math.random());
      }
    }


    // }
  }

  // var stairGeom = new THREE.BoxGeometry(3*Math.sqrt(2)*number,2,300, 1,1,1);
  // var stairMat = new THREE.MeshPhongMaterial({color: 0xd6ecef});
  // var stairMesh = new THREE.Mesh(stairGeom, stairMat)
  //
  // stairMesh.position.set(-50+(-number*3)/2,(number*3)/2,0);
  // stairMesh.rotation.set(0,0,-.78);
  // scene.add(stairMesh);

  generateHill(number*3, 10, 10);

  var platGeom4 = new THREE.BoxGeometry(300,2,300, 1,1,1);
  var platMat4 = new THREE.MeshPhongMaterial({color: 0xc5dbde});
  var platMesh4 = new THREE.Mesh(platGeom4, platMat4)
  platMesh4.position.set(-198-(number*3),(number*3)-2,0);
  scene.add(platMesh4);

}

function createStair(){
  return new THREE.Mesh(new THREE.BoxGeometry(3,3,15,1,1,1),
                        new THREE.MeshBasicMaterial({color: 0xd6ecef}));
}

export function createRocks(){
  var GLLoader = new THREE.GLTFLoader();
  var r1S = GLLoader.load("./blendermodels/PUSHILIN_boulder.gltf", handle_load1);

  var r2S = GLLoader.load("./blendermodels/Stone.gltf", handle_load2);

}

function handle_load1(gltf){
  rock1.mesh = gltf.scene.children[0];
}
function handle_load2(gltf){
  rock2.mesh = gltf.scene.children[0];
}
function handle_load3(gltf){
  rock3.mesh = gltf.scene.children[0];
}
function handle_load4(gltf){
  rock4.mesh = gltf.scene.children[0];
}

export function createTauntaun(){
    var GLLoader = new THREE.GLTFLoader();

    var tauntaunScene = GLLoader.load("./blendermodels/tauntaun.glb", handle_load);
}

function handle_load(gltf){

  Tauntaun.mesh = gltf.scene.children[0];
  scene.add(Tauntaun.mesh);
  Tauntaun.mesh.rotation.set(-1.57,0,-1.3);
  Tauntaun.mesh.scale.set(0.2,0.2,0.2);
  Tauntaun.mesh.position.set(-20,5,0);
  Tauntaun.mesh.material = new THREE.MeshPhongMaterial({color: 0x000000});
}

export function createPlatform(){
  // var platGeom = new THREE.BoxGeometry(100,2,300, 1,1,1);
  // var platMat = new THREE.MeshPhongMaterial({color: 0xc5dbde});
  //
  // scene.add(new THREE.Mesh(platGeom, platMat));
  //
  var platGeom2 = new THREE.BoxGeometry(100,2,100, 1,1,1);

  var platMat2 = new THREE.MeshPhongMaterial({color: 0xb4cacd});
  platMesh2 = new THREE.Mesh(platGeom2, platMat2)
  platMesh2.position.set(-82,35.35,0);
  platMesh2.rotation.set(0,0,-.78);
  scene.add(platMesh2);

  // let points = [new THREE.Vector3(0,15,0),new THREE.Vector3(20,15,0),new THREE.Vector3(20,15,20),new THREE.Vector3(0,15,20)];
  // let geometry = new ConvexGeometry( points );
  // let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  // let mesh = new THREE.Mesh( geometry, material );
  // scene.add( mesh );
  createFloor();

}

export function createSnowBackground(){
  var snowBGGeom = new THREE.BoxBufferGeometry(1000,1000,1000,1,1,1);
  var snowBGMat = new THREE.MeshBasicMaterial({color: 0x888888, side: THREE.BackSide});

  scene.add(new THREE.Mesh(snowBGGeom, snowBGMat));
}

export function createSnow(){
  var snowCount = 1000;


  for(var i = 0; i < snowCount; i++){
    var currentSnowFlake = createSnowFlake();



    var xS = -100+Math.random()*200;
    var yS = -100+Math.random()*200;
    var zS = -100+Math.random()*200;



    currentSnowFlake.position.set(xS,yS,zS);
    snowObj.add(currentSnowFlake);
    scene.add(snowObj);
  }
}

export function createSnowFlake(){
  return new THREE.Mesh(new THREE.BoxGeometry(1,1,1,1,1,1),
                        new THREE.MeshBasicMaterial({color: 0xfafafa}));
}


//createWhiteTransition
export function createWhiteTransition(){
  var whiteSlate = new THREE.Mesh(new THREE.SphereBufferGeometry(4.9,10,10), new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.BackSide}));
  scene.add(whiteSlate);
}

//main menu screen creation
export function createHothPlanet(){

  var loader = new THREE.TextureLoader();
  var texture = loader.load("textures/hoth_surface_bluer_moresnow.png");
  var sphereMesh = new THREE.SphereBufferGeometry(5,100,100);
  var sphereMat = new THREE.MeshLambertMaterial({color: 0xfafafa, map: texture});

  scene.add(new THREE.Mesh(sphereMesh, sphereMat));
}


export function createSpace(){
  var spaceMesh = new THREE.BoxBufferGeometry(1000,1000,1000,1,1,1);
  var spaceMat = new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.BackSide});

  scene.add(new THREE.Mesh(spaceMesh, spaceMat));
}

export function createStars(){
  var starCount = 500


  for(var i = 0; i < starCount; i++){
    var currentStar = createStar();



    var xS = -200+Math.random()*400;
    var yS = -200+Math.random()*400;
    var zS = -200+Math.random()*400;

    while(Math.sqrt(xS*xS+yS*yS+zS*zS) < 100){
      xS = -200+Math.random()*400;
      yS = -200+Math.random()*400;
      zS = -200+Math.random()*400;
    }

    currentStar.position.set(xS,yS,zS);
    scene.add(currentStar);
  }
}


function createStar(){
  var sides = 4+Math.random()*3
  return new THREE.Mesh(new THREE.SphereBufferGeometry(.75,sides,sides),
                        new THREE.MeshBasicMaterial({color: 0xfafafa}));
}

export {platMesh2, Tauntaun}
