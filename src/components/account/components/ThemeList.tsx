import themeLight from "../../../../public/theme-light.svg";
import themeDark from "../../../../public/theme-dark.svg";
import { useContext, useEffect, useState } from "react";
import { KanbamContext, IkanbamContext } from "../../../context/kanbamContext";
import { Hr } from "../../../utils/constantDatas/styledUtils";
import ThemeContainer from "./ThemeCard";
import "./ThemeList.scss";
import styled from "styled-components";
import { INewTheme } from "../../../types/styledComp";

const ThemeListStyled = styled.div<INewTheme>`
  .theme--list {
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["primary"]};
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["menu"]};
    border: 0.1rem solid
      ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].border["secondary"]};

    li {
      &:hover {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["hover"]};
      }
    }

    .theme-ai {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["lists"]};
      border: 0.1rem solid
        ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].border["secondary"]};
    }
  }
`;

const ThemeList = () => {
  const { theme, themeSetter, themeList } = useContext(
    KanbamContext
  ) as IkanbamContext;

  const [isAiThemeStored, setIsAiThemeStored] = useState(false);

  useEffect(() => {
    const storedThemesString = localStorage.getItem("aiTheme");
    if (storedThemesString) setIsAiThemeStored(true);
  }, [theme]);

  return (
    <ThemeListStyled
      $themeList={themeList}
      $newtheme={theme}
      className="theme-list-container"
    >
      <ul className="theme--list">
        <li
          onClick={() => themeSetter("light")}
          style={{ animationDelay: `0s` }}
        >
          <div className="theme--btn">
            <img src={themeLight} alt="theme light logo" />
          </div>
          <p>Light</p>
        </li>
        <Hr $themeList={themeList} $themename={theme} $group="secondary" />
        <li
          onClick={() => themeSetter("dark")}
          style={{ animationDelay: `0.1s` }}
        >
          <div className="theme--btn">
            <img src={themeDark} alt="theme dark logo" />
          </div>
          <p>Dark</p>
        </li>
        <Hr $themeList={themeList} $themename={theme} $group="secondary" />

        {isAiThemeStored && (
          <>
            <li
              onClick={() => themeSetter("aiTheme")}
              style={{ animationDelay: `.2s` }}
            >
              <div className="theme--btn">
                <img src={themeLight} alt="theme aiTheme logo" />
              </div>
              <p>AI-Theme</p>
            </li>
            <Hr $themeList={themeList} $themename={theme} $group="secondary" />
          </>
        )}
        <ThemeContainer />
      </ul>
    </ThemeListStyled>
  );
};

export default ThemeList;
