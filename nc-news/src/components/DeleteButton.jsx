import React, { Component } from "react";
import * as api from "../utils/api";

export default class DeleteButton extends Component {
  state = { confirm: false };
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.confirm ? "Confirm deletion" : "Delete comment"}
      </button>
    );
  }
  handleClick = () => {
    if (this.state.confirm === false) {
      this.setState({ confirm: true });
    } else {
      api.deleteComment(this.props.id);
      this.props.optimisticDelete();
    }
  };
}
