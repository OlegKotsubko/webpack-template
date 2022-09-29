import dropdown from "./components/dropdown";
import preloader from "./components/preloader"
import theme from "./components/theme"
import hero from "./components/hero";

dropdown()
theme()

const {tl} = preloader()
hero(tl)


