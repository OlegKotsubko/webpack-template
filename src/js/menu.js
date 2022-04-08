import isTouchDevice from './helpers/detectTouch'

const menu = () => {
  const { body } = document;
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-navigation');
  const header = document.getElementById('header');
  const eventType = isTouchDevice() ? 'touchstart' : 'click';


  function toggleMenu() {
    hamburger.classList.toggle('is-active');
    mobileNav.classList.toggle('is-opened');
    header.classList.toggle('is-opened');
    hamburger.classList.toggle('is-disabled');
    body.classList.toggle('is-overflow-hidden');
  }

  const closeMenu = () => {
    toggleMenu()
  };

  const openMenu = () => {
    toggleMenu()
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
