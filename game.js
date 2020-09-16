function climbingStairs(totalSteps){
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

var snowObj;

var tick = 0;

var differentChoices;


//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH

var cameraMoving = false;
var cameraStage = -1;


var mediaElement;
var playingM = false;

var Tauntaun;
var Rider;
var n;

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

gameStage = 0

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


  if(cameraMoving){
    // var points = [[10,10,10],[0,9,10],[-10,8,10],[-10,7,0], [-10,6,-10], [0,5,-10],[10,4,-10],[10,3,0],[10,2,10]];

    var currentPoint;
    var movements;
    var target;
    var cameraSpeed = 0;
    var camSmoothing = 1;

    if(cameraStage == 1){
      cameraSpeed = 6*0.12*delta;
      // cameraSpeed = 600*0.12*delta;

      camSmoothing = 2;
      //point close to planet
      target = new THREE.Vector3(10, 10, 0);
      movements = moveTowardPoint(camera, target.x, target.y, target.z, 0.1);
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
      // cameraSpeed = 600*0.12*delta;

      camSmoothing = 2;
      target = new THREE.Vector3(points[curPI][0],points[curPI][1],points[curPI][2]);

      movements = moveTowardPoint(camera, target.x, target.y, target.z,0.1);


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



      camera.lookAt(0,0,0);

      if(curPI >= points.length){
        cameraStage = 3;
      }

    }
    if(cameraStage == 3){
      createWhiteTransition();
      cameraMoving = false;
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


      var container = document.getElementById("container");
      var modalDiv = document.createElement("div");
      modalDiv.class = "modal";
      modalDiv.innerHTML = '<div class="modal-content" id = "introModal"><div class="modal-header"><h2>Welcome to Climb-I-Must</h2></div><div class="modal-body"><p>You\'re a rebel scout on the ice planet, Hoth. While killing time waiting for the Empire to find your base, you ride your trusty Tauntaun around the plant. </p>'+
                          '<p>You wander upon a very tall ice staircase leading up a mountainside that takes n steps to reach.</p><p>Having plenty of time on your hands, you decide you want to figure out how many ways are there to reach the top.</p>'+
                          '<p>The catch is that for each step, your Tauntauan can only climb 1 or 2 steps at a given time.</p>'+'<p>Luckily, if you tell me how tall that staircase is, HQ can run a calculation and tell you how many ways there are!</p>'+
                          '<div class="modal-footer1" id = "closeButton"><h3>Next</h3></div>';
      container.appendChild(modalDiv)


      var modal = document.getElementById("introModal");

      modal.style.display = "block";

      var close = document.getElementById("closeButton");


      close.onclick = function(event) {
          modal.parentNode.removeChild(modal);
        //  modal.style.display = "none";
          modalDiv = document.createElement("div");
          modalDiv.class = "modal";
          modalDiv.innerHTML = '<div class="modal-content" id = "introModal"><div class="modal-header"><h2>How Many Steps Are There?</h2></div><div class="modal-body"><p><input id = "numStairs" type = "text"></p>'+
                              '<div class="modal-footer1" id = "closeButton"><h3>Submit</h3></div>';
          container.appendChild(modalDiv)
          modal = document.getElementById("introModal");
          close = document.getElementById("closeButton");

          close.onclick =function(event){
            modal.style.display = "none"
            var answer = document.getElementById("numStairs");
            n = parseInt(answer.value);

            console.log(n);
            differentChoices = climbingStairs(n);
            console.log(differentChoices);
            scene.remove(platMesh2);
            createStairs(n);
            cameraStage = 4;
            cameraMoving = true;
            gameStage = 3;

            createStats();


          }
      }


    }

    if(cameraStage == 4){


      cameraSpeed = 7*0.12*delta;
      camSmoothing = 2;
      target = new THREE.Vector3(Tauntaun.position.x+16,Tauntaun.position.y+20, Tauntaun.position.z-20);

      movements = moveTowardPoint(camera, target.x, target.y, target.z,0.1);


      if(!movements[0] && !movements[1] && !movements[2]){
        cameraStage = 5;
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

      if(!basicDebugCam){
        camera.lookAt(Tauntaun.position);
      }


    }
    if(cameraStage == 5){
      if(!basicDebugCam){
        camera.position.set(Tauntaun.position.x+16,Tauntaun.position.y+20, Tauntaun.position.z-20);
        camera.lookAt(Tauntaun.position);
      }
      if(Tauntaun.rotation.z < 1.57){
        Tauntaun.rotation.z += 0.01;
      }
      else{
        cameraStage = 6;
      }
    }
    if(cameraStage == 6){
      if(!basicDebugCam){
        camera.position.set(Tauntaun.position.x+16,Tauntaun.position.y+20, Tauntaun.position.z-20);
        camera.lookAt(Tauntaun.position);
      }
      if(Tauntaun.position.x > -40){
        Tauntaun.position.x-=0.05;
        Tauntaun.rotation.x=-1.57+0.1*Math.sin(tick*0.1);
      }
      else{
        cameraStage = 7;
        currStep = 0;
        curPI = 0;
      }
    }
    if(cameraStage == 7){
      updateStats();
      if(!basicDebugCam){
        camera.position.set(Tauntaun.position.x+16,Tauntaun.position.y+20, Tauntaun.position.z-20);
        camera.lookAt(Tauntaun.position);
      }
      cameraSpeed = 14*0.12*delta;
      camSmoothing = 2;

      if(!jumping){
        console.log("Steps left: "+(n-currStep));
        if(currStep >= n){
          cameraStage = 8;
        }
        if(currStep == 0){
          console.log(1);
          points = parabolicJump(-40,-43,10);
          points.push([-43,3+5,0])
          jumping = true;
          currStep+=1
        }
        else{
          if(n - currStep == 2){
            points = parabolicJumpH(Tauntaun.position.x,Tauntaun.position.y,2);
            points.push([Math.round(Tauntaun.position.x-6),Math.round(Tauntaun.position.y+6),0])
            jumping = true;
            console.log(2);
            currStep+=2
          }
          else if(n - currStep == 1){
            points = parabolicJumpH(Tauntaun.position.x,Tauntaun.position.y,1);
            points.push([Math.round(Tauntaun.position.x-3),Math.round(Tauntaun.position.y+3),0])
            jumping = true;
            console.log(1);
            currStep+=1
          }
          else{
            var jumpHeight = 1+Math.round(Math.random());
            points = parabolicJumpH(Tauntaun.position.x,Tauntaun.position.y,jumpHeight);
            points.push([Math.round(Tauntaun.position.x-3*(jumpHeight)),Math.round(Tauntaun.position.y+3*(jumpHeight)),0])
            jumping = true;
            console.log(jumpHeight);
            currStep+=jumpHeight;
          }

        }


      }

      target = new THREE.Vector3(points[curPI][0],points[curPI][1],points[curPI][2]);
      movements = moveTowardPoint(Tauntaun, target.x, target.y, target.z,0.1);


      if(!movements[0] && !movements[1] && !movements[2]){
        curPI+=1;
      }
      if(movements[0]){
        if(Tauntaun.position.x < target.x){
          Tauntaun.position.x += cameraSpeed*(Math.abs(target.x-Tauntaun.position.x)/camSmoothing);
        }
        else{
          Tauntaun.position.x -= cameraSpeed*(Math.abs(target.x-Tauntaun.position.x)/camSmoothing);
        }
      }
      if(movements[1]){
        if(Tauntaun.position.y < target.y){
          Tauntaun.position.y += cameraSpeed*(Math.abs(target.y-Tauntaun.position.y)/camSmoothing);
        }
        else{
          Tauntaun.position.y -= cameraSpeed*(Math.abs(target.y-Tauntaun.position.y)/camSmoothing);
        }
      }
      if(movements[2]){
        if(Tauntaun.position.z < target.z){
          Tauntaun.position.z += cameraSpeed*(Math.abs(target.z-Tauntaun.position.z)/camSmoothing);
        }
        else{
          Tauntaun.position.z -= cameraSpeed*(Math.abs(target.z-Tauntaun.position.z)/camSmoothing);
        }
      }


      if(curPI == points.length){
        jumping = false;
        curPI = 0;
      }


    }

    if(cameraStage == 8){
      console.log("MADE IT");
    }

  }


  if(snowObj){
    snowObj.position = camera.position;
    snowObj.rotation.x+=0.002+Math.random()*0.003;
    snowObj.rotation.y+=0.002+Math.random()*0.002;
    snowObj.rotation.z+=0.002+Math.random()*0.001;
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

  createBanner();

  loop();
}
