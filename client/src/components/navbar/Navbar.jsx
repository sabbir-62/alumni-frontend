
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/pictures/logo.png';
import './navbar.css';
import { useState } from 'react';


const Navbar = () => {

    const [isShow, setShow] = useState('')

    const handleClick = () => {
        if(!isShow){
            setShow('show')
        }
        if(isShow){
            setShow('')
        }
    }


    return (
        <div className='nav-wrapper'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img className='image-thumbnail' style={{ width: "50px" }} src={Logo} alt="logo" />
                    </NavLink>
                    <button className="navbar-toggler" onClick={handleClick}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${isShow}`} id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/" onClick={handleClick}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/my-account" onClick={handleClick}>My Account</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/graduates-list" onClick={handleClick}>Graduates</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/post" onClick={handleClick}>Post</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/events" onClick={handleClick}>Events</NavLink>
                                </li> 
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/gallery" onClick={handleClick}>Gallery</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact" onClick={handleClick}>Contact Us</NavLink>
                                </li> 
                            </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
