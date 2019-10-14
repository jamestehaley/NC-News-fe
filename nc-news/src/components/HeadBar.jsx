import React from "react";

export default function HeadBar({ title, user }) {
  return (
    <header className="header">
      <div>Topics</div>
      <div>{title || "All Stories"}</div>
      <div>Logged in as {user}</div>
      <div>NC NEWS</div>
    </header>
  );
}
