// 3D RACING GAME - FINAL SCRIPT
// PART A


let scene = new THREE.Scene();

scene.background = new THREE.Color(0x87CEEB);


// CAMERA

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);


// RENDERER

let renderer = new THREE.WebGLRenderer();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(renderer.domElement);


// LIGHT

let light = new THREE.DirectionalLight(
0xffffff,
1
);

light.position.set(5,10,5);

scene.add(light);


// GROUND

let ground = new THREE.Mesh(

new THREE.PlaneGeometry(200,200),

new THREE.MeshPhongMaterial({
color:0x228B22
})

);

ground.rotation.x = -Math.PI/2;

scene.add(ground);



// ROAD

let road = new THREE.Mesh(

new THREE.PlaneGeometry(8,200),

new THREE.MeshPhongMaterial({
color:0x333333
})

);

road.rotation.x = -Math.PI/2;

road.position.y = 0.02;

scene.add(road);



// ROAD LINES

for(let i=0;i<20;i++){

let line = new THREE.Mesh(

new THREE.BoxGeometry(
0.2,
0.02,
5
),

new THREE.MeshBasicMaterial({
color:0xffffff
})

);


line.position.set(
0,
0.04,
-i*10
);


scene.add(line);

}



// TREE FUNCTION

function createTree(x,z){

let trunk = new THREE.Mesh(

new THREE.CylinderGeometry(
0.2,
0.2,
2
),

new THREE.MeshPhongMaterial({
color:0x8B4513
})

);


trunk.position.set(
x,
1,
z
);


scene.add(trunk);



let leaves = new THREE.Mesh(

new THREE.SphereGeometry(1),

new THREE.MeshPhongMaterial({
color:0x00aa00
})

);


leaves.position.set(
x,
2.3,
z
);


scene.add(leaves);

}


// TREES

for(let i=0;i<20;i++){

createTree(-6,-i*10);

createTree(6,-i*10);

}


// CITY BUILDINGS

function createBuilding(x,z){

let height = Math.random()*8+3;


let building = new THREE.Mesh(

new THREE.BoxGeometry(
3,
height,
3
),

new THREE.MeshPhongMaterial({
color:0x777777
})

);


building.position.set(
x,
height/2,
z
);


scene.add(building);

}


for(let i=0;i<30;i++){

createBuilding(-12,-i*8);

createBuilding(12,-i*8);

}
// PART B


// CAR

let car = new THREE.Group();


let body = new THREE.Mesh(

new THREE.BoxGeometry(
2,
0.6,
4
),

new THREE.MeshPhongMaterial({
color:0xff0000
})

);


body.position.y = 0.6;

car.add(body);



function createWheel(x,z){

let wheel = new THREE.Mesh(

new THREE.CylinderGeometry(
0.4,
0.4,
0.3,
32
),

new THREE.MeshPhongMaterial({
color:0x000000
})

);


wheel.rotation.z = Math.PI/2;


wheel.position.set(
x,
0.4,
z
);


car.add(wheel);

}



createWheel(-1,-1.4);

createWheel(1,-1.4);

createWheel(-1,1.4);

createWheel(1,1.4);



scene.add(car);


car.position.set(0,0,0);



// CAMERA

camera.position.set(
0,
5,
12
);



// GAME VARIABLES

let speed = 0.05;

let normalSpeed = 0.05;

let gameStarted = false;

let gameTime = 0;

let score = 0;



// CONTROLS

function moveLeft(){

if(gameStarted){

car.position.x -= 0.5;

}

}


function moveRight(){

if(gameStarted){

car.position.x += 0.5;

}

}


function speedUp(){

if(gameStarted){

speed += 0.02;

}

}



function nitro(){

if(gameStarted){

speed = 0.2;


setTimeout(function(){

speed = normalSpeed;

},3000);

}

}



// START

function startGame(){

gameStarted = true;


gameTime = 0;

score = 0;


let menu =
document.getElementById("menu");


if(menu){

menu.style.display="none";

}

}




// RESTART

function restartGame(){

car.position.set(
0,
0,
0
);


speed = normalSpeed;


gameTime = 0;

score = 0;

gameStarted = false;


let menu =
document.getElementById("menu");


if(menu){

menu.style.display="block";

}

}



// OPPONENT CARS

let opponents=[];


function createOpponent(z){

let enemy = new THREE.Mesh(

new THREE.BoxGeometry(
2,
0.6,
4
),

new THREE.MeshPhongMaterial({
color:0x0000ff
})

);


enemy.position.set(
0,
0.6,
z
);


scene.add(enemy);


opponents.push(enemy);

}



createOpponent(-40);

createOpponent(-80);

createOpponent(-120);




function moveOpponents(){

opponents.forEach(function(enemy){

enemy.position.z += 0.05;


if(enemy.position.z > car.position.z+10){

enemy.position.z = car.position.z-100;

}

});

}




function checkCollision(){

opponents.forEach(function(enemy){

let distance =
car.position.distanceTo(enemy.position);


if(distance < 2){

speed = 0;

alert("Crash! 🚗💥");

}

});

}




// SCORE SYSTEM

function updateGame(){

if(gameStarted){

gameTime += 1/60;

score++;

}


document.getElementById("time").innerHTML =
Math.floor(gameTime);


document.getElementById("score").innerHTML =
score;


document.getElementById("speed").innerHTML =
Math.floor(speed*100);

}



// MOVEMENT

function drive(){

if(gameStarted){

car.position.z -= speed;

}

}



// ANIMATION

function animate(){

requestAnimationFrame(animate);


drive();

moveOpponents();

checkCollision();

updateGame();



camera.position.z =
car.position.z+12;


camera.position.x =
car.position.x;


camera.lookAt(car.position);



renderer.render(
scene,
camera
);

}


animate();
