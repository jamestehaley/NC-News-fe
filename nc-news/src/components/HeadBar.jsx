import React from "react";

export default function HeadBar({ path, author, title, user }) {
  if (!path) title = "All Stories";
  return (
    <>
      <h2>{title || author}</h2>
      <button>{user}</button>
      <h2>NC NEWS</h2>
    </>
  );
}
