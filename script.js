// Create scene

let scene = new THREE.Scene();


// Camera

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);


// Renderer

let renderer = new THREE.WebGLRenderer();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(renderer.domElement);


// Light

let light = new THREE.DirectionalLight(
0xffffff,
1
);

light.position.set(5,10,5);

scene.add(light);


// Ground

let groundGeometry =
new THREE.PlaneGeometry(200,200);


let groundMaterial =
new THREE.MeshPhongMaterial({
color:0x228B22
});


let ground =
new THREE.Mesh(
groundGeometry,
groundMaterial
);


ground.rotation.x = -Math.PI/2;


scene.add(ground);
// ROAD

let roadGeometry = new THREE.PlaneGeometry(
8,
200
);


let roadMaterial = new THREE.MeshPhongMaterial({
color:0x333333
});


let road = new THREE.Mesh(
roadGeometry,
roadMaterial
);


road.rotation.x = -Math.PI/2;

road.position.y = 0.02;

scene.add(road);



// ROAD LINES

for(let i=0;i<20;i++){

let lineGeometry =
new THREE.BoxGeometry(
0.2,
0.02,
5
);


let lineMaterial =
new THREE.MeshBasicMaterial({
color:0xffffff
});


let line =
new THREE.Mesh(
lineGeometry,
lineMaterial
);


line.position.set(
0,
0.04,
-i*10
);


scene.add(line);

}



// TREES

function createTree(x,z){

let trunkGeometry =
new THREE.CylinderGeometry(
0.2,
0.2,
2
);


let trunkMaterial =
new THREE.MeshPhongMaterial({
color:0x8B4513
});


let trunk =
new THREE.Mesh(
trunkGeometry,
trunkMaterial
);


trunk.position.set(
x,
1,
z
);


scene.add(trunk);



let leavesGeometry =
new THREE.SphereGeometry(
1
);


let leavesMaterial =
new THREE.MeshPhongMaterial({
color:0x00aa00
});


let leaves =
new THREE.Mesh(
leavesGeometry,
leavesMaterial
);


leaves.position.set(
x,
2.3,
z
);


scene.add(leaves);

}


// Add trees

for(let i=0;i<20;i++){

createTree(
-6,
-i*10
);

createTree(
6,
-i*10
);

}

// Camera position

camera.position.set(
0,
5,
12
);


camera.lookAt(0,0,0);
// CAR

let car = new THREE.Group();


// Car body

let bodyGeometry = new THREE.BoxGeometry(
2,
0.6,
4
);


let bodyMaterial = new THREE.MeshPhongMaterial({
color:0xff0000
});


let body = new THREE.Mesh(
bodyGeometry,
bodyMaterial
);


body.position.y = 0.6;

car.add(body);


// Wheels

function createWheel(x,z){

let wheelGeometry =
new THREE.CylinderGeometry(
0.4,
0.4,
0.3,
32
);


let wheelMaterial =
new THREE.MeshPhongMaterial({
color:0x000000
});


let wheel =
new THREE.Mesh(
wheelGeometry,
wheelMaterial
);


wheel.rotation.z =
Math.PI/2;


wheel.position.set(
x,
0.4,
z
);


car.add(wheel);

}


// Add four wheels

createWheel(-1,-1.4);

createWheel(1,-1.4);

createWheel(-1,1.4);

createWheel(1,1.4);



// Add car to scene

scene.add(car);


// Car starting position

car.position.set(
0,
0,
0
);


// Animation

function animate(){

requestAnimationFrame(animate);


drive();
moveOpponents();

checkCollision();

camera.position.z =
car.position.z + 12;


camera.position.x =
car.position.x;


camera.lookAt(car.position);

updateGame();
  
renderer.render(
scene,
camera
);

}


animate();
// CAR CONTROLS


let speed = 0.05;


// Move left

function moveLeft(){

car.position.x -= 0.5;

}


// Move right

function moveRight(){

car.position.x += 0.5;

}


// Increase speed

function speedUp(){

speed += 0.02;

}



// Car forward movement

function drive(){

car.position.z -= speed;

}
let gameStarted=false;

let gameTime=0;

let score=0;



function startGame(){

gameStarted=true;

gameTime=0;

score=0;

}



// Game information update

function updateGame(){

if(gameStarted){

gameTime += 1/60;

score += 1;

}


document.getElementById("time").innerHTML =
Math.floor(gameTime);


document.getElementById("score").innerHTML =
score;


document.getElementById("speed").innerHTML =
Math.floor(speed*100);

}
// OPPONENT CARS

let opponents=[];


function createOpponent(z){

let enemy =
new THREE.Mesh(

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


// Create opponents

createOpponent(-40);

createOpponent(-80);

createOpponent(-120);



// Move opponents

function moveOpponents(){

opponents.forEach(function(enemy){


enemy.position.z += 0.05;



if(enemy.position.z > car.position.z + 10){

enemy.position.z =
car.position.z - 100;

}


});


}



// Collision check

function checkCollision(){


opponents.forEach(function(enemy){


let distance =
car.position.distanceTo(
enemy.position
);



if(distance < 2){

speed = 0;


alert("Crash! Try again 🚗💥");


}


});


}
