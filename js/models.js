function createRider(){
  //TODO if I have time
}
var platMesh2;
function createStairs(number){
  for(var i = 0; i < number; i++){
    var stair = createStair();
    stair.position.set(-43-i*3,2+i*3,0);
    scene.add(stair);
  }

  var platGeom3 = new THREE.BoxGeometry(3*Math.sqrt(2)*number,2,300, 1,1,1);
  var platMat3 = new THREE.MeshPhongMaterial({color: 0xd6ecef});
  var platMesh3 = new THREE.Mesh(platGeom3, platMat3)

  platMesh3.position.set(-50+(-number*3)/2,(number*3)/2,0);
  platMesh3.rotation.set(0,0,-.78);
  scene.add(platMesh3);

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

function createTauntaun(){
    var GLLoader = new THREE.GLTFLoader();

    var tauntaunScene = GLLoader.load("./blendermodels/tauntaun.glb", handle_load);

}

function handle_load(gltf){

  Tauntaun = gltf.scene.children[0];
  scene.add(Tauntaun);
  Tauntaun.rotation.set(-1.57,0,-1.3);
  Tauntaun.scale.set(0.2,0.2,0.2);
  Tauntaun.position.set(-20,5,0);
  Tauntaun.material = new THREE.MeshPhongMaterial({color: 0x000000});
}

function createPlatform(){
  var platGeom = new THREE.BoxGeometry(100,2,300, 1,1,1);
  var platMat = new THREE.MeshPhongMaterial({color: 0xc5dbde});

  scene.add(new THREE.Mesh(platGeom, platMat));

  var platGeom2 = new THREE.BoxGeometry(100,2,100, 1,1,1);
  var platMat2 = new THREE.MeshPhongMaterial({color: 0xd6ecef});
  platMesh2 = new THREE.Mesh(platGeom2, platMat2)
  platMesh2.position.set(-82,35.35,0);
  platMesh2.rotation.set(0,0,-.78);
  scene.add(platMesh2);

}

function createSnowBackground(){
  var snowBGGeom = new THREE.BoxBufferGeometry(1000,1000,1000,1,1,1);
  var snowBGMat = new THREE.MeshBasicMaterial({color: 0x888888, side: THREE.BackSide});

  scene.add(new THREE.Mesh(snowBGGeom, snowBGMat));
}

function createSnow(){
  var snowCount = 1000;
  snowObj = new THREE.Object3D();


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

function createSnowFlake(){
  return new THREE.Mesh(new THREE.BoxGeometry(1,1,1,1,1,1),
                        new THREE.MeshBasicMaterial({color: 0xfafafa}));
}


//createWhiteTransition
function createWhiteTransition(){
  var whiteSlate = new THREE.Mesh(new THREE.SphereBufferGeometry(4.9,10,10), new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.BackSide}));
  scene.add(whiteSlate);
}

//main menu screen creation
function createHothPlanet(){

  var loader = new THREE.TextureLoader();
  var texture = loader.load("textures/hoth_surface_bluer_moresnow.png");
  var sphereMesh = new THREE.SphereBufferGeometry(5,100,100);
  var sphereMat = new THREE.MeshLambertMaterial({color: 0xfafafa, map: texture});

  scene.add(new THREE.Mesh(sphereMesh, sphereMat));
}


function createSpace(){
  var spaceMesh = new THREE.BoxBufferGeometry(1000,1000,1000,1,1,1);
  var spaceMat = new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.BackSide});

  scene.add(new THREE.Mesh(spaceMesh, spaceMat));
}

function createStars(){
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