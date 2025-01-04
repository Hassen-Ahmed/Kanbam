/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

import "./SearchBox.scss";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { useAppDispath, useAppSelector } from "../../features/hooks";
import { setSearchText } from "../../features/slices/kanbamSlice";

const SearchBoxStyled = styled.div<INewTheme>`
  .search__box {
    input {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["hoverTertiary"]};
      color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].font["tertiary"]};
      border: 0.1rem solid
        ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].border["secondary"]};

      &::placeholder {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["transparent"]};
        color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].font["tertiary"]};
      }
    }
  }
`;

const SearchBox = () => {
  const dispatchRdx = useAppDispath();
  const [value, setValue] = useState("");
  const { themeName, themeList } = useAppSelector((state) => state.theme);
  const searchText = useAppSelector((state) => state.kanbam.searchText);

  useEffect(() => {
    dispatchRdx(setSearchText(value));
  }, [value, searchText]);

  // end of hooks

  const textInputOfSearchBox = (
    <input
      id="search"
      type="text"
      placeholder="Search Tasks..."
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );

  return (
    <SearchBoxStyled
      $themeList={themeList}
      $newtheme={themeName}
      className="search-container"
    >
      <div className="search__box">
        <label htmlFor="search">
          <IoSearchSharp size={22} />
        </label>

        {textInputOfSearchBox}
      </div>
    </SearchBoxStyled>
  );
};

export default SearchBox;
