const menu = () => {
  const { body } = document;
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-navigation');
  const header = document.getElementById('header');
  const mediaQueryList = window.matchMedia('(max-width: 1024px)')

  const closeMenu = () => {
    hamburger.classList.remove('is-active');
    mobileNav.classList.remove('is-opened');
    header.classList.remove('is-opened');
    hamburger.classList.remove('is-disabled');
    body.classList.remove('is-overflow-hidden');
  };

  const openMenu = () => {
    hamburger.classList.add('is-active');
    mobileNav.classList.add('is-opened');
    header.classList.add('is-opened');
    hamburger.classList.add('is-disabled');
    body.classList.add('is-overflow-hidden');
  };

  hamburger.addEventListener('click', () => {
    const isMobileNavOpened = mobileNav.classList.contains('is-opened');

    if(isMobileNavOpened) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mediaQueryList.addEventListener('change', () => {
    closeMenu();
  })
};

export default menu;
