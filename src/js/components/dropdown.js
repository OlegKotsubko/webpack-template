const dropdown = () => {
  function closeDropdown() {
    document
      .querySelectorAll(".js-dropdown-container")
      .forEach(function (container) {
        container.classList.remove("dropdown-open");
      });

    document.querySelectorAll(".js-dropdown-menu").forEach(function (menu) {
      menu.classList.remove("dropdown-active");
    });
  }

  document.querySelectorAll(".js-dropdown").forEach((dropDown) => {
    if (dropDown.classList.contains("js-dropdown")) {
      dropDown.addEventListener("click", function (e) {
        e.preventDefault();
        const {target} = e;
        if (target.nextElementSibling.classList.contains("dropdown-active")) {
          target.parentElement.classList.remove("dropdown-open");
          target.nextElementSibling.classList.remove("dropdown-active");
        } else {
          closeDropdown();
          target.parentElement.classList.add("dropdown-open");
          target.nextElementSibling.classList.add("dropdown-active");
        }
      });
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".js-dropdown-container")) {
      closeDropdown();
    }
  });
}

export default dropdown;
