import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';

import { Link } from '@reach/router';

export default class TopicBar extends Component {
  state = { visible: true };

  render() {
    return (
      <Menu width={'20%'} className="topic">
        <li>
          <Link className="menu-item" to="/" onClick={this.props.handleSelect}>
            All Articles
          </Link>
        </li>
        {this.props.topics.map(topic => {
          return (
            <li key={topic.slug} onClick={this.props.handleSelect}>
              <Link className="menu-item" to={`/topics/${topic.slug}`}>
                {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
              </Link>
            </li>
          );
        })}
      </Menu>
    );
  }
}
