// import section
import './registration.css'
import { useState } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';



const RegistrationPage = () => {

    // Initial state
    const [state, setState] = useState({
        name: "",
        studentId: "",
        department: "",
        passingYear: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate(); // Call useNavigate as a function

    // set state value
    const setValues = (key, value) => {
        setState({
          ...state,
          [key]: value,
        });
      };

    // push data into database from registration page using fetch api
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name, studentId, department, passingYear, email, phone, company, role, password, confirmPassword} = state;

        // backend api endpoint
        const url = "http://localhost:8000/api/v1/registration";

        // post data using fetch api
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, studentId, department, passingYear, email, phone, company, role, password, confirmPassword
            })
        })
       .then((response) => response.json())
       .then((data) => {
            if(data.success){
                toast.success(data.message);
                if(data.success == true){
                    navigate('/login');
                    toast.success("Registration Success. Please Login")
                }
            }
            else if(!data.message){
                toast.error("All fields are required")
            }
            else{
                toast.error("Please Enter Valid Student Id and Email")
            }
       })
       .catch((error) => {
        console.log(error)
       })
        
    }



    return (
        <div className="registration min-height">
            <div className="container registration-card">
                <form className="registration-form" method='POST' onSubmit={handleSubmit}>
                    <h1 className="form-heading">
                        Registration
                    </h1>
                    <div className="form-group">
                        <label htmlFor="name"></label>
                        <input type="text" name="name" id='name' className='input-field' autoComplete='off' value={state.name} onChange={(e) => {setValues("name", e.target.value)}} placeholder="Enter Your Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="studentId"></label>
                        <input type="text" name="studentId" id='studentId' className='input-field' autoComplete='off' value={state.studentId} onChange={(e) => {setValues("studentId", e.target.value)}} placeholder="Enter Your Student ID"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department"></label>
                        <input type="text" name="department" id='department' className='input-field' autoComplete='off' value={state.department} onChange={(e) => {setValues("department", e.target.value)}} placeholder="Enter Your Department Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passingYear"></label>
                        <input type="text" name="passingYear" id='passingYear' className='input-field' autoComplete='off' value={state.passingYear} onChange={(e) => {setValues("passingYear", e.target.value)}} placeholder="Enter Your Passing Year"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"></label>
                        <input type="text" name= "email" id='email' className='input-field' autoComplete='off' value={state.email} onChange={(e) => {setValues("email", e.target.value)}} placeholder="Enter Your Email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone"></label>
                        <input type="tel" name='phone' id='phone' className='input-field' autoComplete='off' value={state.phone} onChange={(e) => {setValues("phone", e.target.value)}} placeholder="Enter Your Mobile Number"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="company"></label>
                        <input type="text" name='company' id='company' className='input-field' autoComplete='off' value={state.company} onChange={(e) => {setValues("company", e.target.value)}} placeholder="Enter Company Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role"></label>
                        <input type="text" name='role' id='role' className='input-field' autoComplete='off' value={state.role} onChange={(e) => {setValues("role", e.target.value)}} placeholder="Enter Your Role"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input type="text" name='password' id='password' className='input-field' autoComplete='off' value={state.password} onChange={(e) => {setValues("password", e.target.value)}} placeholder="Enter Your Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword"></label>
                        <input type="text" name='confirmPassword' id='confirmPassword' className='input-field' autoComplete='off' value={state.confirmPassword} onChange={(e) => {setValues("confirmPassword", e.target.value)}} placeholder="Enter Your Confirm Password"/>
                    </div>
                    <div className="form-group">
                        <div className="registration-buttons">
                            <button type="submit" className="btn submit-btn btn-primary">Submit</button>
                            <NavLink className="nav-link" to="/login">I am already registered</NavLink>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default RegistrationPage;