import React, { Component } from "react";
import CommentCard from "./CommentCard";
import * as api from "../utils/api";
import CommentForm from "./CommentForm";

export default class CommentsList extends Component {
  state = { comments: [] };
  render() {
    return (
      <div className="comments">
        <CommentForm
          user={this.props.user}
          uri={this.props.uri}
          addComment={this.addComment}
        />
        {this.state.comments.map(comment => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              user={this.props.user}
            />
          );
        })}
      </div>
    );
  }
  componentDidMount() {
    api.getComments(this.props.uri).then(comments => {
      this.setState({ comments });
    });
  }
  addComment = body => {
    console.log(this.props.user);
    const object = {
      body,
      author: this.props.user,
      created_at: Date.now(),
      comment_id: Date.now()
    };
    this.setState(currentState => {
      return { comments: [object, ...currentState.comments] };
    });
  };
}
