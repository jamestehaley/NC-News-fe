import React from 'react';
import { Link } from '@reach/router';

export default function HeadBar({ path, author, title, user }) {
  if (!path) title = 'All Stories';
  return (
    <>
      <h2 className="title">{title || author}</h2>
      <div className="login">
        <Link to="/users">
          {user.length > 0 ? `Logged in as: ${user}` : `Not logged in`}
        </Link>
      </div>
      <h2 className="NCNEWS">NC NEWS</h2>
    </>
  );
}
