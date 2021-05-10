import React, {useEffect, useState} from 'react';
import SkeletonArticle from "./skeletons/SkeletonArticle";

const News = () => {
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        setTimeout(async () => {
            const res = await fetch(
              "https://mastt-news-feed-server.azurewebsites.net/getNews"
            );
            const data = await res.json();
            setArticles(data);
        },2000)
    },[])

    return (
      <div className="articles">
        <h1>News Feed</h1>

        {articles &&
          articles.map((article) => (
            <div className="article" key={article.id}>
              <img src={article.image}>news image</img>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          ))}

        {!articles && [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} />)}
      </div>
    );
}


export default News;