import { useEffect, useState } from "react";
//import './newsPage.css'
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


/*----------MyNews Component---------*/
const MyNews = () => {
    
    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState({
        title: [],
        description: [],
        date: [],
    });

    const [state, setState] = useState({
        email: ""
    })


    const navigate = useNavigate();


    // Getting Email information from database
    const getEmail = async() => {
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



    //Get-My post
    const getNews = async() => {
       
        const url = "http://localhost:8000/api/v1/post";

        const cookie = Cookies.get("myCookie");
        if (!cookie) {
            //navigate('/login');
            toast.warning("Please Login");
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
                const titles = data.news.map(newsItem => newsItem.title);
                const descriptions = data.news.map(newsItem => newsItem.description);
                const dates = data.news.map(newsItem => new Date(newsItem.createdAt).toLocaleDateString());
                
                // Update the state with the extracted data
                setNews({
                    title: titles,
                    description: descriptions,
                    date: dates,
                });
                setLoading(false)
            }
        });
    }

    

    useEffect(() => {
        getNews();
    }, []);



    let count = 0;
    const handleClick = (index) => { 
        const descriptionElements = document.getElementsByClassName("description");

        if (descriptionElements.length > index) {
            descriptionElements[index].style.color = "rgb(48, 47, 47)";
            descriptionElements[index].style.height = '100%';
            count = count + 1;
            
            if(count == 2){
                descriptionElements[index].style.height = '4.5rem';
                count = 0;
            }
        }
    }



     /*----------Delete News----------*/
    const deleteNews = async(title)=> {
        //backend api endpoint
        const url = "http://localhost:8000/api/v1/delete-post";

        // post data using fetch api
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                title
            }),
        })
       .then((response) => response.json())
       .then((data) => {
            if(data.success){
                toast.success("Delete Success");
                setLoading(true)
                setTimeout(() => {
                    window.location.reload();
                    setLoading(false)
                }, 1700)
            }
            else{
                toast.error(data.message)
            }
       })
       .catch((error) => {
        console.log(error)
       })
    }




    return (
        <div>
            <div className="news-container container min-height"> 
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
                    <div className="news">
                        {news.title.map((title, index) => 
                            ( 
                            <div key={index} className="news-block">
                                <p className="title">{title}</p>
                                <p className="news-date">{news.date[index]}</p>
                                <p className="description">{news.description[index]}</p>
                                <div className="news-buttons">
                                    <button id="button" className="btn btn-success mt-3 news-button" onClick={()=>handleClick(index)}>Read More</button>
                                    <button id="button" className="btn btn-danger mt-3 delete-btn news-button" onClick={()=>deleteNews(title)}>Delete</button>

                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
       </div>
    );
};

export default MyNews;