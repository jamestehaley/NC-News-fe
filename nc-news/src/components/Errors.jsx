import React from 'react';

export default function Errors() {
  let msg;
  if (window.history.state) {
    msg = window.history.state.msg;
  } else if (window.location.pathname === '/Error') {
    msg = 'An error has occurred.';
  } else {
    msg = `Page not found! "${window.location.pathname}" is not a valid path.`;
  }
  msg += ' Please press the back button to return to using NC News';
  return <h1 className="Error">{msg}</h1>;
}
