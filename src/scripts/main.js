import "@pqina/flip/dist/flip.js";
import "../styles/main.scss";

/*
window.handleTickInit = function(tick) {
  var timer = Tick.helper.interval(function() {
    tick.value++;
    if (tick.value === 2000) {
      timer.stop();
    }
  }, 250, { autostart: false });
  
  let options = {
    rootMargin: '0px',
    threshold: 1
  }
  
  let callback = (entries, observer) => {
    entries.forEach(entry => {
      if (window.matchMedia('(min-width: 1150px)').matches) {
        if (entry.isIntersecting) {
          tick.value = 1990;
          timer.start();     
        } else {
          tick.value = 1990;
        }
      } else {
        if (tick.value != 2000) {
          tick.value = 2000;
          timer.stop();
        }
      }
    });
  };
  
  let observer = new IntersectionObserver(callback, options);
  let target = document.querySelector('.counting-block__ticker');
  
  observer.observe(target);
}
*/


