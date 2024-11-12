import styled from "styled-components";
import "./AreYouSure.scss";
import { INewTheme } from "../../types/styledComp";
import { themes } from "../constantDatas/themes";
import { useContext } from "react";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";

const AreYouSureStyled = styled.div<INewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};

  color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};

  border: 0.1px solid ${({ $newtheme }) => themes[$newtheme].font["quaternary"]};
`;

interface IAreYouSure {
  handleAreYouSure: (status: boolean) => void;
}
export default function AreYouSure({ handleAreYouSure }: IAreYouSure) {
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  return (
    <div className="sure-to-del-container">
      <AreYouSureStyled $newtheme={theme} className="sure-to-del-table">
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
