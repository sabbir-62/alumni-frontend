import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';
import './addNews.css'

const AddNews = () => {
    const [state, setState] = useState({
        title: "",
        description: ""

    })

    const setValues = (key, value) => {
        setState({
          ...state,
          [key]: value,
        });
      };

      const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {title, description} = state;

        // backend api endpoint
        const url = "http://localhost:8000/api/v1/create-news";

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                title, description
            })
        })
       .then((response) => response.json())
       .then((data) => {
            if(data.success){
                toast.success(data.message);
                if(data.success == true){
                    navigate('/news');
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
    return (
        <div className="min-height add-news-page">
                <div className="add-news-box">
                    <form action="" className='news-headline'>
                        <input type="text" name="title" id='heading' className='input-heading' autoComplete='off' onChange={(e) => {setValues("title", e.target.value)}} placeholder="Enter News Heading"/>
                    </form>
                    <div>
                        <textarea name="description" className = 'news-text'  id="" cols="" rows="" onChange={(e) => {setValues("description", e.target.value)}} placeholder='Enter News Content'></textarea>
                    </div>
                    <div className="news-button-container">
                        <button type="submit" className="btn btn-primary add-news-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>    
        </div>
    );
};

export default AddNews;