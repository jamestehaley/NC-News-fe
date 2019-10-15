import React from "react";

export default function HeadBar({ title, user }) {
  return (
    <header className="header">
      <div>{title || "All Stories"}</div>
      <div>{user}</div>
      <div>NC NEWS</div>
    </header>
  );
}
