// Initial vars
const ctx = document.getElementById("canvas").getContext("2d");

let canvasWidth = 300;
let canvasHeight = 530;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

let soundOn = true;
let score = 0;
const FPS = 60;
let gravity = 1.5;
let pipesArray = new Array();

const character = {
  x: 50,
  y: 150,
  width: 50,
  height: 50,
};

pipesArray[0] = {
  x: ctx.canvas.width,
  y: 0,
};

// Sounds
const scoreSound = new Audio();
scoreSound.src = "./assets/sounds/point.mp3";

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
  ctx.drawImage(bird, character.x, character.y);

  // Pipes
  for (let index = 0; index < pipesArray.length; index++) {
    const nextPipe = pipeUp.height + 80;

    ctx.drawImage(pipeUp, pipesArray[index].x, pipesArray[index].y);
    ctx.drawImage(
      pipeDown,
      pipesArray[index].x,
      pipesArray[index].y + nextPipe
    );

    pipesArray[index].x--;

    if (pipesArray[index].y + pipeUp.height < 80) {
      pipesArray[index].y = 0;
    }

    // Next pipes
    if (pipesArray[index].x == 150) {
      pipesArray.push({
        x: ctx.canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    // Collisions
    if (
      (character.x + bird.width >= pipesArray[index].x &&
        character.x <= pipesArray[index].x + pipeUp.width &&
        (character.y <= pipesArray[index].y + pipeUp.height ||
          character.y + bird.height >= pipesArray[index].y + nextPipe)) ||
      character.y + bird.height >= ctx.canvas.height - ground.height
    ) {
      location.reload();
      break;
    }

    if (pipesArray[index].x == character.x) {
      score++;

      if (soundOn) {
        scoreSound.play();
      }
    }
  }

  // Conditions
  character.y += gravity;

  // Score
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.font = "3.5rem Barber";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "black";
  ctx.fillText(score, ctx.canvas.width / 2, ctx.canvas.height - 40);

  ctx.font = "3.5rem Barber-Fill";
  ctx.fillStyle = "white";
  ctx.fillText(score, ctx.canvas.width / 2, ctx.canvas.height - 40);
}

// Events
window.addEventListener("keydown", controlCharacter);

document
  .getElementById("sound-on")
  .addEventListener("change", function (event) {
    soundOn = event.target.checked;
  });
