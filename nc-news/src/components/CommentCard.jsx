import { secondsToTimeString } from '../utils/utils';
import DeleteButton from './DeleteButton';
import React, { Component } from 'react';
import Voter from './Voter';
import { Link } from '@reach/router';

export default class CommentCard extends Component {
  state = { deleted: false };
  render() {
    const { comment, user, status } = this.props;
    return (
      <section className={`commentCard ${status}`}>
        {!this.state.deleted && (
          <>
            <Link
              to={`/users/${comment.author}`}
              className="cardAuthor"
            >{`By ${comment.author}`}</Link>
            <p className="cardBody">{comment.body}</p>
            <p className="cardPublished">
              {secondsToTimeString(
                Math.floor((Date.now() - Date.parse(comment.created_at)) / 1000)
              )}{' '}
              ago
            </p>
            {user === comment.author && (
              <DeleteButton
                optimisticDelete={this.optimisticDelete}
                id={comment.comment_id}
              />
            )}
            <div className="cardVotes">
              <Voter
                votes={comment.votes}
                type="comments"
                id={comment.comment_id}
              />
            </div>
          </>
        )}
        {this.state.deleted && <h1 className="commentBody">DELETED!</h1>}
      </section>
    );
  }
  optimisticDelete = () => {
    this.setState(currentState => {
      return { deleted: !currentState.deleted };
    });
  };
}
