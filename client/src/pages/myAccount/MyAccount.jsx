
/*-----------Imports---------*/
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from "js-cookie";
import './myAccount.css'
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";

import { useContext } from 'react';
import myContext from '../../components/contextApi/DataContext';



/*-----------Main function component---------*/
const MyAccount = () => {

    const {email, setEmail} = useContext(myContext);

    const [loading, setLoading] = useState(true)  //for set loading spinner
    const [state, setState] = useState({
        name: "",
        studentId: "",
        department: "",
        passingYear: "",
        email: "",
        phone: "",
        company: "",
        role: ""
    })

    const navigate = useNavigate(); // Call useNavigate as a function

    // Getting profile information from database
    const myAccountPage = async() => {
        const cookie = Cookies.get("myCookie");
        if(!cookie){
            toast.warning("Please Login")
            navigate('/login')
        }
        const url = "http://localhost:8000/api/v1/about";
        
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
               cookie
            }),
           
        })
       .then((response) => response.json())
       .then((data) => {
            if(!data.success){
                navigate('/login');
            }
            else{
                setState({
                    name:data.user.name,
                    studentId: data.user.studentId,
                    department: data.user.department,
                    passingYear: data.user.passingYear,
                    email: data.user.email,
                    phone: data.user.phone,
                    company: data.user.company,
                    role: data.user.role
                })

                setEmail(data.user.email);
                
                setLoading(false)
                
            }
           
       })
       .catch((error) => {
            console.log(error)
            //alert("No user logged in")
       })
      
      
    }

    // Set input values into state
    const setValues = (key, value) => {
        setState({
          ...state,
          [key]: value,
        });
      };



    // User Logout and remove cookie from browser
    const handleClick = () => {
        Cookies.remove("myCookie");
        navigate('/login');
        toast.success("Logout Success")
    }

    // User data update
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name, studentId, department, passingYear, email, phone, company, role} = state;

        const token = Cookies.get("myCookie");
        if(!token){
            toast.warning("Please Login")
            navigate('/login')
        }

        const url = "http://localhost:8000/api/v1/update-profile";

        // post data using fetch api
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, studentId, department, passingYear, email, phone, company, role, token
            })
        })
       .then((response) => response.json())
       .then((data) => {
            if(data.success){
                toast.success(data.message);
                if(data.success == true){
                    navigate('/');
                }
            }
            else{
                toast.error("Something went wrong!")
            }
       })
       .catch((error) => {
        console.log(error)
       })
        
    }


    useEffect(() => {
        myAccountPage();
    }, []); // Empty dependency array to run the effect once


    

    return (
        <div>
            {
                loading ?
                (
                    <div className="loader">
                      <BeatLoader
                        color={"#36d7b7"}
                        loading={loading}
                        size={15}
                      />
                    </div>
                  )
                :
                
               <div className="container profile">
                 <div className="profile-card min-height">
                <form className="profile-form" method='POST' onSubmit={handleSubmit}>
                    <h1 className="profile-heading">
                        Your Profile
                    </h1>
                    <div className="profile-box">
                        <div className="profile-field">
                            <label htmlFor="name">Full Name :</label>
                            <input type="text" name="name" id='name' className='profile-input'  value={state.name} onChange={(e) => {setValues("name", e.target.value)}} placeholder="Enter Your Name"/>
                        </div>
                        <div className="profile-field">
                            <label htmlFor="studentId">Student ID :</label>
                            <input type="text" name="studentId" id='studentId' className='profile-input'  value={state.studentId} onChange={(e) => {setValues("studentId", e.target.value)}} placeholder="Enter Your Student ID"/>
                        </div>
                        <div className="profile-field">
                            <label htmlFor="department">Department :</label>
                            <input type="text" name="department" id='department' className='profile-input'  value={state.department} onChange={(e) => {setValues("department", e.target.value)}} placeholder="Enter Your Department Name"/>
                        </div>
                        <div className="profile-field">
                            <label htmlFor="passingYear">Passing Year :</label>
                            <input type="text" name="passingYear" id='passingYear' className='profile-input'  value={state.passingYear} onChange={(e) => {setValues("passingYear", e.target.value)}} placeholder="Enter Your Passing Year"/>
                        </div>
                        <div className="profile-field">
                            <label htmlFor="email">Email :</label>
                            <input type="text" name= "email" id='email' className='profile-input'  value={state.email} onChange={(e) => {setValues("email", e.target.value)}} placeholder="Enter Your Email"/>
                        </div>
                        <div className="profile-field">
                            <label htmlFor="phone">Phone No :</label>
                            <input type="tel" name='phone' id='phone' className='profile-input'  value={state.phone} onChange={(e) => {setValues("phone", e.target.value)}} placeholder="Enter Your Mobile Number"/>
                        </div>
                        <div className="profile-field">
                            <label htmlFor="company">Current Company :</label>
                            <input type="text" name='company' id='company' className='profile-input'  value={state.company} onChange={(e) => {setValues("company", e.target.value)}} placeholder="Enter Company Name"/>
                        </div>
                        <div className="profile-field">
                            <label htmlFor="role">Role :</label>
                            <input type="text" name='role' id='role' className='profile-input'  value={state.role} onChange={(e) => {setValues("role", e.target.value)}} placeholder="Enter Your Role"/>
                        </div>
                        <div className="account-buttons">
                            <button className='btn logout-btn ac-btn btn-danger mt-3' onClick={handleClick}>Logout</button>
                            <button type='submit' className='btn save-profile-btn ac-btn btn-primary mt-3'>Save Profile</button>
                        </div>
                    </div>
                </form>
            </div>
               </div>
            }
        </div>
    );
};

export default MyAccount;