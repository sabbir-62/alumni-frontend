import './errorPage.css';
import { NavLink } from 'react-router-dom';


const ErrorPage = () => {
    return (
       <>
            <div className='error-page'>
                <div className="error">
                    <div className="error-text">
                        <h1>We are sorry. Page not found!</h1>
                    </div>
                    <div className="back-home btn btn-primary">
                        <NavLink className="home-btn" to="/">BACK TO HOME PAGE</NavLink>
                    </div>
                </div>
            </div>
       </>
    );
};

export default ErrorPage;