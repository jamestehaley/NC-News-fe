import React, { Component } from 'react';
import CommentCard from './CommentCard';
import * as api from '../utils/api';
import CommentForm from './CommentForm';
import Pagination from './Pagination';

export default class CommentsList extends Component {
  state = { comments: [], p: 0 };
  render() {
    return (
      <div className="comments">
        <h3>Comments</h3>

        <CommentForm
          user={this.props.user}
          uri={this.props.uri}
          addComment={this.addComment}
        />
        {this.props.comment_count > 10 && (
          <Pagination
            p={this.state.p}
            changePage={this.changePage}
            total={Math.floor(this.state.comments.length / 10)}
          />
        )}
        {this.state.comments.map((comment, index) => {
          return (
            <CommentCard
              status={index % 2 === 0 ? 'odd' : 'even'}
              key={comment.comment_id}
              comment={comment}
              user={this.props.user}
            />
          );
        })}
        {this.props.comment_count > 10 && (
          <Pagination
            p={this.state.p}
            changePage={this.changePage}
            total={Math.floor(this.state.comments.length / 10)}
          />
        )}
      </div>
    );
  }
  componentDidMount() {
    this.fetchComments();
  }
  fetchComments = () => {
    api.getComments(this.props.uri, this.state.p).then(comments => {
      this.setState({ comments });
    });
  };
  addComment = body => {
    console.log(this.props.user);
    const object = {
      body,
      author: this.props.user,
      created_at: Date.now(),
      comment_id: Date.now(),
      votes: 0
    };
    this.setState(currentState => {
      return { comments: [object, ...currentState.comments] };
    });
  };
  changePage = value => {
    this.setState(
      currentState => {
        return {
          p: currentState.p + value
        };
      },
      () => {
        this.fetchComments();
      }
    );
  };
}
