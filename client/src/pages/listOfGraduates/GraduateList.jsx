import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './graduateList.css'

const GraduateList = () => {
    const [state, setState] = useState({
        name: [],
        email: [],
        phone: [],
        role: []
    });

    const list = async() => {
        const url = "http://localhost:8000/api/v1/graduates-list";

        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (!data.success) {
                alert(data.message);
            }
            else {
                // Extract titles, descriptions, and dates into separate arrays
                const names = data.data.map(item => item.name);
                const emails = data.data.map(item => item.email);
                const phones = data.data.map(item => item.phone);
                const roles = data.data.map(item => item.role);

                
                // Update the state with the extracted data
                setState({
                    name: names,
                    email: emails,
                    phone: phones,
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
                        <p className="email">Email: {state.email[index]}</p>
                        <p className="phone">Phone: {state.phone[index]}</p>
                        <p className="role">Role: {state.role[index]}</p>
                    </div>
                ))}
                   
            </div>    
        </div>
        </div>
    );
};

export default GraduateList;