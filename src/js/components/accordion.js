const CONFIG = {
  DURATION: 400,
  INSTANCE: ".js-accordion",
  TRIGGER: ".js-accordion-trigger",
  CONTENT: ".js-accordion-content",
  SIBLINGS_AUTO_CLOSE: true
};

const nextElem = (elem) => elem.nextElementSibling;

const getHeight = (elem) => {
  const content = elem.querySelector(CONFIG.CONTENT);

  return content.offsetHeight;
};

const slideDown = (elem) => {
  nextElem(elem).style.height = `${getHeight(nextElem(elem))}px`;
};

const slideUp = (elem) => {
  nextElem(elem).style.height = 0;
};

const getTriggers = (elem) => Array.from(elem.querySelectorAll(CONFIG.TRIGGER));

const initStates = (elem) => {
  getTriggers(elem).forEach((item) => {
    const trigger = item.closest(CONFIG.TRIGGER);

    if (item.classList.contains("active")) {
      nextElem(trigger).style.height = `${getHeight(nextElem(trigger))}px`;
    }

    nextElem(trigger).style.transitionProperty = "height";
    nextElem(trigger).style.transitionDuration = `${CONFIG.DURATION}ms`;
  });
};

const closeAllItems = (elem, current) => {
  getTriggers(elem).forEach((item) => {
    if (item !== current) {
      item.classList.remove("active");
      slideUp(item, CONFIG.DURATION);
    }
  });
};

const accordion = () => {
  const accordions = Array.from(document.querySelectorAll(CONFIG.INSTANCE));

  accordions.forEach((accordeon) => {
    initStates(accordeon);
    window.addEventListener("resize", () => initStates(accordeon));

    accordeon.addEventListener("click", (e) => {
      const trigger = e.target.closest(CONFIG.TRIGGER);
      if (trigger) {
        if (!trigger.classList.contains("active")) {
          if (CONFIG.SIBLINGS_AUTO_CLOSE) {
            closeAllItems(accordeon, trigger);
          }
          slideDown(trigger);
          trigger.classList.add("active");
        } else {
          slideUp(trigger);
          trigger.classList.remove("active");
        }
      }
    });
  });
};

export default accordion;
