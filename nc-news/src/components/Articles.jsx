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
      <main>
        <details>
          <summary>Advanced</summary>
          <p>
            Total {this.props.topic && `${this.props.topic} `}Articles:{" "}
            {this.state.article_count}
          </p>
          <select>
            <option value="recent">Most recent</option>
            <option value="old">Oldest</option>
            <option value="comments">Most comments</option>
            <option value="votes">Most votes</option>
          </select>
        </details>

        {this.state.articles.map(article => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </main>
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
