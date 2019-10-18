import React from 'react';

export default function HeadBar({ path, author, title, user }) {
  if (!path) title = 'All Stories';
  return (
    <>
      <h2 className="title">{title || author}</h2>
      <button className="login">Logged in as: {user}</button>
      <h2 className="NCNEWS">NC NEWS</h2>
    </>
  );
}
