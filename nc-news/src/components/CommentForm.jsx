import React, { Component } from 'react';
import * as api from '../utils/api';
import { navigate } from '@reach/router';

export default class CommentForm extends Component {
  state = {
    comment: ''
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.user === 'administrator' && (
          <p>The administrator account cannot post comments.</p>
        )}
        {!this.props.user.length && <p>Please sign in to post comments!</p>}
        {!!this.props.user.length && this.props.user !== 'administrator' && (
          <>
            <p>Post a comment!</p>
            <input
              className={`textbox ${
                this.state.comment.length === 180 ? 'full' : ''
              }`}
              onChange={this.handleChange}
              value={this.state.comment}
              type="text"
            />
            <p>Characters left:{180 - this.state.comment.length}</p>
            <button className="post">Post</button>
          </>
        )}
      </form>
    );
  }
  handleChange = event => {
    if (event.target.value.length < 181) {
      this.setState({ comment: event.target.value });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.comment.length > 0 && !!this.props.user.length) {
      api
        .postComment(this.state.comment, this.props.user, this.props.uri)
        .catch(err => {
          navigate('/Error', {
            state: {
              msg: `The article you were commenting on no longer exists!`
            },
            replace: true
          });
        });
      this.props.addComment(this.state.comment, this.props.user);
      this.setState({ comment: '' });
    }
  };
}
