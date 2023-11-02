/*----------Imports----------*/
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';
import Cookies from "js-cookie";
import './addNews.css'


/*----------Addnews Component----------*/
const AddNews = () => {

    //const [loading, setLoading] = useState(true)  //for set loading spinner
    const [state, setState] = useState({
        title: "",
        description: "",
        email: ""
    })

    const navigate = useNavigate(); // Call useNavigate as a function

    // Getting Email information from database
    const getEmail = async() => {
        const cookie = Cookies.get("myCookie");
        if(!cookie){
            toast.warning("Please Login")
            navigate('/login')
        }
        const url = "https://alumni-backend-nu.vercel.app/api/v1/about";
        
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
                    email: data.user.email,
                })
            }
           
       })
       .catch((error) => {
            console.log(error);
       })  
      
    }



    useEffect(() => {
        getEmail();
    }, []); // Empty dependency array to run the effect once

  
  


    //Set Input Values
    const setValues = (key, value) => {
        setState({
          ...state,
          [key]: value,
        });
      };



    // Submit form data to database
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {title, description, email} = state;

        //https://alumni-backend-nu.vercel.app
        // backend api endpoint
        const url = "https://alumni-backend-nu.vercel.app/api/v1/create-post";

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                title, description, email
            })
        })
       .then((response) => response.json())
       .then((data) => {
            if(data.success){
                toast.success(data.message);
                navigate("/post")
            }
            else{
                toast.error("Something went wrong!")
            }
       })
       .catch((error) => {
        console.log(error)
       })
    }


    return (
        <div className="min-height add-news-page">
                <div className="add-news-box">
                    <form action="" className='news-headline'>
                        <input type="text" name="title" id='heading' className='input-heading' autoComplete='off' onChange={(e) => {setValues("title", e.target.value)}} placeholder="Enter Post Heading"/>
                    </form>
                    <div>
                        <textarea name="description" className = 'news-text'  id="" cols="" rows="" onChange={(e) => {setValues("description", e.target.value)}} placeholder='Enter Post Content'></textarea>
                    </div>
                    <div className="news-button-container">
                        <button type="submit" className="btn btn-primary add-news-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>    
        </div>
    );
};

export default AddNews;