import React, { Component } from 'react';
import * as api from '../utils/api';
import UserCard from './UserCard';
import { navigate } from '@reach/router';
export default class Users extends Component {
  state = {
    users: []
  };
  render() {
    const admin = {
      username: 'administrator',
      avatar_url:
        'https://i.kym-cdn.com/photos/images/newsfeed/001/090/170/192.png',
      name: 'Administrator'
    };
    return (
      <ul>
        {' '}
        {!!this.state.users.length && (
          <>
            {[admin, ...this.state.users].map(user => {
              return (
                <UserCard
                  key={user.username}
                  user={user}
                  handleProfileClick={this.props.handleProfileClick}
                />
              );
            })}
          </>
        )}
      </ul>
    );
  }
  componentDidMount() {
    api
      .getAllUsers()
      .then(users => {
        this.setState({ users });
      })
      .catch(err => {
        let msg;
        if (err.message === 'Network Error')
          msg = `Network error! It is likely that you have lost connection`;
        else msg = 'Unknown Error!';
        navigate('/Error', {
          state: { msg },
          replace: true
        });
      });
  }
}
