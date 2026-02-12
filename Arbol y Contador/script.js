const startDate = new Date(2024, 9, 12); // Ajusta tu fecha: Año, Mes-1, Día

const treeCanvas = document.getElementById('treeCanvas');
const petalCanvas = document.getElementById('petalCanvas');
const tCtx = treeCanvas.getContext('2d');
const pCtx = petalCanvas.getContext('2d');

treeCanvas.width = petalCanvas.width = 800;
treeCanvas.height = petalCanvas.height = 800;

let petals = [];

// --- CÉSPED EN LA BASE ---
function drawStylizedGrass() {
    tCtx.save();
    tCtx.translate(0, 800); 
    const density = 180;

    for (let i = 0; i < density; i++) {
        const x = Math.random() * 800;
        const height = Math.random() * 25 + 20;
        tCtx.beginPath();
        tCtx.moveTo(x, 0);
        tCtx.lineWidth = 2.5;
        tCtx.strokeStyle = Math.random() > 0.5 ? '#386641' : '#6a994e';
        tCtx.quadraticCurveTo(x + 5, -height/2, x + (Math.random()*10 - 5), -height);
        tCtx.stroke();
    }
    tCtx.restore();
}

// --- DIBUJAR ÁRBOL ---
function drawTree(x, y, len, angle, width) {
    tCtx.beginPath();
    tCtx.moveTo(x, y);
    const endX = x + len * Math.cos(angle);
    const endY = y + len * Math.sin(angle);
    
    tCtx.lineCap = 'round';
    tCtx.lineWidth = width;
    tCtx.strokeStyle = '#2d1b0e'; 
    tCtx.lineTo(endX, endY);
    tCtx.stroke();

    // Condición de parada (flores)
    if (len < 15) {
        tCtx.beginPath();
        tCtx.arc(endX, endY, 5, 0, Math.PI * 2);
        tCtx.fillStyle = '#f48fb1'; // Rosa suave
        tCtx.fill();
        
        if (Math.random() > 0.4) {
            petals.push({
                x: endX, y: endY,
                speedY: Math.random() * 0.4 + 0.2,
                speedX: Math.random() * 0.8 - 0.4,
                size: Math.random() * 4 + 2,
                angle: Math.random() * Math.PI
            });
        }
        return;
    }

    // Recursión
    setTimeout(() => {
        drawTree(endX, endY, len * 0.75, angle - 0.4, width * 0.7);
        drawTree(endX, endY, len * 0.75, angle + 0.4, width * 0.7);
    }, 100);
}

// --- ANIMACIÓN PÉTALOS ---
function animatePetals() {
    pCtx.clearRect(0, 0, 800, 800);
    petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.3;
        p.angle += 0.01;

        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pCtx.fillStyle = 'rgba(244, 143, 177, 0.8)';
        pCtx.fill();

        if (p.y > 800) {
            p.y = 150 + Math.random() * 300;
            p.x = 200 + Math.random() * 400;
        }
    });
    requestAnimationFrame(animatePetals);
}

// --- INICIO ---
drawStylizedGrass();
// Parámetros: x, y, longitud inicial (140), ángulo, grosor inicial (16)
drawTree(400, 800, 140, -Math.PI / 2, 16); 
animatePetals();

// Transición a la derecha
setTimeout(() => {
    document.getElementById('tree-wrapper').classList.add('tree-moved');
    setTimeout(() => {
        document.getElementById('content-box').classList.add('content-visible');
    }, 1500);
}, 5000); // 

// --- RELOJ ---
function updateTimer() {
    const diff = new Date() - startDate;
    document.getElementById('days').innerText = Math.floor(diff / 864e5);
    document.getElementById('hours').innerText = Math.floor((diff / 36e5) % 24);
    document.getElementById('minutes').innerText = Math.floor((diff / 6e4) % 60);
    document.getElementById('seconds').innerText = Math.floor((diff / 1e3) % 60);
}
setInterval(updateTimer, 1000);
updateTimer();

const boton = document.getElementById('btnMusica');
const audio = document.getElementById('musicaRomantica');

boton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        boton.innerHTML = "❤ Pausar Música";
        boton.style.backgroundColor = "#d63384"; 
    } else {
        audio.pause();
        boton.innerHTML = "❤ Activar Música";
        boton.style.backgroundColor = "rgba(255, 183, 197, 0.7)";
    }
});