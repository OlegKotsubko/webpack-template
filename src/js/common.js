import menu from "./components/menu";
import headerScroll from "./components/headerScroll";
import dropdown from "./components/dropdown";
import heroSectionAnimation from "./components/hero-section-animation";
import onScrollAnimation from "./components/on-scroll-animation";

import '../scss/app.scss'

window.addEventListener('DOMContentLoaded', () => {
  menu();
  headerScroll();
  dropdown();
  heroSectionAnimation()
  onScrollAnimation();
})
