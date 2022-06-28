import '../scss/app.scss'

import menu from "./component/menu";
import slider from "./component/slider";
import info from "./component/info";
import hero from "./component/hero";
import peruka from "./component/peruka";
import banner from "./component/banner";

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(()=>{
    document.querySelector('.js-preloader').style.display = 'none'
    menu();
    slider();
    info();
    hero()
    peruka()
    banner()
  }, 2000)
})
