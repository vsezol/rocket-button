import "./style.scss";

const button = document.querySelector(".button");
const startElement = document.querySelector(".start");
const finishElement = document.querySelector(".finish");
const launchNumberElement = document.querySelector(".launch-number");

const rocketObject: HTMLElement | null = document.querySelector(".plane");

const startElementRect: DOMRect | undefined =
  startElement?.getBoundingClientRect();

const finishElementRect: DOMRect | undefined =
  finishElement?.getBoundingClientRect();

const windowHeight = window.innerHeight;

interface Point {
  x: number;
  y: number;
  z: number;
}
const position: Point = {
  x: (startElementRect?.x ?? 0) + 5,
  y: -(windowHeight - (startElementRect?.y ?? 0) + 25),
  z: 0,
};
const finishPosition: Point = {
  x: (finishElementRect?.x ?? 0) + 5,
  y: -(windowHeight - (finishElementRect?.y ?? 0) + 25),
  z: 0,
};

function getLaunchNumber() {
  return Number(localStorage.getItem("LAUNCH_NUMBER") ?? 1);
}

function setLaunchNumber(value: number) {
  localStorage.setItem("LAUNCH_NUMBER", value.toString());
}

function syncLaunchNumber() {
  if (launchNumberElement) {
    launchNumberElement.innerHTML = getLaunchNumber().toString();
  }
}

let isLaunching = false;

button?.addEventListener("click", () => {
  if (isLaunching) {
    return;
  }

  isLaunching = true;

  setTimeout(() => {
    button.classList.remove("button_pressed");
    rocketObject?.classList.add("plane_launching");
  }, 500);

  setTimeout(() => {
    button.classList.add("button_hammered");
  }, 8500);

  setTimeout(() => {
    button.classList.remove("button_hammered");
    button.classList.add("button_pressed");
  }, 8700);

  setTimeout(() => {
    rocketObject?.classList.remove("plane_launching");
    isLaunching = false;

    setLaunchNumber(getLaunchNumber() + 1);
    syncLaunchNumber();
  }, 10500);
});

const rotation: Point = {
  x: 40,
  y: 0,
  z: 0,
};

// const updatePlane = () => {
//   // CONFIG["rotate-x"]++;

//   rocketObject?.style.setProperty(
//     "transform",
//     `translate3d(${position.x}px, ${position.y}px, 0px)`
//   );

//   Object.entries(rotation).forEach(([key, value]) => {
//     document.documentElement.style.setProperty(`--${key}`, value.toString());
//   });

//   requestAnimationFrame(updatePlane);
// };

// updatePlane();

const syncRotation = () => {
  rocketObject?.style.setProperty(`--rotate-x`, `${rotation.x}deg`);
  rocketObject?.style.setProperty(`--rotate-y`, `${rotation.y}deg`);
  rocketObject?.style.setProperty(`--rotate-z`, `${rotation.z}deg`);
};

const syncPosition = () => {
  rocketObject?.style.setProperty(`--rocket-x`, `${position.x}px`);
  rocketObject?.style.setProperty(`--rocket-y`, `${position.y}px`);
  rocketObject?.style.setProperty(`--rocket-end-x`, `${finishPosition.x}px`);
  rocketObject?.style.setProperty(`--rocket-end-y`, `${finishPosition.y}px`);
};

syncRotation();
syncPosition();
syncLaunchNumber();

// const animateRocket = () => {
//   position.y = position.y - 0.5;
//   rotation.y++;

//   syncRotation();
//   syncPosition();

//   requestAnimationFrame(() => animateRocket());
// };

// animateRocket();

// animateNumberProperty(
//   (value) => {
//     position.x = value;
//   },
//   position.x,
//   window.innerWidth,
//   10000
// );

// function animateNumberProperty(
//   update: (value: number) => void,
//   from: number,
//   to: number,
//   speed: number
// ) {
//   const step = (to - from) / speed;
//   let value = from;

//   const animate = () => {
//     value += step;

//     console.log(value);
//     update(value);

//     if (value >= to) {
//       return;
//     }

//     requestAnimationFrame(() => animate());
//   };

//   animate();
// }
