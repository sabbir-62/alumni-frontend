import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import './myNews.css'


/*----------MyNews Component---------*/
const MyNews = () => {
    
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        email: ""
    })

    const [news, setNews] = useState({
        title: [],
        description: [],
        date: [],
        email: [],
    });


    const navigate = useNavigate();


    // fetching logged in user email
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
    },[]); // Empty dependency array to run the effect once



    // fetching login user post
    const getNews = async() => {
        const url = "http://localhost:8000/api/v1/post";


        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            
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
                const emails = data.news.map(newsItem => newsItem.email);
                // Update the state with the extracted data
                setNews({
                    title: titles,
                    description: descriptions,
                    date: dates,
                    email: emails
                });
                setLoading(false)
            }
        });
    }

    

    useEffect(() => {
        getNews();
    }, []);



     //Delete News
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
                }, 1500)
            }
            else{
                toast.error(data.message)
            }
       })
       .catch((error) => {
        console.log(error)
       })
    }

    
    let postCount = 0;
    
        return (
            <div>
                <div className="news-container container min-height"> 
                    {loading ? 
                    (
                        <div className="loader">
                            <BeatLoader color={"#36d7b7"} loading={loading} size={15} />
                        </div>
                    ) : 
                    (
                        <div className="news">
                            {news.title.map((title, index) => {
                                if (state.email === news.email[index]) {
                                    postCount += 1; // Increment postCount for each matching post
                                    return (
                                        <div key={index} className="news-block">
                                            <p className="title">{title}</p>
                                            <p className="news-date">{news.date[index]}</p>
                                            <p className="description">{news.description[index]}</p>
                                            <div className="news-buttons">
                                                <button id="button" className="btn btn-danger mt-3 delete-btn news-button" onClick={()=>deleteNews(title)}>Delete</button>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                            {postCount == 0 && (
                                <div>
                                    <p className="no-post-text">No Posts Yet</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };
    
    export default MyNews;
    