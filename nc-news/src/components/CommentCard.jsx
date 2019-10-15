import React from "react";

export default function CommentCard({ comment }) {
  console.log(comment);
  return (
    <div>
      <div>{comment.body}</div>
    </div>
  );
}
