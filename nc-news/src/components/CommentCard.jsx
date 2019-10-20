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
            <div className="cardAuthor">
              <Link
                to={`/users/${comment.author}`}
              >{`By ${comment.author}`}</Link>
            </div>
            <p className="cardPublished">
              {secondsToTimeString(
                Math.floor((Date.now() - Date.parse(comment.created_at)) / 1000)
              )}{' '}
              ago
            </p>
            <p className="cardBody">{comment.body}</p>

            <div className="cardVotes">
              <Voter
                votes={comment.votes}
                type="comments"
                id={comment.comment_id}
              />
            </div>
            {(user === comment.author || user === 'administrator') && (
              <DeleteButton
                optimisticDelete={this.optimisticDelete}
                id={comment.comment_id}
              />
            )}
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
