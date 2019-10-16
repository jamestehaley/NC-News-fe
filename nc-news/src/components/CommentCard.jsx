import { secondsToTimeString } from "../utils/utils";
import DeleteButton from "./DeleteButton";
import React, { Component } from "react";
import Voter from "./Voter";

export default class CommentCard extends Component {
  state = { deleted: false };
  render() {
    const { comment, user } = this.props;
    return (
      <section className="commentCard">
        {!this.state.deleted && (
          <>
            <h4 className="cardAuthor">{comment.author}</h4>
            <p className="cardBody">{comment.body}</p>
            <p className="cardPublished">
              {secondsToTimeString(
                Math.floor((Date.now() - Date.parse(comment.created_at)) / 1000)
              )}{" "}
              ago
            </p>
            {user === comment.author && (
              <DeleteButton
                optimisticDelete={this.optimisticDelete}
                id={comment.comment_id}
              />
            )}
            <div className="cardVotes">
              <Voter votes={comment.votes} />
            </div>
          </>
        )}
        {this.state.deleted && <h1>DELETED!</h1>}
      </section>
    );
  }
  optimisticDelete = () => {
    this.setState({ deleted: true });
  };
}
