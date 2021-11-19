import gsap from 'gsap';

const menu = () => {
  const animation = gsap.timeline({paused: true})
  const { body } = document;
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-navigation');
  const eventType = 'click';

  animation.to(mobileNav, {x: '0%', opacity: 1, duration: 0.3})

  function toggleMenu() {
    hamburger.classList.toggle('is-active');
    mobileNav.classList.toggle('is-opened');
    hamburger.classList.toggle('is-disabled');
    body.classList.toggle('is-overflow-hidden');
  }

  const closeMenu = () => {
    toggleMenu()
    animation.reverse();
  };

  const openMenu = () => {
    toggleMenu()
    animation.play();
  };

  hamburger.addEventListener(eventType, () => {
    const isMobileNavOpened = mobileNav.classList.contains('is-opened');

    if(isMobileNavOpened) {
      closeMenu();
    } else {
      openMenu();
    }
  });
};

export default menu;
