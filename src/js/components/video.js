import {gsap} from "gsap"
import magnet from './magnet'
import Player from '@vimeo/player'

import { ScrollTrigger } from "gsap/ScrollTrigger";

const video = () => {
  const tl = gsap.timeline()
  const button = document.getElementById('video-play-button')
  const video = document.getElementById('video-player')
  const wrapper = document.getElementById('video-section-wrapper')
  const content = document.getElementById('video-section-content')
  const hero = document.getElementById('hero-section')
  const cursor = document.querySelector('.js-cursor');
  const section = document.querySelector('.js-animated-section');
  const mousePosition = { x: 0, y: 0 }
  const videoProps = {}
  let contentPosition
  let sectionPosition
  let clonedButton

  const player = new Player(video);

  function updateMousePosition(e) {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;

    magnet(button, 300, mousePosition)
  }

  function wrapperMouseLeaveHandler() {
    window.addEventListener("mousemove", updateMousePosition);
    cursor.style.display = 'block'

    gsap.timeline()
      .add(() => clonedButton.remove())
      .to(button, {
        opacity: 1,
        duration: 0.2,
      })
  }

  function wrapperMouseOverHandler() {
    window.removeEventListener("mousemove", updateMousePosition);
    cursor.style.display = 'none'

    clonedButton = button.cloneNode(true)
    clonedButton.style.opacity = '0'
    content.appendChild(clonedButton)

    gsap.timeline()
      .to(button, {
        opacity: 0,
        duration: 0.2,
      }).to(clonedButton, {
        opacity: 1
    })
  }

  function toggleMobPlayer() {
    player.getFullscreen().then(function(fullscreen) {
      if(!fullscreen) {
        player.play()
        player.setMuted(false)
        player.setVolume(1)
        player.requestFullscreen()
      } else {
        player.play()
        player.setMuted(true)
        player.exitFullscreen()
      }
    })
  }

  function wrapperMouseMoveHandler(e) {
    const {left, top} = e.target.getBoundingClientRect()
    const x = e.clientX - left - (button.offsetWidth / 2)
    const y = e.clientY - top - (button.offsetWidth / 2)

    gsap.set(clonedButton, {
      marginTop: 0,
      top: y,
      left: x,
    })
  }

  function wrapperClickHandler() {
    this.classList.toggle('play')

    if(content.style.transform !== 'none' &&  section.style.transform !== 'none') {
      contentPosition = content.style.transform
      sectionPosition = section.style.transform
    }

    const {left, top, width, height} = this.getBoundingClientRect()

    if (left !== 0 && top !== 0) {
      videoProps.x = left
      videoProps.y = top
      videoProps.w = width
      videoProps.h = height
      videoProps.maxH = video.style.maxHeight
    }

    if (this.classList.contains('play')) {
      tl
        .set(hero, {
          opacity: 0
        })
        .add(() => {
          player.setVolume(1)
          clonedButton.classList.remove('paused')
          content.style.transform = 'none'
          section.style.transform = 'none'
          document.body.classList.add('overflow-is-hidden')
        })
        .set(this, {
          position: 'fixed',
          left: left,
          top: top,
          width: width,
          height: height,
          background: '#000',
          zIndex: 4,
        })
        .set(video, {
          maxHeight: '100%'
        })
        .set(clonedButton, {
          position: 'fixed',
          zIndex: 5,
        })
        .to(this, {
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          padding: 0
        })

    } else {
      const {x, y, w, h, maxH} = videoProps
      tl
        .set(this, {
          background: 'transparent',
        })
        .set(clonedButton, {
          position: 'absolute'
        })
        .set(video, {
          maxHeight: maxH,
        })
        .to(this, {
          left: x,
          top: y,
          width: w,
          height: h,
          padding: 16,
          onComplete: () => {
            player.setVolume(0)
            content.style.transform = contentPosition
            section.style.transform = sectionPosition
            this.removeAttribute('style')
            clonedButton.classList.add('paused')
            document.body.classList.remove('overflow-is-hidden')
          }
        })
        .to(hero, {
          opacity: 1
        })
    }
  }

  ScrollTrigger.matchMedia({
    "(max-width: 1023px)": function () {
      window.removeEventListener("mousemove", updateMousePosition);
      wrapper.removeEventListener('mouseleave', wrapperMouseLeaveHandler)
      wrapper.removeEventListener('mouseover', wrapperMouseOverHandler)
      wrapper.removeEventListener('mousemove', wrapperMouseMoveHandler)
      wrapper.removeEventListener('click', wrapperClickHandler)

      button.addEventListener('click', toggleMobPlayer)
      wrapper.addEventListener('click', toggleMobPlayer)
    },
    "(min-width: 1024px)": function () {
      button.removeEventListener('click', toggleMobPlayer)
      wrapper.removeEventListener('click', toggleMobPlayer)

      window.addEventListener("mousemove", updateMousePosition);
      wrapper.addEventListener('mouseover', wrapperMouseOverHandler)
      wrapper.addEventListener('mouseleave', wrapperMouseLeaveHandler)
      wrapper.addEventListener('mousemove', wrapperMouseMoveHandler)
      wrapper.addEventListener('click', wrapperClickHandler)
    }
  })
}

export default video;
