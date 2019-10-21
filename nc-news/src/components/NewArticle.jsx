import React, { Component } from "react";
import Textbox from "./Textbox";
import * as api from "../utils/api";
import { navigate } from "@reach/router";

export default class NewArticle extends Component {
  state = { title: "", topic: "", topicTitle: "", body: "", incomplete: "" };
  render() {
    return (
      <>
        {!this.props.user.length && (
          <h1>Please sign in to create an article</h1>
        )}
        {this.props.user === "administrator" && (
          <h1>The administrator account cannot post articles.</h1>
        )}
        {!!this.props.user.length && this.props.user !== "administrator" && (
          <form onSubmit={this.handleSubmit}>
            <>
              <label>Article Title:</label>
              <br />
              <Textbox
                box="title"
                current={this.state.title}
                max="70"
                handle={this.handleChange}
              />
              <label>Article Body:</label>
              <br />
              <Textbox
                box="body"
                current={this.state.body}
                max="1000"
                handle={this.handleChange}
              />
              <label>Topic:</label>
              <br />
              <Textbox
                box="topic"
                current={this.state.topic}
                max="15"
                handle={this.handleChange}
              />
              {!this.props.topics.includes(this.state.topic) && (
                <>
                  <label>New Topic Title:</label>
                  <br />
                  <Textbox
                    box="topicTitle"
                    current={this.state.topicTitle}
                    max="40"
                    handle={this.handleChange}
                  />
                </>
              )}
              <p>{this.state.incomplete}</p>
              <button className="post">Post Article</button>
            </>
          </form>
        )}
      </>
    );
  }
  componentDidMount() {
    const topic = JSON.parse(localStorage.getItem("topic"));
    if (topic) {
      this.setState({ topic });
    }
  }
  handleChange = (event, box, max) => {
    if (event.target.value.length <= max) {
      this.setState({ [box]: event.target.value });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topic, topicTitle } = this.state;
    if (!title) {
      this.setState({ incomplete: "The article needs a title." });
    } else if (!body) {
      this.setState({ incomplete: "The article needs a body." });
    } else if (!topic) {
      this.setState({ incomplete: "The article needs a topic" });
    } else if (!this.props.topics.includes(this.state.topic) && !topicTitle) {
      this.setState({
        incomplete:
          "New topics need a short description which will act as their title."
      });
    } else {
      if (!this.props.topics.includes(this.state.topic)) {
        this.props.addTopic({
          slug: this.state.topic,
          description: this.state.topicTitle
        });
        api.postTopic(topic, topicTitle).then(() => {
          api.postArticle(title, topic, this.props.user, body).then(data => {
            navigate(`/articles/${data.article_id}`);
          });
        });
      } else {
        api.postArticle(title, topic, this.props.user, body).then(data => {
          navigate(`/articles/${data.article_id}`);
        });
      }
    }
  };
}
