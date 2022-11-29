const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const context = new AudioContext();

let playState = false;

//Identificador Teclas HTML y posición x------

let teclaC = document.getElementById("teclaC");
let posicionTeclaC = teclaC.getBoundingClientRect();
let teclaD = document.getElementById("teclaD");
let posicionTeclaD = teclaD.getBoundingClientRect();
let teclaE = document.getElementById("teclaE");
let posicionTeclaE = teclaE.getBoundingClientRect();
let teclaF = document.getElementById("teclaF");
let posicionTeclaF = teclaF.getBoundingClientRect();
let teclaG = document.getElementById("teclaG");
let posicionTeclaG = teclaG.getBoundingClientRect();
let teclaA = document.getElementById("teclaA");
let posicionTeclaA = teclaA.getBoundingClientRect();
let teclaB = document.getElementById("teclaB");
let posicionTeclaB = teclaB.getBoundingClientRect();

//Fin Identificador Teclas HTML y posición x------

const rectangles = [];

notes.forEach((element) => {
  let height = element.duration * -500;
  switch (element.midi) {
    case 60:
      color = "#b0ca1f";
      x = posicionTeclaC.x + 4;
      break;

    case 62:
      color = "#9ed7e8";
      x = posicionTeclaD.x + 4;
      break;

    case 64:
      color = "#fdc903";
      x = posicionTeclaE.x + 4;
      break;

    case 65:
      color = "#e32227";
      x = posicionTeclaF.x + 4;
      break;

    case 67:
      color = "#ffeb0e";
      x = posicionTeclaG.x + 4;
      break;

    case 69:
      color = "#854895";
      x = posicionTeclaA.x + 4;
      break;

    case 71:
      color = "#cd86c6";
      x = posicionTeclaB.x + 4;
      break;

    default:
      color = "white";
      x = element.midi * 30 - 1500;
      break;
  }
  let y = element.time * -500 + 50;
  rectangles.push(new Rectangle(x, y, height, color));
});

function Update() {
  if (playState) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < rectangles.length; i++) {
      let rectangulo = rectangles[i];
      rectangulo.animate();
    }

    if (
      Math.round(
        rectangles[rectangles.length - 1].y +
          rectangles[rectangles.length - 1].height -
          2
      ) != canvas.height
    ) {
      requestAnimationFrame(Update);
      //se actualiza solo hasta que llega la ultimapieza al final
    }
  }

  //changing the color of the key:

  if (
    ctx.getImageData(posicionTeclaC.x + 10, canvas.height - 1, 1, 1).data[0] !=
    0
  ) {
    teclaC.style.background = "#b0ca1f";
  } else {
    teclaC.style.background = "linear-gradient(to bottom, #eee 0%, #fff 100%)";
  }

  if (
    ctx.getImageData(posicionTeclaD.x + 10, canvas.height - 1, 1, 1).data[0] !=
    0
  ) {
    teclaD.style.background = "#9ed7e8";
  } else {
    teclaD.style.background = "linear-gradient(to bottom, #eee 0%, #fff 100%)";
  }

  if (
    ctx.getImageData(posicionTeclaE.x + 10, canvas.height - 1, 1, 1).data[0] !=
    0
  ) {
    teclaE.style.background = "#fdc903";
  } else {
    teclaE.style.background = "linear-gradient(to bottom, #eee 0%, #fff 100%)";
  }

  if (
    ctx.getImageData(posicionTeclaF.x + 10, canvas.height - 1, 1, 1).data[0] !=
    0
  ) {
    teclaF.style.background = "#e32227";
  } else {
    teclaF.style.background = "linear-gradient(to bottom, #eee 0%, #fff 100%)";
  }

  if (
    ctx.getImageData(posicionTeclaG.x + 10, canvas.height - 1, 1, 1).data[0] !=
    0
  ) {
    teclaG.style.background = "#ffeb0e";
  } else {
    teclaG.style.background = "linear-gradient(to bottom, #eee 0%, #fff 100%)";
  }

  if (
    ctx.getImageData(posicionTeclaA.x + 10, canvas.height - 1, 1, 1).data[0] !=
    0
  ) {
    teclaA.style.background = "#854895";
  } else {
    teclaA.style.background = "linear-gradient(to bottom, #eee 0%, #fff 100%)";
  }

  if (
    ctx.getImageData(posicionTeclaB.x + 10, canvas.height - 1, 1, 1).data[0] !=
    0
  ) {
    teclaB.style.background = "#cd86c6";
  } else {
    teclaB.style.background = "linear-gradient(to bottom, #eee 0%, #fff 100%)";
  }
}

let playPauseButton = document.getElementById("playPauseButton");

function play() {
  playState = true;
  playPauseButton.name = "pause";
  playPauseDiv.onclick = function () {
    pause();
  };
  Update();
}

function pause() {
  playState = false;
  playPauseButton.name = "play";
  playPauseDiv.onclick = function () {
    play();
  };
  Update();
}

//velocity factor
function velocity(factor) {
  switch (factor) {
    case "option-1":
      rectangles.forEach((element) => {
        element.vfactor = 1;
      });
      break;

    case "option-2":
      rectangles.forEach((element) => {
        element.vfactor = 1.2;
      });
      break;
    case "option-3":
      rectangles.forEach((element) => {
        element.vfactor = 1.5;
      });
      break;
    case "option-4":
      rectangles.forEach((element) => {
        element.vfactor = 2;
      });
      break;
    default:
      rectangles.forEach((element) => {
        element.vfactor = 1;
      });
      break;
  }
}
//END velocity factor

//piano sounds
function jsNota(frecuencia) {
  var o = context.createOscillator();
  g = context.createGain();
  o.connect(g);
  o.type = "triangle";
  o.frequency.value = frecuencia;
  g.connect(context.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00101, context.currentTime + 1.5);
}
//END piano sounds
