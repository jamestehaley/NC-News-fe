import { Router, navigate } from '@reach/router';

import './App.css';
import HeadBar from './components/HeadBar';
import TopicBar from './components/TopicBar';
import Articles from './components/Articles';
import Article from './components/Article';
import * as api from './utils/api';
import React, { Component } from 'react';
import Errors from './components/Errors';

export default class App extends Component {
  state = {
    topics: [],
    description: '',
    user: 'jessjelly'
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
            <Errors default />
            <Articles path="/" />
            <Articles path="/topics/:topic" />
            <Articles path="/users/:author" />
            <Article user={this.state.user} path="/articles/:article_id" />
          </Router>
        </div>
      </>
    );
  }
  componentDidMount = () => {
    this.getTopics();
  };
  getTopics = () => {
    api
      .getAllTopics()
      .then(topics => {
        this.setState({ topics }, () => {
          if (/\/topics\//.test(window.location.pathname)) {
            this.selectTopic(window.location.pathname.slice(8));
          }
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
}
