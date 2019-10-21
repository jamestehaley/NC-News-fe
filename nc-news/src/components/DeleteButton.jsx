import React, { Component } from "react";
import * as api from "../utils/api";

export default class DeleteButton extends Component {
  state = { confirm: false };
  render() {
    return (
      <button className="delete" onClick={this.handleClick}>
        {this.state.confirm ? "Confirm deletion" : `Delete`}
      </button>
    );
  }
  handleClick = () => {
    if (this.state.confirm === false) {
      this.setState({ confirm: true });
    } else {
      api
        .delete(this.props.id, this.props.type)
        .then(() => {
          if (this.props.topic && this.props.type === "articles") {
            api.getArticles(this.props.topic).then(data => {
              if (data.article_count === 0) {
                api.deleteTopic(this.props.topic);
              }
            });
          }
        })
        .catch(() => {
          this.props.optimisticDelete();
        });
      this.props.optimisticDelete();
    }
  };
}
