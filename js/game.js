import {handleKeyUp, handleKeyDown, onMouseDown, onMouseMove} from "./input.js"
import {createStairs, createSpace, createSnow, createTauntaun, createWhiteTransition,createPlatform, createHothPlanet, createStars, createSnowBackground, Tauntaun, createRocks} from "./models.js";
import {genCircle, moveTowardPoint} from "./cameramovements.js";
import {parabolicJump, parabolicJumpH, moveObjectTo, createBanner, createStats, updateStats, createInputModal} from "./helpers.js";

export function climbingStairs(totalSteps){
  var history = [];

  for(var i = 0; i < totalSteps+1; i++){
    if(i == 0 || i == 1){
      history.push(1);
    }
    else{
      history.push(history[i-1]+history[i-2]);
    }
  }

  return history[history.length-1];
}

// THREEJS RELATED VARIABLES

var camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container, scene;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var controls;
var loader = new THREE.TextureLoader();

var snowObj = new THREE.Object3D();

var tick = 0;

var differentChoices;


//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH

var cameraData = {cameraMoving: false, cameraStage: -1};


var mediaElement;
var radio = {playingM: false}

var Rider;
var stepNum = {n: 0, differentChoices: 0};

var basicDebugCam = false;
var controls;

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
  if(basicDebugCam){
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();
  }


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
var points = genCircle();
points.push(0,0,0);
var currStep = 0;
var jumping = false;


var listener = new THREE.AudioListener();
var audio = new THREE.Audio( listener );

mediaElement = new Audio("sounds/windbackground.mp3");
mediaElement.loop = true;

var gameStage = {stage: 0};


