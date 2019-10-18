import React from 'react';
import { Link } from '@reach/router';

export default function ArticleCard({ article, status }) {
  return (
    <Link
      to={`/articles/${article.article_id}`}
      className={`articleCard ${status}`}
    >
      <h3 className="cardTitle">{article.title}</h3>
      <p className="cardTopic">{article.topic}</p>
      <p className="cardAuthor">{`By ${article.author}`}</p>
      <time className="cardPublished">{`Published: ${new Date(
        article.created_at
      )
        .toUTCString()
        .slice(0, -13)}`}</time>
      <div className="cardVotes">Votes: {article.votes}</div>
      <p className="cardComments">{`Comments: ${article.comment_count}`}</p>
    </Link>
  );
}
