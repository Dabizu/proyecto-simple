import * as THREE from './three.module.js';
import {GLTFLoader} from './GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
/*
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );*/
//scene.add( cube );

camera.position.z = 5;

function animate() {
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
const loader = new GLTFLoader();
loader.load(
	// resource URL
	'persona.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
var tamanio=20;
//var geometry = THREE.CubeGeometry( 5, 5, 5 );
const geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true, wireframeLinewidth:10});

var mesh = new THREE.Mesh( geometry, material );
mesh.position.x=0;
mesh.position.y=0;
mesh.position.z=0;
scene.add( mesh );


// Crear el Raycaster y el vector del mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Función para actualizar la posición del mouse
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	//console.log("hola");
	
	raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects( scene.children );
	console.log(intersects)
	if (intersects.length > 0) {
		const color = new THREE.Color(0xff0000); // Color rojo
		console.log(intersects[0].object.material.color.set(color))
		console.log(intersects[0].face.color)
		/*
		intersects[0].face.color.set(Math.random() * 0xffffff);
		intersects[0].object.geometry.colorsNeedUpdate = true;*/
		/*
		const intersectedFace = intersects[0].face;
        const geometry = intersects[0].object.geometry;
        const color = new THREE.Color(0xff0000); // Color rojo
		const vertexIndex = intersectedFace.a;
		geometry.attributes.color.setXYZ(vertexIndex, color.r, color.g, color.b);*/
		/*
        // Cambiar el color de los vértices de la cara
        const faceIndices = ['a', 'b', 'c'];
        faceIndices.forEach((faceIndex) => {
            const vertexIndex = intersectedFace[faceIndex];
            geometry.attributes.color.setXYZ(vertexIndex, color.r, color.g, color.b);
        });*/
        //geometry.attributes.color.needsUpdate = true;
	}
}

// Añadir el evento de movimiento del mouse
window.addEventListener('click', onMouseMove, false);


// Función para detectar intersecciones y cambiar el color de la cara
function onMouseClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(mesh, true);

    if (intersects.length > 0) {
        const intersectedFace = intersects[0].face;
        const geometry = intersects[0].object.geometry;
        const color = new THREE.Color(0xff0000); // Color rojo

        // Cambiar el color de los vértices de la cara
        const faceIndices = ['a', 'b', 'c'];
        faceIndices.forEach((faceIndex) => {
            const vertexIndex = intersectedFace[faceIndex];
            geometry.attributes.color.setXYZ(vertexIndex, color.r, color.g, color.b);
        });

        geometry.attributes.color.needsUpdate = true;
    }
}

// Añadir el evento de clic del mouse
window.addEventListener('click', onMouseClick, false);
/*
// Crear la geometría y el material con colores de vértices
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ vertexColors: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);*/

// Inicializar los colores de los vértices
const colors = [];
for (let i = 0; i < geometry.attributes.position.count; i++) {
    colors.push(1, 1, 1); // Blanco
}
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

