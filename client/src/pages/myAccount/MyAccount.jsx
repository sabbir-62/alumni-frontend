import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from "js-cookie";
import './myAccount.css'
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";

const MyAccount = () => {

    const [loading, setLoading] = useState(true)
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

    const myAccountPage = async() => {
        const cookie = Cookies.get("myCookie");
        if(!cookie){
            toast.warning("Please Login")
            navigate('/login')
        }
        const url = "http://localhost:8000/api/v1/about";
        // post data using fetch api
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

                setLoading(false)
            }
           
       })
       .catch((error) => {
            console.log(error)
            //alert("No user logged in")
            navigate('/login');
       })
      
      
    }

    const handleClick = () => {
        Cookies.remove("myCookie");
        navigate('/login');
        toast.success("Logout Success")
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
                <div className="container about">
            <div className="row about-card">
                <div className="heading">
                    <h1>{state.name}</h1>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <ul>
                            <li>
                                Name :
                            </li>
                            <li>
                                Student Id :
                            </li>
                            <li>
                                Department :
                            </li>
                            <li>
                                Passing Year :
                            </li>
                            <li>
                                Email :
                            </li>
                            <li>
                                Phone :
                            </li>
                            <li>
                                Current Company :
                            </li>
                            <li>
                                Role :
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li>
                                {state.name}
                            </li>
                            <li>
                                {state.studentId}
                            </li>
                            <li>
                                {state.department}
                            </li>
                            <li>
                                {state.passingYear}
                            </li>
                            <li>
                                {state.email}
                            </li>
                            <li>
                                {state.phone}
                            </li>
                            <li>
                                {state.company}
                            </li>
                            <li>
                                {state.role}
                            </li>
                        </ul>
                    </div>
                </div>
                <button className='btn btn-danger mt-3 ms-5' onClick={handleClick}>Logout</button>
            </div>    
        </div>
            }
        </div>
    );
};

export default MyAccount;