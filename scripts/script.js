// ── Date and time ────────────────────────────────────────────────────────
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const $date = document.querySelector(".date");
const $time = document.querySelector(".time");

const getDateAndTime = () => {
  const date = new Date();
  $date.textContent = `${DAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;
  $time.textContent = `${date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
};

// ── Desktop icons ────────────────────────────────────────────────────────
const $icons = document.querySelectorAll(".desktop-icon");
const $desktop = document.querySelector(".desktop");

const IconSetup = () => {
  draggIcons();
  selectIcon();
};

const draggIcons = () => {
  Draggable.create(".desktop-icon", {
    type: "x,y", // Allow dragging on both axes
    bounds: ".desktop", // Restrict dragging to a specific element
    inertia: false, // Add smooth momentum-based flicking
  });
};

const selectIcon = () => {
  $icons.forEach((icon) => {
    icon.addEventListener("click", () => clickHandle(icon));
  });
  $desktop.addEventListener("click", (e) => desktopClickHandle(e));
};

const clickHandle = (icon) => {
  if (icon.classList.contains("selected")){
    openWindow(icon.id); // open icon after selected to simulate double click to open
  }

  $icons.forEach((icon) => {
    icon.classList.remove("selected");
  });
  icon.classList.add("selected");
};

const desktopClickHandle = (e) => {
  $icons.forEach((icon) => {
    if (!icon.contains(e.target)) {
      icon.classList.remove("selected");
    }
  });
};

// ── Desktop Windows ────────────────────────────────────────────────────────
const $windows = document.querySelectorAll(".desktop-window");
const $closebtns = document.querySelectorAll(".btn__close");

const WindowSetup = () => {
  draggWindow();
  closeWindow();
};

const draggWindow = () => {
  Draggable.create(".desktop-window", {
    type: "x,y", // Allow dragging on both axes
    bounds: ".desktop", // Restrict dragging to a specific element
    inertia: false, // Add smooth momentum-based flicking
  });
};

const openWindow = (id) => {
  $windows.forEach((window) => {
    if (window.id == id) {
      window.style.display = 'block';
    }
  });
}

const closeWindow = () => {
  $closebtns.forEach((btn) => {
    btn.addEventListener("click", () => closebtnHandle(btn.id));
  });
}

const closebtnHandle = (id) => {
   $windows.forEach((window) => {
     if (window.id == id) {
       window.style.display = "none";
     }
   });
}


// ── Initialiser ────────────────────────────────────────────────────────
const init = () => {
  gsap.registerPlugin(Draggable);

  getDateAndTime();
  setInterval(getDateAndTime, 1000);

  IconSetup();
  WindowSetup();
};

init();
