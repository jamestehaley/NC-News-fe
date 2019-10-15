import { Router } from "@reach/router";

import "./App.css";
import HeadBar from "./components/HeadBar";
import TopicBar from "./components/TopicBar";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import Article from "./components/Article";
import * as api from "./utils/api";
import React, { Component } from "react";

export default class App extends Component {
  state = {
    topics: [],
    selected: "",
    user: "James"
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
          <Articles path="/" />
          <Articles path="/:topic" />
          <Article path="/articles/:article_id" />
        </Router>

        <Footer />
      </div>
    );
  }
  componentDidMount = async () => {
    await this.getTopics();
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
      selected = window.location.pathname.slice(1);
    } else {
      selected = event.target.text.toLowerCase();
    }
    if (selected.length === 0) {
      this.setState({ selected: "" });
    } else {
      const description = this.state.topics.find(topic => {
        return topic.slug === selected;
      });
      if (description) {
        this.setState({ selected: description.description });
      }
    }
  };
  resetTopic = () => {
    this.setState({ selected: "" });
  };
}
