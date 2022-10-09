import gsap from 'gsap'
import magnet from './magnet';

import { ScrollTrigger } from "gsap/ScrollTrigger";

const video = () => {
  const button = document.querySelector('.js-video-section-cursor')
  const video = document.querySelector('.js-video-section-item')
  const cursor = document.querySelector('.js-cursor');
  let mousePosition = { x: 0, y: 0 }

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
    const cloneVideo = video.cloneNode(true)
    const cloneButton = button.cloneNode(true)
    const tl = gsap.timeline()

    const {top, left, height, width} = video.getBoundingClientRect()

    document.body.appendChild(cloneVideo)

    cloneVideo.style.position = 'fixed'
    cloneVideo.style.top = `${top}px`
    cloneVideo.style.left = `${left}px`
    cloneVideo.style.width = `${width}px`
    cloneVideo.style.height = `${height}px`

    tl
      .set(cloneButton, {
        position: 'fixed',
        opacity: 0,
        zIndex: '6'
      })
      .set(cloneVideo, {
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        width:`${width}px`,
        height:`${height}px`,
        objectFit: 'cover',
        zIndex: '4'
      })
      .to(cloneVideo, {
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


    video.muted = false;

    document.body.appendChild(cloneButton)
    document.body.classList.add('overflow-is-hidden')
    cloneButton.classList.remove('paused')

    const handleCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      cursor.style.display = 'none'
      cloneButton.style.margin = '0'
      cloneButton.style.left =`${x - (cloneButton.offsetWidth / 2)}px`;
      cloneButton.style.top =`${y - (cloneButton.offsetHeight / 2)}px`;
    }
    window.addEventListener('mousemove', handleCursor);

    function removeVideo() {
      cloneVideo.pause()
      cloneVideo.remove()
      cloneButton.remove()
      document.body.classList.remove('overflow-is-hidden')
      window.removeEventListener('mousemove', handleCursor);
    }

    cloneVideo.addEventListener("webkitendfullscreen", removeVideo, false);

    cloneButton.addEventListener('click', function closeVideo() {
      tl
        .to(cloneButton, {
          opacity: 0,
          scale: 0.9
        })
        .to(cloneVideo, {
          position: 'fixed',
          top: `${top}px`,
          left: `${left}px`,
          width:`${width}px`,
          height:`${height}px`,
          duration: 0.6,
          onComplete: () => {
            removeVideo()
            cloneButton.removeEventListener('click', closeVideo)
            cloneVideo.removeEventListener('webkitendfullscreen', closeVideo);
            cursor.style.display = 'block'
          }
        })
    })
  })
}

export default video;
