import "@pqina/flip/dist/flip.js";
import "../styles/main.scss";

window.setupFlip = function (tick) {
  Tick.helper.interval(function () {
    tick.value++;
    tick.root.setAttribute("aria-label", tick.value);
  }, 1000);
};
