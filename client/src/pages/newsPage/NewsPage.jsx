import { useEffect, useState } from "react";
import './newsPage.css'

const newsPage = () => {
    const [news, setNews] = useState({
        title: [],
        description: []
    });

    const getNews = async() => {
        const url = "https://alumni-backend-git-master-sabbir-62.vercel.app/api/v1/news";

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
                // Extract titles and descriptions into separate arrays
                const titles = data.news.map(newsItem => newsItem.title);
                const descriptions = data.news.map(newsItem => newsItem.description);

                console.log("titles: ", titles, "\n", "Descriptions: ", descriptions)

                // Update the state with the extracted data
                setNews({
                    title: titles,
                    description: descriptions
                });
            }
        });
    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="news-container">
            {news.title.map((title, index) => (
                <div key={index}>
                    <p>Title: {title}</p>
                    <p>Description: {news.description[index]}</p>
                </div>
            ))}
        </div>
    );
};

export default newsPage;
