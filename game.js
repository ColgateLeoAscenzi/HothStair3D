//COLORS
var Colors = {
    skyBlue: 0x86ebcc,
    ground: 0x332609,
    golden: 0xebaf2a,
    white: 0xffffff,
    grey: 0xc7c9c8
};

// THREEJS RELATED VARIABLES

var camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container, scene;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var controls;
var loader = new THREE.TextureLoader();


//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH

var cameraMoving = false;
var cameraStage = -1;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createCameraRender() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
  //
  camera.position.x = 20;
  camera.position.z = 20;
  camera.position.y = 20;

  camera.lookAt(0,0,0);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container = document.getElementById('glcanvas');
  container.appendChild(renderer.domElement);


  window.addEventListener('resize', handleWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mousedown', onMouseDown, false);

  scene = new THREE.Scene();

  createWorld();

}

// HANDLE SCREEN EVENTS
function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

var then = Date.now();
var now = 0;
var delta = -1;
//THIS IS THE GAME LOOP
function loop() {

  now= Date.now();
  delta = (now-then)*0.01;
  then = now;

  renderer.render(scene, camera);
  requestAnimationFrame(loop);


  if(cameraMoving){
    if(cameraStage == 1){
      console.log("here")
      if(camera.position.x > 10 && camera.position.y > 10 && camera.position.z > 10){
        var cameraSpeed = 10*0.012*delta;
        camera.position.set(camera.position.x-cameraSpeed,camera.position.y-cameraSpeed,camera.position.z-cameraSpeed);
      }
      else{
        cameraStage = 2;
      }
    }
    if(cameraStage == 2){

    }
  }

}

function initGame() {
  THREEx.FullScreen.bindKey({ charCode : 'l'.charCodeAt(0) });
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
  createCameraRender();
}


function createWorld(){

  createSpace();
  createStars();

  createHothPlanet();
  //var hothPlanet = createHothPlanet();
  //scene.add(hothPlanet);

  var planetLight = new THREE.PointLight(0xddddff, 1.2, 100);
  planetLight.position.set(15,5,30);
  scene.add(planetLight);


  loop();
}
