import React from "react";

export default function Pagination({ p, changePage, total }) {
  return (
    <>
      <button
        onClick={() => {
          if (p > 0) changePage(-1);
        }}
        name="previous"
      >{`<`}</button>
      <span>Page: {p + 1}</span>
      <button
        onClick={() => {
          if (p < total) changePage(1);
        }}
        name="next"
      >{`>`}</button>
    </>
  );
}
