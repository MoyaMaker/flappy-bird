const canvasWidth = 300;
const canvasHeight = 530;

const ctx = document.getElementById("canvas").getContext("2d");
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

const FPS = 60;

let gravity = 1.5;

const character = {
  x: 100,
  y: 150,
  width: 50,
  height: 50,
};

// Images
const bird = new Image();
bird.src = "./assets/images/bird.png";

const background = new Image();
background.src = "./assets/images/background.png";

const ground = new Image();
ground.src = "./assets/images/ground.png";

const pipeUp = new Image();
pipeUp.src = "./assets/images/pipe-up.png";

const pipeDown = new Image();
pipeDown.src = "./assets/images/pipe-down.png";

// Control
function controlCharacter() {
  character.y -= 25;
}

// Loop
setInterval(loop, 1000 / FPS);

function loop() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Background
  ctx.drawImage(background, 0, 0);

  // Ground
  ctx.drawImage(ground, 0, ctx.canvas.height - ground.height);

  // Character
  ctx.fillStyle = "rgba(100,0,0,1)";
  ctx.fillRect(character.x, character.y, character.width, character.height);

  // Pipes
  character.y += gravity;
}

window.addEventListener("keydown", controlCharacter);
