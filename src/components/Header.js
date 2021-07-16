import headerLogoPath from '../images/icons/logo.svg';
import { Link } from 'react-router-dom';
import { ProgressPlugin } from 'webpack';


export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogoPath} alt="header__logo" />
      {props.children}
    </header>
  )
}
