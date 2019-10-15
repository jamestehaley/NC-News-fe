import React, { Component } from "react";
import * as api from "../utils/api";

import { navigate } from "@reach/router";
import CommentsList from "./CommentsList";

export default class Article extends Component {
  state = { article: {} };
  render() {
    const {
      author,
      body,
      comment_count,
      created_at,
      title,
      topic,
      votes
    } = this.state.article;
    return (
      <article className="article">
        <h2 className="cardTitle">{title}</h2>
        <p className="cardTopic">{topic}</p>
        <p className="cardAuthor">{`By ${author}`}</p>
        <time className="cardPublished">{`Published: ${new Date(created_at)
          .toUTCString()
          .slice(0, -13)}`}</time>
        <p className="cardBody">{body}</p>
        <p className="cardVotes">{`Votes: ${votes}`}</p>
        <p className="cardComments">{`Comments: ${comment_count}`}</p>
        {Object.keys(this.state.article).length > 0 && (
          <CommentsList uri={this.props.uri} />
        )}
      </article>
    );
  }
  componentDidMount() {
    api
      .getArticle(this.props.uri)
      .then(article => {
        this.setState({ article });
      })
      .catch(err => {
        navigate("/Error", {
          state: { msg: `Article ${this.props.article_id} not found!` },
          replace: true
        });
      });
  }
}
