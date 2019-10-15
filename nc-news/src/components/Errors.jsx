import React from "react";

export default function Errors() {
  const msg = window.history.state ? window.history.state.msg : "Unknown error";
  return <div>{msg}</div>;
}
