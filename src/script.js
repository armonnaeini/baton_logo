

const renderer = new THREE.WebGLRenderer({ canvas : document.getElementById('canvas'), antialias:true, alpha: true});
var effect = new THREE.AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
				// effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );

renderer.setClearColor( 0xffffff, 0);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 1.9;
var light = new THREE.AmbientLight( 0xffffff, .1 );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);
const circleTexture = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");


var c = document.createElement("canvas");
c.width = 128;
c.height = 128;
var ctx = c.getContext("2d");
ctx.clearRect(0, 0, 128, 128);
ctx.fillStyle = "white";
ctx.beginPath();
ctx.arc(64, 64, 64, 0, 2 * Math.PI);
ctx.fill();
var tex = new THREE.CanvasTexture(c);
let material2 = new THREE.PointsMaterial({ color: 0x626262, size: .003,map: tex,  alphaMap: tex,
  alphaTest: .1 });

 
var params = {
  radius: 3,
  tube: 1,
  radialSegments: 512, //lower this for optimizing
  tubularSegments: 120,
  p: 1, // shape
  q: 2, // shape
  heightScale: 2
};

var geometry = new THREE.TorusKnotGeometry(
  params.radius,
  params.tube,
  params.radialSegments,
  params.tubularSegments,
  params.p,
  params.q,
  params.heightScale
);


const sphere = new THREE.Points(geometry, material2);
scene.add(sphere);
			window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
				
				camera.aspect = window.innerWidth/ window.innerHeight;

				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );

}


const update = function() {

  // change '0.003' for more aggressive animation
  const time = performance.now() * 0.00015;
  
  // change 'k' value for more spikes
  const k = 2.1
  
  for (var i = 0; i < sphere.geometry.vertices.length; i+=1) {

      const p = sphere.geometry.vertices[i];
      p.normalize().multiplyScalar(.85 + .4 * noise.perlin3(p.x * k - time, p.y * k, p.z* k/2));

  }
  
  sphere.geometry.computeVertexNormals();
  sphere.geometry.normalsNeedUpdate = true;
  sphere.geometry.verticesNeedUpdate = true;

}

function animate() {
  sphere.rotation.x += 0.00045;
  sphere.rotation.y += 0.00045;

  update();
  /* render scene and camera */
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}


requestAnimationFrame(animate);