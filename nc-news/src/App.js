import { Router } from "@reach/router";

import "./App.css";
import HeadBar from "./components/HeadBar";
import TopicBar from "./components/TopicBar";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import Article from "./components/Article";
import * as api from "./utils/api";
import React, { Component } from "react";
import Errors from "./components/Errors";

export default class App extends Component {
  state = {
    topics: [],
    selected: "",
    user: "jessjelly"
  };
  render() {
    return (
      <div className="App">
        <HeadBar title={this.state.selected} user={this.state.user} />
        <TopicBar
          topics={this.state.topics}
          selectTopic={this.selectTopic}
          resetTopic={this.resetTopic}
        />
        <Router className="main">
          <Errors default />
          <Articles path="/" />
          <Articles path="/topics/:topic" />
          <Article user={this.state.user} path="/articles/:article_id" />
        </Router>

        <Footer />
      </div>
    );
  }
  componentDidMount = () => {
    this.getTopics();
  };
  getTopics = () => {
    api.getAllTopics().then(topics => {
      this.setState({ topics });
      this.selectTopic();
    });
  };
  selectTopic = event => {
    let selected = "";
    if (!event) {
      selected = window.location.pathname.slice(8);
    } else {
      selected = event.target.text.toLowerCase();
    }
    if (selected.length === 0) {
      this.setState({ selected: "All Stories" });
    } else {
      const description = this.state.topics.find(topic => {
        return topic.slug === selected;
      });
      if (description) {
        this.setState({ selected: description.description });
      } else {
        this.setState({ selected: "All Stories" });
      }
    }
  };
  resetTopic = () => {
    this.setState({ selected: "All Stories" });
  };
}
