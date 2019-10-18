import React from 'react';

export default function Errors() {
  let msg;
  if (window.history.state) {
    msg = window.history.state.msg;
  } else if (window.location.pathname === '/Error') {
    msg =
      'An error has occurred, please press the back button to return to using NC News';
  } else {
    msg = `Page not found! "${window.location.pathname}" is not a valid path.`;
  }
  return <div>{msg}</div>;
}
