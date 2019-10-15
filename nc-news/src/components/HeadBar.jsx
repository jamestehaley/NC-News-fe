import React from "react";

export default function HeadBar({ title, user }) {
  return (
    <header className="header">
      <h2>{title || "All Stories"}</h2>
      <button>{user}</button>
      <h2>NC NEWS</h2>
    </header>
  );
}
