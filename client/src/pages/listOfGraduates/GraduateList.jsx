
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from "js-cookie";
import './graduateList.css'
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";

const GraduateList = () => {
    const [loading, setLoading] = useState(true);
    const [graduates, setGraduates] = useState([]);

    const navigate = useNavigate();

    const list = async() => {
        const url = "https://alumni-backend-nu.vercel.app/api/v1/graduates-list";

        const cookie = Cookies.get("myCookie");

        if (!cookie) {
            toast.warning("Please Login");
            navigate('/login');
        }

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();

            if (!data.success) {
                toast.error(data.message);
            } else {
                setGraduates(data.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        list();
    }, []);

    return (
        <div className='min-height'>
            {loading ? (
                <div className="loader">
                    <BeatLoader color={"#36d7b7"} loading={loading} size={15} />
                </div>
            ) : (
                <div className="container lists">
                    <table className="table list-table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Passing Year</th>
                                <th>Current Company</th>
                                <th>Profession</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {graduates.map((graduate, index) => (
                                <tr key={index}>
                                    <td>{graduate.name}</td>
                                    <td>{graduate.department}</td>
                                    <td>{graduate.passingYear}</td>
                                    <td>{graduate.company}</td>
                                    <td>{graduate.role}</td>
                                    <td>{graduate.email}</td>
                                    <td>{graduate.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GraduateList;
