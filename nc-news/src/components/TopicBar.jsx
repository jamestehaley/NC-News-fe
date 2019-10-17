import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

import { Link } from "@reach/router";

export default class TopicBar extends Component {
  state = { visible: true };

  render() {
    return (
      <Menu width={"20%"} className="topic">
        <li className="menu-item">
          <Link to="/" onClick={this.props.resetTopic}>
            All Articles
          </Link>
        </li>
        {this.props.topics.map(topic => {
          return (
            <li
              className="menu-item"
              key={topic.slug}
              onClick={this.props.handleSelect}
            >
              <Link to={`/topics/${topic.slug}`}>
                {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
              </Link>
            </li>
          );
        })}
      </Menu>
    );
  }
}
