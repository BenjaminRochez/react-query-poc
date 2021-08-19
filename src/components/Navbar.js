import React from "react";

function Navbar({ setPage }) {
  return (
    <div>
      <nav>
        <button onClick={() => setPage("people")}>People</button>
        <button onClick={() => setPage("planet")}>Planet</button>
      </nav>
    </div>
  );
}

export default Navbar;
