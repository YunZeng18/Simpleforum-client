
import { Link } from 'react-router-dom';
export default function Header(props) {
    return (
        <header className="header">
            <Link className="header__logo" to="/">
                <img src={props.logoSrc} alt="Not My Final Forum" />Not My Final Forum
            </Link>


        </header>
    );
}
