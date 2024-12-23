import styled from "styled-components";
import "./Loading.scss";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { useContext } from "react";
import { INewTheme } from "../../types/styledComp";
import { BgAndFont } from "../../utils/constantDatas/styledUtils";

const LoadinIcongStyled = styled.div<INewTheme>`
  &::before,
  &::after {
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["secondary"]};
  }
`;

const Loading = () => {
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;

  return (
    <div className="loading-container ">
      <BgAndFont
        $themeList={themeList}
        $themename={theme}
        $groupbg="card"
        $groupfont="secondary"
        className="loading"
      >
        <LoadinIcongStyled
          $themeList={themeList}
          $newtheme={theme}
          className="loading__icon"
        ></LoadinIcongStyled>
        <p>Loading...</p>
      </BgAndFont>
    </div>
  );
};

export default Loading;
