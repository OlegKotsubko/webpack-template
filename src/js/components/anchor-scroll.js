const anchorScroll = (
  el,
  offset = 0,
  scrollTopFlag = false,
) => {
  if(el) {
    [...document.querySelectorAll(el)].forEach(elem => {
      elem.addEventListener('click', () => {
        const target = document.getElementById(elem.getAttribute('href').slice(1));
        window.scroll({
          behavior: 'smooth',
          left: 0,
          top: scrollTopFlag ? 0 : target.offsetTop - offset
        });
      });
    })
  }
}

export default anchorScroll;
