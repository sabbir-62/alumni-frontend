import { NavLink } from 'react-router-dom';
import Logo from '../../assets/pictures/logo.png';
import './navbar.css';


const Navbar = () => {


    return (
        <div className='nav-wrapper'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img className='image-thumbnail' style={{ width: "50px" }} src={Logo} alt="logo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                     
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/my-account">My Account</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/graduates-list">Graduates</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/news">News</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/events">Events</NavLink>
                                </li> 
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/gallery">Gallery</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                                </li> 
                            </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
