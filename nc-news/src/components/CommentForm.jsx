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
        <p>
          {!!this.props.user.length
            ? 'Post a comment!'
            : 'Please sign in to post a comment.'}
        </p>
        {!!this.props.user.length && (
          <>
            <input
              className={`textbox ${
                this.state.comment.length === 140 ? 'full' : ''
              }`}
              onChange={this.handleChange}
              value={this.state.comment}
              type="text"
            />
            <p>Characters left:{140 - this.state.comment.length}</p>
            <button className="post">Post</button>
          </>
        )}
      </form>
    );
  }
  handleChange = event => {
    if (event.target.value.length < 141) {
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
