import React, { Component } from "react";
import CommentCard from "./CommentCard";
import * as api from "../utils/api";

export default class CommentsList extends Component {
  state = { comments: [] };
  render() {
    return (
      <div className="comments">
        {this.state.comments.map(comment => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </div>
    );
  }
  componentDidMount() {
    api.getComments(this.props.uri).then(comments => {
      this.setState({ comments });
    });
  }
}
