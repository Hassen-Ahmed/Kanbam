import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import { BgAndFont } from "../../utils/constantDatas/styledUtils";
import { useAppSelector } from "../../features/hooks";
import "./Loading.scss";

const LoadinIcongStyled = styled.div<INewTheme>`
  &::before,
  &::after {
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["secondary"]};
  }
`;

const Loading = () => {
  const { themeName, themeList } = useAppSelector((state) => state.theme);

  return (
    <div className="loading-container ">
      <BgAndFont
        $themeList={themeList}
        $themename={themeName}
        $groupbg="card"
        $groupfont="secondary"
        className="loading"
      >
        <LoadinIcongStyled
          $themeList={themeList}
          $newtheme={themeName}
          className="loading__icon"
        ></LoadinIcongStyled>
        <p>Loading...</p>
      </BgAndFont>
    </div>
  );
};

export default Loading;
