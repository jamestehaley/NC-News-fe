import React, { Component } from "react";

import { Link } from "@reach/router";

export default class TopicBar extends Component {
  state = { visible: true };

  render() {
    return (
      <div className="topic">
        <li>
          <Link to="/" onClick={this.props.resetTopic}>
            All Articles
          </Link>
        </li>
        {this.props.topics.map(topic => {
          return (
            <li key={topic.slug} onClick={this.props.selectTopic}>
              <Link to={`/${topic.slug}`}>
                {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
              </Link>
            </li>
          );
        })}
      </div>
    );
  }
}
