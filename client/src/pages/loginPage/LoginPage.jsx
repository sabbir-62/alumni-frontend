import './login.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"; 
import { toast } from 'react-toastify';
//import { useCookies } from 'react-cookie'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



const LoginPage = () => {
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    //  const [cookies, setCookie] = useCookies(['user']);

    const navigate = useNavigate(); // Call useNavigate as a function

    const setValue = (key, value) => {
        setState({
            ...state,
            [key] : value
        })
    }
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {email, password} = state;

        // backend api endpoint
        const url = "http://localhost:8000/api/v1/login";

        // post data using fetch api
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email, password
            }),
        })
       .then((response) => response.json())
       .then((data) => {
            if(data.success){      
                //console.log(data.data)
                Cookies.set("myCookie", data.data);
                //console.log("login", data.data);
                navigate('/my-account');
                toast.success("Login Success");
            }
            else{
                //toast.error(data.message)
            }
       })
       .catch((error) => {
        console.log(error)
       })

    // reset form field value with empty
       setState({
        email: '',
        password: ''
      });
    }
    return (
        <>
        <div className="login-page min-height">
            <div className="container login">
                <form className="login-form" method='POST' onSubmit={handleSubmit}>
                    <div className="login-header">
                        Login
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"></label>
                        <input type="text" className='input-field' name='email' id='email' autoComplete='off' value={state.email} onChange={(e) => {setValue("email", e.target.value)}} placeholder="Enter Your Email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input type="text" className='input-field' name='password' id='password' autoComplete='off' value={state.password} onChange={(e) => {setValue("password", e.target.value)}} placeholder="Enter Your Password"/>
                    </div>
                    <div className="form-group">
                        <div className="button">
                            <button type="submit" className="login-btn btn btn-primary">Login</button>
                            <div className='new-user'>
                                <span className='loginStatusBtn'>Not a member?</span>
                                <NavLink className="login-nav-link" to="/registration">Registration</NavLink>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default LoginPage;
