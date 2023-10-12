import { NavLink } from 'react-router-dom';
import Logo from '../../assets/pictures/logo.png';
import './navbar.css';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('myCookie'));

    useEffect(() => {
        const cookieValue = Cookies.get('myCookie');
        setIsLoggedIn(!!cookieValue); // Update isLoggedIn based on the cookie
    }, []);

    const handleLogout = () => {
        Cookies.remove('myCookie'); // Remove the cookie
        setIsLoggedIn(false); // Update isLoggedIn
    }

    return (
        <div className='nav-wrapper'>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img className='image-thumbnail' style={{ width: "50px" }} src={Logo} alt="logo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {isLoggedIn ? (
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                </li>
                                <li className="nav-item" onClick={handleLogout}>
                                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/registration">Registration</NavLink>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
