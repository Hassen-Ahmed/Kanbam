import { IoSearchSharp } from "react-icons/io5";

import "./SearchBox.scss";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const [winWidth, setWinWidth] = useState(0);
  useEffect(() => {
    setWinWidth(window.innerWidth);
  }, []);

  // end of hooks

  const handleVisibilityOfInput = (value: number) => {
    setWinWidth(value);
  };

  return (
    <div className="search-container">
      <div className="search__box">
        <label htmlFor="search" onClick={() => handleVisibilityOfInput(1000)}>
          <IoSearchSharp size={22} />
        </label>

        {winWidth > 600 ? (
          <input
            onBlur={() => handleVisibilityOfInput(1000)}
            id="search"
            type="text"
            placeholder="Search Tasks..."
          />
        ) : null}
      </div>
    </div>
  );
}
