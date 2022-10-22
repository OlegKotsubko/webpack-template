import Plyr from 'plyr'
import magnet from './magnet'

import { ScrollTrigger } from "gsap/ScrollTrigger";

const video = () => {
  const button = document.querySelector('.js-video-section-cursor')
  let mousePosition = { x: 0, y: 0 }

  const player = new Plyr('#video-player', {
    controls: [],
  });

  player.muted = true
  player.autoplay = true

  function updateMousePosition(e) {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;

    magnet(button, window.innerWidth / 2, mousePosition)
  }

  ScrollTrigger.matchMedia({
    "(max-width: 1023px)": function () {
      window.removeEventListener("mousemove", updateMousePosition);
      button.removeAttribute('style')
    },
    "(min-width: 1024px)": function () {
      window.addEventListener("mousemove", updateMousePosition);
    }
  })

  button.addEventListener('click', function () {
    player.togglePlay()
    player.fullscreen.toggle()
    player.muted = false
  })
}

export default video;
