/* eslint-disable react-hooks/exhaustive-deps */
import { IoSearchSharp } from "react-icons/io5";

import "./SearchBox.scss";
import { useContext, useEffect, useState } from "react";
import { IListsContext, ListsContext } from "../../context/ListsContext";

export default function SearchBox() {
  const [winWidth, setWinWidth] = useState(0);
  const [value, setValue] = useState("");
  const { handleSearchTextUpdate } = useContext(ListsContext) as IListsContext;

  useEffect(() => {
    setWinWidth(window.innerWidth);
  }, []);

  // end of hooks

  useEffect(() => {
    handleSearchTextUpdate(value);
  }, [value]);

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
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
          />
        ) : null}
      </div>
    </div>
  );
}
