import React from 'react';

export default function Textbox({ box, current, max, handle }) {
  return (
    <>
      <textarea
        className={`textbox ${current.length === +max ? 'full' : ''}`}
        id={box}
        onChange={event => {
          handle(event, box, max);
        }}
        value={current}
        type="text"
      />{' '}
      <p>Characters left:{max - current.length}</p>
    </>
  );
}