//THIS IS THE GAME LOOP
function loop() {
  tick+=1;
  if(tick > 1000){
    tick = tick%1000;
  }
  if(basicDebugCam){
    controls.update();

  }
  now= Date.now();
  delta = (now-then)*0.01;
  then = now;

  renderer.render(scene, camera);
  requestAnimationFrame(loop);


  if(cameraData.cameraMoving){
    //trying to move out of loop
    var currentPoint;
    var movements;
    var newPos;
    var values;
    var target;
    var cameraSpeed = 0;
    var camSmoothing = 1;

    if(cameraData.cameraStage == 1){
      //camera variables
      cameraSpeed = 6*0.12*delta;
      camSmoothing = 2;
      //select target
      target = new THREE.Vector3(10, 10, 0);
      //move object and return if needed to move and new position
      values = moveObjectTo(camera, target.x, target.y, target.z, 0.1, cameraSpeed, camSmoothing);
      movements = values[0];
      newPos = values[1];
      //set new position and view
      camera.position.set(newPos.x, newPos.y, newPos.z);
      camera.lookAt(0,0,0);
      //check if it's moved where it needs, update camera
      if(!movements[0] && !movements[1] && !movements[2]){
        cameraData.cameraStage = 2;
      }

    }

    if(cameraData.cameraStage == 2){
      cameraSpeed = 100*0.12*delta;
      camSmoothing = 2;

      target = new THREE.Vector3(points[curPI][0],points[curPI][1],points[curPI][2]);

      values = moveObjectTo(camera, target.x, target.y, target.z, 0.1, cameraSpeed, camSmoothing);
      movements = values[0];
      newPos = values[1];
      camera.position.set(newPos.x, newPos.y, newPos.z);
      camera.lookAt(0,0,0);

      if(!movements[0] && !movements[1] && !movements[2]){
        curPI+=1;
      }

      if(curPI >= points.length){
        cameraData.cameraStage = 3;
      }
    }

    if(cameraData.cameraStage == 3){
      createWhiteTransition();
      cameraData.cameraMoving = false;
      scene = new THREE.Scene();
      camera.position.set(10,14,0);
      camera.lookAt(-20,0,0);

      var gameLight = new THREE.AmbientLight(0xddddff, 1.2, 100);
      gameLight.position.set(15,5,0);
      scene.add(gameLight);

      createSnowBackground();
      createPlatform();
      createSnow();
      createTauntaun();
      createInputModal();
      createRocks();
    }

    if(cameraData.cameraStage == 4){
      cameraSpeed = 7*0.12*delta;
      camSmoothing = 2;
      target = new THREE.Vector3(Tauntaun.mesh.position.x+16,Tauntaun.mesh.position.y+20, Tauntaun.mesh.position.z-20);

      values = moveObjectTo(camera, target.x, target.y, target.z, 0.1, cameraSpeed, camSmoothing);
      movements = values[0];
      newPos = values[1];
      camera.position.set(newPos.x, newPos.y, newPos.z);

      if(!basicDebugCam){
        camera.lookAt(Tauntaun.mesh.position);
      }

      if(!movements[0] && !movements[1] && !movements[2]){
        cameraData.cameraStage = 5;
      }
    }
    //Tauntaun.mesh turns away
    if(cameraData.cameraStage == 5){
      if(!basicDebugCam){
        camera.position.set(Tauntaun.mesh.position.x+16,Tauntaun.mesh.position.y+20, Tauntaun.mesh.position.z-20);
        camera.lookAt(Tauntaun.mesh.position);
      }
      if(Tauntaun.mesh.rotation.z < 1.57){
        Tauntaun.mesh.rotation.z += 0.01*2;
      }
      else{
        cameraData.cameraStage = 6;
      }
    }
    //Tauntaun.mesh waddles to staircase
    if(cameraData.cameraStage == 6){
      if(!basicDebugCam){
        camera.position.set(Tauntaun.mesh.position.x+16,Tauntaun.mesh.position.y+20, Tauntaun.mesh.position.z-20);
        camera.lookAt(Tauntaun.mesh.position);
      }
      if(Tauntaun.mesh.position.x > -40){
        Tauntaun.mesh.position.x-=0.05*2;
        Tauntaun.mesh.rotation.x=-1.57+0.1*Math.sin(tick*0.1)*2;
      }
      else{
        cameraData.cameraStage = 7;
        currStep = 0;
        curPI = 0;
      }
    }

    //Tauntaun.mesh begins jumping
    if(cameraData.cameraStage == 7){
      updateStats();
      if(!basicDebugCam){
        camera.position.set(Tauntaun.mesh.position.x+16,Tauntaun.mesh.position.y+20, Tauntaun.mesh.position.z-20);
        camera.lookAt(Tauntaun.mesh.position);
      }
      cameraSpeed = 14*0.12*delta;
      camSmoothing = 2;

      if(!jumping){
        console.log("Steps left: "+(stepNum.n-currStep));
        if(currStep >= stepNum.n){
          cameraData.cameraStage = 8;
        }
        if(currStep == 0){
          console.log(1);
          points = parabolicJump(-40,-43,10);
          points.push([-43,3+5,0])
          jumping = true;
          currStep+=1
        }
        else{
          if(stepNum.n - currStep == 2){
            points = parabolicJumpH(Tauntaun.mesh.position.x,Tauntaun.mesh.position.y,2);
            points.push([Math.round(Tauntaun.mesh.position.x-6),Math.round(Tauntaun.mesh.position.y+6),0])
            jumping = true;
            console.log(2);
            currStep+=2
          }
          else if(stepNum.n - currStep == 1){
            points = parabolicJumpH(Tauntaun.mesh.position.x,Tauntaun.mesh.position.y,1);
            points.push([Math.round(Tauntaun.mesh.position.x-3),Math.round(Tauntaun.mesh.position.y+3),0])
            jumping = true;
            console.log(1);
            currStep+=1
          }
          else{
            var jumpHeight = 1+Math.round(Math.random());
            points = parabolicJumpH(Tauntaun.mesh.position.x,Tauntaun.mesh.position.y,jumpHeight);
            points.push([Math.round(Tauntaun.mesh.position.x-3*(jumpHeight)),Math.round(Tauntaun.mesh.position.y+3*(jumpHeight)),0])
            jumping = true;
            console.log(jumpHeight);
            currStep+=jumpHeight;
          }
        }
      }

      target = new THREE.Vector3(points[curPI][0],points[curPI][1],points[curPI][2]);

      values = moveObjectTo(Tauntaun.mesh, target.x, target.y, target.z, 0.1, cameraSpeed, camSmoothing);
      movements = values[0];
      newPos = values[1];
      Tauntaun.mesh.position.set(newPos.x, newPos.y, newPos.z);

      if(!movements[0] && !movements[1] && !movements[2]){
        curPI+=1;
      }

      if(curPI == points.length){
        jumping = false;
        curPI = 0;
      }
    }
    //Tauntaun.mesh runs away
    if(cameraData.cameraStage == 8){
      if(Tauntaun.mesh.position.x > -43-stepNum.n*3-10){
        Tauntaun.mesh.position.x-=0.05*2;
        Tauntaun.mesh.rotation.x=-1.57+0.1*Math.sin(tick*0.1)*2;
      }
      else{
        cameraData.cameraStage = 9;
      }
    }
    //Tauntaun.mesh turns back
    if(cameraData.cameraStage == 9){
      if(Tauntaun.mesh.rotation.z > -1.1){
        Tauntaun.mesh.rotation.z -= 0.01*2;
      }
      else{
        cameraData.cameraStage = 10;
      }
    }
    //Tauntaun.mesh dances
    if(cameraData.cameraStage == 10){
      Tauntaun.mesh.rotation.x=-1.57+0.1*Math.sin(tick*0.1)*2;
    }

  }


  if(snowObj){
    snowObj.position.set(camera.position.x,camera.position.y,camera.position.z);
    snowObj.rotation.x+=(0.002+Math.random()*0.003*delta)/0.1;
    snowObj.rotation.y+=(0.002+Math.random()*0.002*delta)/0.1;
    snowObj.rotation.z+=(0.002+Math.random()*0.001*delta)/0.1;
  }

}

export function initGame() {
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

  createBanner();

  loop();
}

export {gameStage, scene, mouse, mediaElement, radio, cameraData, snowObj, stepNum, differentChoices, currStep}
