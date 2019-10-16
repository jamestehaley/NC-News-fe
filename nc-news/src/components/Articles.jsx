import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";

export default class Articles extends Component {
  state = {
    articles: [],
    article_count: 0,
    sort_by: "created_at",
    order: "desc"
  };
  render() {
    return (
      <main>
        <p>
          Total {this.props.topic && `${this.props.topic} `}Articles:{" "}
          {this.state.article_count}
        </p>

        <span>Sort by: </span>
        <select onChange={this.changeSort}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="comments">Most comments</option>
          <option value="votes">Most votes</option>
        </select>

        {this.state.articles.map(article => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </main>
    );
  }
  componentDidMount() {
    const sort_by = JSON.parse(localStorage.getItem("sort_by"));
    const order = JSON.parse(localStorage.getItem("order"));
    console.log("saved data for sort", sort_by, order);
    this.setState({ order, sort_by }, () => {
      this.fetchArticles();
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles();
    }
  }
  componentWillUnmount() {
    console.log(this.state.sort_by, this.state.order);
    localStorage.setItem("sort_by", JSON.stringify(this.state.sort_by));
    localStorage.setItem("order", JSON.stringify(this.state.order));
  }
  changeSort = event => {
    let sort_by;
    let order;
    if (event.target.value === "comments") {
      sort_by = "comment_count";
      order = "desc";
    } else if (event.target.value === "votes") {
      sort_by = "votes";
      order = "desc";
    } else if (event.target.value === "oldest") {
      sort_by = "created_at";
      order = "asc";
    } else if (event.target.value === "newest") {
      sort_by = "created_at";
      order = "desc";
    }
    this.setState({ order, sort_by }, () => {
      this.fetchArticles();
    });
  };
  fetchArticles = () => {
    api
      .getArticles(this.props.topic, this.state.sort_by, this.state.order)
      .then(data => {
        this.setState({
          articles: data.articles,
          article_count: data.article_count
        });
      })
      .catch(console.dir);
  };
}
