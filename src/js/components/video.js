import gsap from 'gsap'

const video = () => {
  const button = document.querySelector('.js-video-section-cursor')
  const video = document.querySelector('.js-video-section-item')

  button.addEventListener('click', function () {
    const cloneVideo = video.cloneNode(true)
    const cloneButton = button.cloneNode(true)

    const tl = gsap.timeline()

    tl.set(cloneVideo, {
      position: 'fixed',
      top: 0,
      left: 0,
      objectFit: 'cover',
      zIndex: '4'
    })

    tl.set(cloneButton, {
      position: 'fixed',
      zIndex: '5'
    })

    video.muted = false;
    document.body.appendChild(cloneVideo)
    document.body.appendChild(cloneButton)
    document.body.classList.add('overflow-is-hidden')
    cloneButton.classList.remove('paused')

    tl.from(cloneVideo, {
      opacity: 0,
    })

    const handleCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      cloneButton.style.left =`${x}px`;
      cloneButton.style.top =`${y}px`;
    }
    window.addEventListener('mousemove', handleCursor);

    function removeVideo() {
      cloneVideo.pause()
      cloneVideo.remove()
      cloneButton.remove()
    }

    cloneVideo.addEventListener("webkitendfullscreen", removeVideo, false);

    cloneButton.addEventListener('click', function closeVideo() {
      tl
        .to(cloneButton, {
          opacity: 0,
          scale: 0.9
        })
        .to(cloneVideo, {
          opacity: 0,
          scale: 0.9,
          onComplete: () => {
            removeVideo()
            cloneButton.removeEventListener('click', closeVideo)
            cloneVideo.removeEventListener('webkitendfullscreen', closeVideo);
            window.removeEventListener('mousemove', handleCursor);
            document.body.classList.remove('overflow-is-hidden')
          }
        })
    })

  })
}

export default video;
