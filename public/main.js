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