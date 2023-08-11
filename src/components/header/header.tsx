import style from "./header.module.scss";
import { Navigation } from "@/src/components/header/nav/navigation";
import { Logo } from "@/src/components/header/logo/logo";

const Header = () => {
  return (
    <header className={style.header}>
      <Logo />
      <Navigation />
    </header>
  );
};
export default Header;
