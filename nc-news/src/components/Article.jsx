import React, { Component } from "react";
import * as api from "../utils/api";
import Voter from "./Voter";
import { Link } from "@reach/router";

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
      votes,
      article_id
    } = this.state.article;
    return (
      <article className="article">
        <h2 className="cardTitle">{title}</h2>
        <p className="cardTopic">{topic}</p>
        <Link
          to={`/users/${author}`}
          className="cardAuthor"
        >{`By ${author}`}</Link>
        <time className="cardPublished">{`Published: ${new Date(created_at)
          .toUTCString()
          .slice(0, -13)}`}</time>
        <p className="cardBody">{body}</p>
        <div className="cardVotes">
          {Object.keys(this.state.article).length > 0 && (
            <Voter votes={votes} type="articles" id={article_id} />
          )}
        </div>
        <p className="cardComments">{`Comments: ${comment_count}`}</p>

        <CommentsList user={this.props.user} uri={this.props.uri} />
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
