import dropdown from "./components/dropdown";
import preloader from "./components/preloader"
import theme from "./components/theme"
import scrollAnimate from "./components/scrollAnimate";
import language from "./components/language";
import cursor from "./components/cursor";
import video from "./components/video";

dropdown()
theme()

const {tl} = preloader()
scrollAnimate(tl)

language();
cursor();
video()
