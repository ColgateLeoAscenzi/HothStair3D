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
  camera.position.z = 0;
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
var curPI = 0;


//THIS IS THE GAME LOOP
function loop() {

  now= Date.now();
  delta = (now-then)*0.01;
  then = now;

  renderer.render(scene, camera);
  requestAnimationFrame(loop);


  if(cameraMoving){
    // var points = [[10,10,10],[0,9,10],[-10,8,10],[-10,7,0], [-10,6,-10], [0,5,-10],[10,4,-10],[10,3,0],[10,2,10]];
    var points = genCircle();
    var currentPoint;
    var movements;
    var target;
    var cameraSpeed = 0;
    var camSmoothing = 1;

    if(cameraStage == 1){
      cameraSpeed = 6*0.12*delta;
      camSmoothing = 2;
      //point close to planet
      target = new THREE.Vector3(10, 10, 0);
      movements = moveTowardPoint(camera, target.x, target.y, target.z);
      camera.lookAt(0,0,0);
      if(!movements[0] && !movements[1] && !movements[2]){
        cameraStage = 2;
      }

      if(movements[0]){
        if(camera.position.x < target.x){
          camera.position.x += cameraSpeed*(Math.abs(target.x-camera.position.x)/camSmoothing);
        }
        else{
          camera.position.x -= cameraSpeed*(Math.abs(target.x-camera.position.x)/camSmoothing);
        }
      }
      if(movements[1]){
        if(camera.position.y < target.y){
          camera.position.y += cameraSpeed*(Math.abs(target.y-camera.position.y)/camSmoothing);
        }
        else{
          camera.position.y -= cameraSpeed*(Math.abs(target.y-camera.position.y)/camSmoothing);
        }
      }
      if(movements[2]){
        if(camera.position.z < target.z){
          camera.position.z += cameraSpeed*(Math.abs(target.z-camera.position.z)/camSmoothing);
        }
        else{
          camera.position.z -= cameraSpeed*(Math.abs(target.z-camera.position.z)/camSmoothing);
        }
      }

    }
    if(cameraStage == 2){
      cameraSpeed = 100*0.12*delta;
      camSmoothing = 2;
      target = new THREE.Vector3(points[curPI][0],points[curPI][1],points[curPI][2]);

      movements = moveTowardPoint(camera, target.x, target.y, target.z);


      if(!movements[0] && !movements[1] && !movements[2]){
        curPI+=1;
      }

      if(movements[0]){
        if(camera.position.x < target.x){
          camera.position.x += cameraSpeed*(Math.abs(target.x-camera.position.x)/camSmoothing);
        }
        else{
          camera.position.x -= cameraSpeed*(Math.abs(target.x-camera.position.x)/camSmoothing);
        }
      }
      if(movements[1]){
        if(camera.position.y < target.y){
          camera.position.y += cameraSpeed*(Math.abs(target.y-camera.position.y)/camSmoothing);
        }
        else{
          camera.position.y -= cameraSpeed*(Math.abs(target.y-camera.position.y)/camSmoothing);
        }
      }
      if(movements[2]){
        if(camera.position.z < target.z){
          camera.position.z += cameraSpeed*(Math.abs(target.z-camera.position.z)/camSmoothing);
        }
        else{
          camera.position.z -= cameraSpeed*(Math.abs(target.z-camera.position.z)/camSmoothing);
        }
      }


      if(curPI == 80){
        createWhiteTransition();
      }

      camera.lookAt(0,0,0);

      if(curPI >= points.length){
        cameraStage = 3;
      }

    }
    if(cameraStage == 3){
      console.log(camera.position);

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
  planetLight.position.set(15,5,10);
  scene.add(planetLight);


  loop();
}
