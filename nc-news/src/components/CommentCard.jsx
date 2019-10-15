import React from "react";
import { secondsToTimeString } from "../utils/utils";

export default function CommentCard({ comment }) {
  return (
    <section className="commentCard">
      <h4 className="cardAuthor">{comment.author}</h4>
      <p className="cardBody">{comment.body}</p>
      <p className="cardPublished">
        {secondsToTimeString(
          (Date.now() - Date.parse(comment.created_at)) / 1000
        )}{" "}
        ago
      </p>
      <p className="cardVotes">Votes: {comment.votes}</p>
    </section>
  );
}
