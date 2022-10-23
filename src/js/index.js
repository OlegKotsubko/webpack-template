import preloader from "./components/preloader"
import theme from "./components/theme"
import scrollAnimate from "./components/scrollAnimate";
import language from "./components/language";
import cursor from "./components/cursor";
import video from "./components/video";
import heroSectionAnimate from "./components/heroSectionAnimate";

theme()

const {tl} = preloader()
heroSectionAnimate(tl)
scrollAnimate()

language();
cursor();
video()
