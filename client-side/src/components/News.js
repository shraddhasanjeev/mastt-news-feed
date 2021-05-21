import React from 'react';
import SkeletonArticle from "./skeletons/SkeletonArticle";
import axios from "axios"
import "../index.css";
import { motion } from "framer-motion";

class News extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      error: false,
      disliked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState((state) => ({
      disliked: !state.disliked,
    }));
  }

  
  

  componentWillMount() {
    axios({
      method: "GET",
      url: "https://mastt-news-feed-server.azurewebsites.net/getNews",
    })
      .then((res) => {
        this.setState({ articles: res.data });
        console.log(this.articles);
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  componentDidMount() {
    setInterval(() => {
      axios({
        method: "GET",
        url: "https://mastt-news-feed-server.azurewebsites.net/getNews",
      })
        .then((res) => {
          this.setState({ articles: res.data });
          console.log("News Updated");
        })
        .catch((error) => {
          this.setState({ error: true });
        });
    }, 120 * 1000);
  }

  render() {
    if (this.state.error) {
      return <div>Error has occured</div>;
    }

    if (!this.state.error) {
      return (
        <div className="articles">
          <header>News Feed</header>

          {this.state.articles &&
            this.state.articles.map((article) => (
              <div className="article" key={article.id}>
                <img src={article.image} />
                <h2>
                  {article.title}
                  {article.country}
                </h2>

                <p
                  onClick={() =>
                    window.open(`${article.sourceUrl}`)
                  }
                >
                  {article.content}
                </p>
                <motion.div
                  style={{
                    gridColumn: "2",
                    gridRow: "3",
                    fontFamily: '"Quicksand", sans-serif',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{
                    scale: 1.05,
                    borderRadius: "100%",
                  }}
                >
                  <button onClick={this.handleClick}>
                    {this.state.disliked ? "This is not relevent" : "Flagged"}
                  </button>
                </motion.div>
              </div>
            ))}

          {!this.state.articles &&
            [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} />)}
        </div>
      );
    }
  }
} export default News;
