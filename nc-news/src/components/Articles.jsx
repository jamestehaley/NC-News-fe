import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";

export default class Articles extends Component {
  state = {
    articles: [],
    article_count: 0
  };
  render() {
    return (
      <div>
        <p>
          Total Articles{this.props.topic && ` about ${this.props.topic}`}:{" "}
          {this.state.article_count}
        </p>
        {this.state.articles.map(article => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </div>
    );
  }
  componentDidMount() {
    api.getArticles(this.props.topic).then(data => {
      this.setState({
        articles: data.articles,
        article_count: data.article_count
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      api.getArticles(this.props.topic).then(data => {
        this.setState({
          articles: data.articles,
          article_count: data.article_count
        });
      });
    }
  }
}
