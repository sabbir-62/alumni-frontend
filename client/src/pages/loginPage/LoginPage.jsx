import './login.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"; 
//import { useCookies } from 'react-cookie'

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
            if(data.message){
                alert(data.message);
                
                //console.log(data.data)
                 if(data.success == true){
                    Cookies.set("myCookie", data.data);
                     //console.log("login", data.data);
                     navigate('/');
                 }
            }
            else{
                alert("Something went wrong!")
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
        <div className="registration">
            <div className="container login">
                <form className="login-form" method='POST' onSubmit={handleSubmit}>
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
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <div className='new-user'>
                                <span>Not a member?</span>
                                <NavLink className="nav-link" to="/registration">Registration</NavLink>
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
