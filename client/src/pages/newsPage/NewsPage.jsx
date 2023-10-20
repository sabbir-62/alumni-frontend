import { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import './newsPage.css'
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";


const NewsPage = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState({
        title: [],
        description: [],
        date: []
    });

    const getNews = async() => {
        const url = "http://localhost:8000/api/v1/news";

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
                    date: dates
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


    const navigate = useNavigate(); // Call useNavigate as a function
    const addNews = async()=> {
        navigate('/create-news')
    }
    

    return (
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
                            <button id="button" className="btn btn-success mt-3" onClick={()=>handleClick(index)}>Read More</button>
                        </div>
                    ))}
                    <div className="news-btn">
                        <button className="btn btn-primary add-news-btn" onClick={addNews}>Add New News</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default NewsPage;
