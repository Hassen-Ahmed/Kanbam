/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

import { IListsContext } from "../../types/board.type";

import { ListsContext } from "../../context/ListsContext";
import "./SearchBox.scss";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { themes } from "../../utils/constantDatas/themes";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";

const SearchBoxStyled = styled.div<INewTheme>`
  .search__box {
    input {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover_03"]};
      color: ${({ $newtheme }) => themes[$newtheme].font["tertiary"]};
      border: 0.1rem solid
        ${({ $newtheme }) => themes[$newtheme].border["secondary"]};

      &::placeholder {
        background-color: ${({ $newtheme }) =>
          themes[$newtheme].bg["transparent"]};
        color: ${({ $newtheme }) => themes[$newtheme].font["tertiary"]};
      }
    }
  }
`;

const SearchBox = () => {
  const [value, setValue] = useState("");
  const [winWidth, setWinWidth] = useState(0);
  const { handleSearchTextUpdate } = useContext(ListsContext) as IListsContext;
  const { theme } = useContext(KanbamContext) as IkanbamContext;

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
    <SearchBoxStyled $newtheme={theme} className="search-container">
      <div className="search__box">
        <label htmlFor="search" onClick={() => handleVisibilityOfInput(1000)}>
          <IoSearchSharp size={22} />
        </label>

        {winWidth > 600 ? textInputOfSearchBox : null}
      </div>
    </SearchBoxStyled>
  );
};

export default SearchBox;
