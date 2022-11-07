import {gsap} from "gsap"
import magnet from './magnet'
import Player from '@vimeo/player'

import { ScrollTrigger } from "gsap/ScrollTrigger";

const video = () => {
  const button = document.querySelector('.js-video-section-cursor')
  const video = document.getElementById('video-player')
  const content = document.getElementById('video-section-content')
  const cursor = document.querySelector('.js-cursor');
  const section = document.querySelector('.js-animated-section');
  const mousePosition = { x: 0, y: 0 }

  const player = new Player(video);

  function updateMousePosition(e) {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;

    magnet(button, 300, mousePosition)
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

    ScrollTrigger.matchMedia({
      "(max-width: 1023px)": function () {
        player.getVolume().then((volume) => {
          if(volume) {
            button.classList.add('paused')
            player.setVolume(0)
          } else {
            button.classList.remove('paused')
            player.setVolume(1)
          }
        })
      },
      "(min-width: 1024px)": function () {
        const tl = gsap.timeline()
        const {top, left, height, width} = video.getBoundingClientRect()
        const cloneButton = button.cloneNode(true)

        document.body.appendChild(cloneButton)
        document.body.classList.add('overflow-is-hidden')
        cloneButton.classList.remove('paused')

        player.setVolume(1)

        const memoContentPlace = content.style.transform
        const memoSectionPlace = section.style.transform
        content.style.transform = 'none'
        section.style.transform = 'none'

        tl
          .set(cloneButton, {
            position: 'fixed',
            opacity: 0,
            zIndex: '6'
          })
          .set(video, {
            position: 'fixed',
            top: `${top}px`,
            left: `${left}px`,
            width:`${width}px`,
            height:`${height}px`,
            objectFit: 'cover',
            zIndex: '4'
          })
          .to(video, {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            duration: 0.6
          })
          .to(cloneButton, {
            opacity: 1,
            duration: 0.6
          })

        const handleCursor = (e) => {
          const { clientX: x, clientY: y } = e;

          cursor.style.display = 'none'
          cloneButton.style.margin = '0'

          cloneButton.style.transform = 'none'
          cloneButton.style.left =`${x - (cloneButton.offsetWidth / 2)}px`;
          cloneButton.style.top =`${y - (cloneButton.offsetHeight / 2)}px`;
        }

        window.addEventListener('mousemove', handleCursor);

        cloneButton.addEventListener('click', function closeVideo() {
          player.setVolume(0)
          tl
            .to(cloneButton, {
              opacity: 0,
              scale: 0.9
            })
            .to(video, {
              top: `${top}px`,
              left: `${left}px`,
              width:`${width}px`,
              height:`${height}px`,
              duration: 0.6,
              onComplete: () => {
                content.style.transform = memoContentPlace
                section.style.transform = memoSectionPlace
                cloneButton.removeEventListener('click', closeVideo)
                window.removeEventListener('mousemove', handleCursor);
                document.body.classList.remove('overflow-is-hidden')
                cursor.style.display = 'block'
                cloneButton.remove()
                video.removeAttribute('style')
              }
            })
        })
      }
    })
  })
}

export default video;
