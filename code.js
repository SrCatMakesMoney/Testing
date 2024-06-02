// Configuración básica de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Añadir luz
const light = new THREE.AmbientLight(0x404040);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Crear el suelo
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Crear un jugador (cubo) y un arma
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 0.5;

const weaponGeometry = new THREE.BoxGeometry(0.5, 0.2, 1);
const weaponMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
const weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
weapon.position.set(0.5, 0.5, 1);
player.add(weapon);

scene.add(player);

// Crear enemigos
const enemies = [];
for (let i = 0; i < 5; i++) {
    const enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
    const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
    enemy.position.set(Math.random() * 20 - 10, 0.5, Math.random() * 20 - 10);
    enemies.push(enemy);
    scene.add(enemy);
}

// Posicionar la cámara
camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(player.position);

// Movimiento básico del jugador
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

// Controles táctiles
const joystick = document.getElementById('joystick-handle');
let joystickActive = false;
let joystickOffset = { x: 0, y: 0 };
joystick.addEventListener('touchstart', (event) => {
    joystickActive = true;
});
joystick.addEventListener('touchmove', (event) => {
    if (joystickActive) {
        const touch = event.touches[0];
        const rect = joystick.parentElement.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;
        joystickOffset = { x, y };
        joystick.style.transform = `translate(${x}px, ${y}px)`;
    }
});
joystick.addEventListener('touchend', () => {
    joystickActive = false;
    joystickOffset = { x: 0, y: 0 };
    joystick.style.transform = 'translate(-50%, -50%)';
});

document.getElementById('shoot').addEventListener('touchstart', () => {
    shoot();
});
document.getElementById('aim').addEventListener('touchstart', () => {
    aim();
});

function shoot() {
    console.log('Disparar');
}

function aim() {
    console.log('Apuntar');
}

function animate() {
    requestAnimationFrame(animate);

    // Movimiento del jugador
    if (keys['ArrowUp'] || joystickOffset.y < -20) player.position.z -= 0.1;
    if (keys['ArrowDown'] || joystickOffset.y > 20) player.position.z += 0.1;
    if (keys['ArrowLeft'] || joystickOffset.x < -20) player.position.x -= 0.1;
    if (keys['ArrowRight'] || joystickOffset.x > 20) player.position.x += 0.1;

    renderer.render(scene, camera);
}
animate();
