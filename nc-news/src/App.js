import { Router, navigate } from '@reach/router';

import './App.css';
import HeadBar from './components/HeadBar';
import TopicBar from './components/TopicBar';
import Articles from './components/Articles';
import Article from './components/Article';
import * as api from './utils/api';
import React, { Component } from 'react';
import Errors from './components/Errors';
import Users from './components/Users';
import NewArticle from './components/NewArticle';

export default class App extends Component {
  state = {
    topics: [],
    description: '',
    user: ''
  };
  render() {
    return (
      <>
        <div className="App">
          <Router className="header">
            <HeadBar user={this.state.user} default />
            <HeadBar
              title={this.state.description}
              user={this.state.user}
              path="/topics/:topic"
            />
            <HeadBar user={this.state.user} path="/users/:author" />
            <HeadBar user={this.state.user} path="/articles/:id" />
          </Router>
          <TopicBar
            topics={this.state.topics}
            handleSelect={this.handleSelect}
            resetTopic={this.resetTopic}
          />
          <Router className="main">
            <Errors user={this.state.user} default />
            <Articles user={this.state.user} topic={''} path="/" />
            <Articles user={this.state.user} path="/topics/:topic" />
            <Articles user={this.state.user} path="/users/:author" />
            <Article user={this.state.user} path="/articles/:article_id" />
            <Users path="/users" handleProfileClick={this.handleProfileClick} />
            <NewArticle
              topics={this.state.topics.map(topic => topic.slug)}
              user={this.state.user}
              addTopic={this.addTopic}
              path="/articles"
            />
          </Router>
        </div>
      </>
    );
  }
  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('user')) || '';
    this.setState({ user });
    this.getTopics();
  };
  getTopics = () => {
    api
      .getAllTopics()
      .then(topics => {
        this.setState(
          {
            topics: topics.sort((a, b) => {
              return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
            })
          },
          () => {
            if (/\/topics\//.test(window.location.pathname)) {
              this.selectTopic(window.location.pathname.slice(8));
            }
          }
        );
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
  handleSelect = event => {
    const topic = event.target.innerText.toLowerCase();

    this.selectTopic(topic);
  };
  selectTopic = topic => {
    const description = this.state.topics.find(item => {
      return item.slug === topic;
    });
    if (description) {
      this.setState({ description: description.description });
    }
  };
  handleProfileClick = user => {
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
  };
  addTopic = topic => {
    this.setState(currentState => {
      return { topics: [topic, ...currentState.topics] };
    });
  };
}
