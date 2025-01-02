import styled from "styled-components";
import "./AreYouSure.scss";
import { INewTheme } from "../../types/styledComp";
import { useAppSelector } from "../../features/hooks";

const AreYouSureStyled = styled.div<INewTheme>`
  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["card"]};

  color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].font["primary"]};

  border: 0.1px solid
    ${({ $themeList, $newtheme }) => $themeList[$newtheme].font["quaternary"]};
`;

interface IAreYouSure {
  handleAreYouSure: (status: boolean) => void;
}
export default function AreYouSure({ handleAreYouSure }: IAreYouSure) {
  const { themeName, themeList } = useAppSelector((state) => state.theme);

  return (
    <div className="sure-to-del-container">
      <AreYouSureStyled
        $themeList={themeList}
        $newtheme={themeName}
        className="sure-to-del-table"
      >
        <h2>Are you sure?</h2>
        <div className="btn-del_wrapper">
          <div className="btn-del yes" onClick={() => handleAreYouSure(true)}>
            <button>Yes</button>
          </div>
          <div className="btn-del no" onClick={() => handleAreYouSure(false)}>
            <button>No</button>
          </div>
        </div>
      </AreYouSureStyled>
      <div
        className="overlay-table"
        onClick={() => handleAreYouSure(false)}
      ></div>
    </div>
  );
}
