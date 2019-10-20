import React, { Component } from 'react';
import * as api from '../utils/api';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import { navigate } from '@reach/router';

export default class Articles extends Component {
  state = {
    articles: [],
    article_count: 0,
    sort_by: 'created_at',
    order: 'desc',
    p: 0,
    checked: false
  };
  render() {
    return (
      <main>
        <section className="salmon">
          <p>
            Total {this.props.topic && `${this.props.topic} `}articles:{' '}
            {this.state.article_count}
          </p>
          <span>Sort by: </span>
          <select onChange={this.changeSort}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="comments">Most comments</option>
            <option value="votes">Most votes</option>
          </select>
          <br />
          {this.state.article_count > 10 && (
            <Pagination
              p={this.state.p}
              changePage={this.changePage}
              total={Math.floor(this.state.article_count / 10)}
            />
          )}
        </section>
        {this.state.checked && this.state.article_count === '0' && (
          <h1>{`There are no articles about ${this.props.topic}, would you like to make one?`}</h1>
        )}
        {this.state.articles.map((article, index) => {
          return (
            <ArticleCard
              status={index % 2 === 0 ? 'odd' : 'even'}
              key={article.article_id}
              article={article}
            />
          );
        })}
        {this.state.article_count > 10 && (
          <Pagination
            p={this.state.p}
            changePage={this.changePage}
            total={Math.floor(this.state.article_count / 10)}
          />
        )}
      </main>
    );
  }
  componentDidMount() {
    const sort_by = JSON.parse(localStorage.getItem('sort_by'));
    const order = JSON.parse(localStorage.getItem('order'));
    this.setState({ order, sort_by }, () => {
      this.fetchArticles();
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      this.setState({ p: 0 }, () => {
        this.fetchArticles();
      });
    }
  }
  componentWillUnmount() {
    localStorage.setItem('sort_by', JSON.stringify(this.state.sort_by));
    localStorage.setItem('order', JSON.stringify(this.state.order));
  }
  changeSort = event => {
    let sort_by;
    let order;
    if (event.target.value === 'comments') {
      sort_by = 'comment_count';
      order = 'desc';
    } else if (event.target.value === 'votes') {
      sort_by = 'votes';
      order = 'desc';
    } else if (event.target.value === 'oldest') {
      sort_by = 'created_at';
      order = 'asc';
    } else if (event.target.value === 'newest') {
      sort_by = 'created_at';
      order = 'desc';
    }
    this.setState({ order, sort_by, p: 0 }, () => {
      this.fetchArticles();
    });
  };
  fetchArticles = () => {
    api
      .getArticles(
        this.props.topic,
        this.state.sort_by,
        this.state.order,
        this.props.author,
        this.state.p
      )
      .then(data => {
        this.setState({
          articles: data.articles,
          article_count: data.article_count,
          checked: true
        });
      })
      .catch(err => {
        let msg;
        if (err.message === 'Network Error')
          msg = `Network error! It is likely that you have lost connection`;
        else msg = `Unknown Error!`;
        navigate('/Error', {
          state: { msg },
          replace: true
        });
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
        this.fetchArticles();
      }
    );
  };
}
