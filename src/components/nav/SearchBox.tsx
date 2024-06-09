/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

import { IListsContext } from "../../types/board.type";

import { ListsContext } from "../../context/ListsContext";
import "./SearchBox.scss";

const SearchBox = () => {
  const [value, setValue] = useState("");
  const [winWidth, setWinWidth] = useState(0);
  const { handleSearchTextUpdate } = useContext(ListsContext) as IListsContext;

  useEffect(() => setWinWidth(window.innerWidth), []);
  useEffect(() => handleSearchTextUpdate(value), [value]);

  // end of hooks

  const handleVisibilityOfInput = (value: number) => setWinWidth(value);

  const textInputOfSearchBox = (
    <input
      onBlur={() => handleVisibilityOfInput(1000)}
      id="search"
      type="text"
      placeholder="Search Tasks..."
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );

  return (
    <div className="search-container">
      <div className="search__box">
        <label htmlFor="search" onClick={() => handleVisibilityOfInput(1000)}>
          <IoSearchSharp size={22} />
        </label>

        {winWidth > 600 ? textInputOfSearchBox : null}
      </div>
    </div>
  );
};

export default SearchBox;
