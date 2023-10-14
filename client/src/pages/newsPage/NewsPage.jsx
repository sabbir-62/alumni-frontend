import { useEffect, useState } from "react";
import './newsPage.css'

const NewsPage = () => {
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
                alert(data.message);
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
            }
        });
    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="news-container">
            <div className="news">
                {news.title.map((title, index) => 
                    ( 
                    <div key={index} className="m-5 news-block p-5">
                        <p className="title">{title}</p>
                        <p className="news-date">{news.date[index]}</p>
                        <p className="description">{news.description[index]}</p>
                        <button className="btn btn-success mt-3">Read More</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
