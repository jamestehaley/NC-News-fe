import React from "react";
import { Link } from "@reach/router";

export default function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.article_id}`} className="articleCard">
      <div className="cardTitle">{article.title}</div>
      <div className="cardTopic">{article.topic}</div>
      <div className="cardAuthor">{`By ${article.author}`}</div>
      <div className="cardPublished">{`Published: ${new Date(article.created_at)
        .toUTCString()
        .slice(0, -13)}`}</div>
      <div className="cardVotes">{`Votes: ${article.votes}`}</div>
      <div className="cardComments">{`Comments: ${article.comment_count}`}</div>
    </Link>
  );
}
