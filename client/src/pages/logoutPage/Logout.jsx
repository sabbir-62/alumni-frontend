import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import './logout.css';
import { useEffect } from "react";

const Logout = () => {
    const navigate = useNavigate(); // Call useNavigate as a function

    useEffect(() => {
        try {
            Cookies.remove("myCookie");
        } catch (error) {
            console.error("Error removing cookie:", error);
        } finally {
            navigate('/login');
        }
    }, []);

    return (
        <div className="logout">
            
        </div>
    );
};

export default Logout;
