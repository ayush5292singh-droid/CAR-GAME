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

renderer.render(
scene,
camera
);

}


animate();
