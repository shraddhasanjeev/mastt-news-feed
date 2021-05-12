import React, {useEffect, useState} from 'react';
import SkeletonArticle from "./skeletons/SkeletonArticle";
import "../index.css";

const News = () => {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(false);
  try {
    useEffect(() => {
      setTimeout(async () => {
        const res = await fetch(
          "https://mastt-news-feed-server.azurewebsites.net/getNews"
        );
        const data = await res.json();
        console.log(data);
        setArticles(data);
      }, 2000)
    }, [])
  }
  catch (error) {
    setError(true);
  }
  if (error) {
    return (
      <div>Error has occured</div>
    )
  }
  
  if (!error) {
    return (
      <div className="articles">
        <header>News Feed</header>

        {articles &&
          articles.map((article) => (
            <div className="article" key={article.id}>
              <img src={article.image} style={{
                display: "block",
  height: "100%",
  width: "100%",
  objectFit: "cover",
  gridColumn: "1/ span 1",
  gridRow: "1/span 2",
              }}/>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </div>
          ))}

        {!articles && [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} />)}
      </div>
    );
  }
}



export default News;