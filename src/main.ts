import "./style.scss";

window.onload = () => {
  const iframeElement = document.querySelector("#iframe");
  const { height: windowHeight } = iframeElement?.getBoundingClientRect()!;

  const vh: number = windowHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  const button = document.querySelector(".button");
  const launchNumberElement = document.querySelector(".launch-number");

  const rocketObject: HTMLElement | null = document.querySelector(".plane");

  interface Point {
    x: number;
    y: number;
    z: number;
  }

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

  const syncRotation = () => {
    const rotation: Point = {
      x: 40,
      y: 0,
      z: 0,
    };

    rocketObject?.style.setProperty(`--rotate-x`, `${rotation.x}deg`);
    rocketObject?.style.setProperty(`--rotate-y`, `${rotation.y}deg`);
    rocketObject?.style.setProperty(`--rotate-z`, `${rotation.z}deg`);
  };

  const syncPosition = () => {
    const startElement = document.querySelector(".launch-site_start");
    const finishElement = document.querySelector(".launch-site_finish");

    const startElementRect: DOMRect | undefined =
      startElement?.getBoundingClientRect();

    const finishElementRect: DOMRect | undefined =
      finishElement?.getBoundingClientRect();

    const position: Point = {
      x: (startElementRect?.x ?? 0) + 4,
      y: -(windowHeight - (startElementRect?.y ?? 0) + 45),
      z: 0,
    };

    const finishPosition: Point = {
      x: (finishElementRect?.x ?? 0) + 4,
      y: -(windowHeight - (finishElementRect?.y ?? 0) + 45),
      z: 0,
    };

    rocketObject?.style.setProperty(`--rocket-x`, `${position.x}px`);
    rocketObject?.style.setProperty(`--rocket-y`, `${position.y}px`);
    rocketObject?.style.setProperty(`--rocket-end-x`, `${finishPosition.x}px`);
    rocketObject?.style.setProperty(`--rocket-end-y`, `${finishPosition.y}px`);
  };

  syncRotation();
  syncPosition();
  syncLaunchNumber();
};
