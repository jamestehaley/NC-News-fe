import React, { Component } from 'react';
import * as api from '../utils/api';
import Voter from './Voter';
import { Link } from '@reach/router';
import DeleteButton from './DeleteButton';
import { navigate } from '@reach/router';
import CommentsList from './CommentsList';

export default class Article extends Component {
  state = { article: {}, deleted: false };
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
        {!this.state.deleted && (
          <>
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
            {(this.props.user === author ||
              this.props.user === 'administrator') && (
              <div className="delete">
                <DeleteButton
                  optimisticDelete={this.optimisticDelete}
                  id={article_id}
                />
              </div>
            )}
            <p className="cardComments">{`Comments: ${comment_count}`}</p>

            <CommentsList
              comment_count={comment_count}
              user={this.props.user}
              uri={this.props.uri}
            />
          </>
        )}
        {this.state.deleted && <h1>DELETED!</h1>}
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
        let msg;
        if (err.message === 'Network Error')
          msg = `Network error! It is likely that you have lost connection`;
        else if (!/d+/.test(this.props.article_id)) {
          msg = `Articles must have numerical IDs, "${this.props.article_id}" is not a valid ID!`;
        } else msg = `Article ${this.props.article_id} not found!`;
        navigate('/Error', {
          state: { msg },
          replace: true
        });
      });
  }
  optimisticDelete = () => {
    this.setState(currentState => {
      return { deleted: !currentState.deleted };
    });
  };
}
