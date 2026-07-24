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
10
);


camera.lookAt(0,0,0);



// Animation

function animate(){

requestAnimationFrame(animate);

renderer.render(
scene,
camera
);

}


animate();
