import React, { Component } from "react";

export default class Voter extends Component {
  state = {
    votes: 0
  };
  render() {
    return (
      <div className="voter">
        <p>Votes: {this.state.votes}</p>
        <div className="rotate">
          <button>{`<`}</button>
          <button>{`>`}</button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.setState({ votes: this.props.votes });
  }
}
