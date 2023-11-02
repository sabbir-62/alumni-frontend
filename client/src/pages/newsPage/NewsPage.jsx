import { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import './newsPage.css'
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";
import Cookies from "js-cookie";



/*-----------NewsPage Component----------*/
const NewsPage = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState({
        title: [],
        description: [],
        date: [],
        userEmail: []
    });
   


    // fetch all post
    const getNews = async() => {
        const url = "https://alumni-backend-nu.vercel.app/api/v1/post";

        const cookie = Cookies.get("myCookie");

        if (!cookie) {
            navigate('/login');
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





    // Style adding for read more
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


    // Add new post
    const navigate = useNavigate();
    const addNews = async()=> {
        navigate('/create-post')
    }


    // Navigate my post page
    const myPost = () => {
        navigate("/my-post")
    }



   
    // Return JSX
    return (
       <div className="newsPage min-height">
            <div className="news-btn">
                <button className="btn btn-primary add-news-btn" onClick={addNews}>Add Post</button>
                <button className="btn btn-primary add-news-btn ms-2" onClick={myPost}>My Post</button>
            </div>
        
            <div className="news-container container"> 
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
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
       </div>
    );
};

export default NewsPage;
