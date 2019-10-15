import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";

export default class Article extends Component {
  state = { article: {}, comments: [] };
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
      <div className="article">
        <div className="cardTitle">{title}</div>
        <div className="cardTopic">{topic}</div>
        <div className="cardAuthor">{`By ${author}`}</div>
        <div className="cardPublished">{`Published: ${new Date(created_at)
          .toUTCString()
          .slice(0, -13)}`}</div>
        <div className="cardBody">{body}</div>
        <div className="cardVotes">{`Votes: ${votes}`}</div>
        <div className="cardComments">{`Comments: ${comment_count}`}</div>
        <div className="comments">
          {this.state.comments.map(comment => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </div>
      </div>
    );
  }
  componentDidMount() {
    api.getArticle(this.props.uri).then(article => {
      this.setState({ article });
    });
    api.getComments(this.props.uri).then(comments => {
      this.setState({ comments });
    });
  }
}
