import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from "js-cookie";
import './graduateList.css'

import { toast } from 'react-toastify';

const GraduateList = () => {
    const [state, setState] = useState({
        name: [],
        department: [],
        passingYear: [],
        email: [],
        phone: [],
        company: [],
        role: []
    });

    const navigate = useNavigate(); // Call useNavigate as a function

    const list = async() => {
        const url = "http://localhost:8000/api/v1/graduates-list";
        const cookie = Cookies.get("myCookie");

        if(!cookie){
            toast.warning("Please Login")
            navigate('/login')
        }

        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (!data.success) {
                toast.error(data.message);
            }
            else {
                // Extract titles, descriptions, and dates into separate arrays
                const names = data.data.map(item => item.name);
                const departments = data.data.map(item => item.department);
                const passingYears = data.data.map(item => item.passingYear);
                const emails = data.data.map(item => item.email);
                const phones = data.data.map(item => item.phone);
                const companies = data.data.map(item => item.company);
                const roles = data.data.map(item => item.role);

                
                // Update the state with the extracted data
                setState({
                    name: names,
                    department: departments,
                    passingYear: passingYears,
                    email: emails,
                    phone: phones,
                    company: companies,
                    role: roles
                });
                 
            }
        });
    }

    console.log("name: ", state.name)
    useEffect(() => {
        list();
    }, []);

    return (
        <div>
          <div className="container lists">
            <div className="row list">
                {state.name.map((name, index) => 
                    ( 
                    <div key={index} className="m-3 list-block p-5">
                        <p className="name">Name: {name}</p>
                        <p className="department">Department: {state.department[index]}</p>
                        <p className="passingYear">Passing Year: {state.passingYear[index]}</p>
                        <p className="email">Email: {state.email[index]}</p>
                        <p className="phone">Phone: {state.phone[index]}</p>
                        <p className="company">Current Company: {state.company[index]}</p>
                        <p className="role">Role: {state.role[index]}</p>
                    </div>
                ))}
                   
            </div>    
        </div>
        </div>
    );
};

export default GraduateList;