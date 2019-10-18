import React, { Component } from 'react';
import * as api from '../utils/api';
import { shortenNumbers } from '../utils/utils';

export default class Voter extends Component {
  state = {
    votes: 0,
    add: 0
  };
  render() {
    const { add } = this.state;
    return (
      <div className="voter">
        <p>Votes: {shortenNumbers(this.state.votes + this.state.add)}</p>
        <div className="rotate">
          <button
            className={add === 1 ? 'pressed' : 'notPressed'}
            name="+1"
            onClick={this.handleVote}
          >{`<`}</button>
          <button
            className={add === -1 ? 'pressed' : 'notPressed'}
            name="-1"
            onClick={this.handleVote}
          >{`>`}</button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.setState({ votes: this.props.votes });
  }
  handleVote = event => {
    const { add } = this.state;
    const oldAdd = add;
    let newAdd;
    if (event.target.name === '+1') {
      if (add === 1) newAdd = 0;
      else if (add < 1) newAdd = 1;
    } else if (event.target.name === '-1') {
      if (add === -1) newAdd = 0;
      else if (add > -1) newAdd = -1;
    }
    this.setState({ add: newAdd }, () => {});
    api.incVotes(this.props.type, this.props.id, newAdd - oldAdd).catch(() => {
      this.setState({ add: -newAdd }, () => {});
    });
  };
}
