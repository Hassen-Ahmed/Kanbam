import styled from "styled-components";
import "./Loading.scss";
import { themes } from "../../utils/constantDatas/themes";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { useContext } from "react";
import { INewTheme } from "../../types/styledComp";
import { BgAndFont } from "../../utils/constantDatas/styledUtils";

const LoadinIcongStyled = styled.div<INewTheme>`
  &::before,
  &::after {
    background-color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
  }
`;

const Loading = () => {
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  return (
    <BgAndFont
      $themename={theme}
      $groupbg="card"
      $groupfont="secondary"
      className="loading"
    >
      <LoadinIcongStyled
        $newtheme={theme}
        className="loading__icon"
      ></LoadinIcongStyled>
      <p>Loading...</p>
    </BgAndFont>
  );
};

export default Loading;
