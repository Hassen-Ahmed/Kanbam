import { ICard } from "../../../../../types/board.type";
import { IError } from "../../../../../types/status.type";
import { updateCard } from "../../../../../utils/api/updates";

import "./Priorities.scss";
import { BgAndFont } from "../../../../../utils/constantDatas/styledUtils";
import { useContext } from "react";
import {
  IkanbamContext,
  KanbamContext,
} from "../../../../../context/kanbamContext";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { VscClose } from "react-icons/vsc";
import { INewTheme } from "../../../../../types/styledComp";
import styled from "styled-components";
import { themes } from "../../../../../utils/constantDatas/themes";

interface IPriorityCollection {
  cardDetail: ICard;
  isVisible: boolean;
  handleIsPriorityPressed: (status: boolean) => void;
}

const PriorityStyled = styled.div<INewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["card_modal"]};
  border: 0.05rem solid
    ${({ $newtheme }) => themes[$newtheme].border["secondary"]};

  .card-move__btn--close {
    color: ${({ $newtheme }) => themes[$newtheme].font["quaternary"]};
  }
`;

export const icons = (name: string) => {
  if (name == "High") return <FcHighPriority size={20} />;

  switch (name) {
    case "High":
      return <FcHighPriority size={20} />;

    case "Medium":
      return <FcMediumPriority size={20} />;

    case "Low":
      return <FcLowPriority size={20} />;

    default:
      break;
  }
};

export default function Priorities({
  cardDetail,
  isVisible,
  handleIsPriorityPressed,
}: IPriorityCollection) {
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  const handlePriorityName = async (name: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    cardDetail.priority = name;
    try {
      await updateCard(cardDetail.id!, cardDetail, token);
    } catch (err) {
      const error = err as IError;
      console.log(`Error message: ${error.message}`);
    } finally {
      console.log("Send put request for Priority...");
    }

    handleIsPriorityPressed(false);
  };

  const priorities = ["High", "Medium", "Low"];

  return (
    <PriorityStyled
      $newtheme={theme}
      className="pritority__lists"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <h3 className="heading">Priority</h3>
      <div className="priority__btn--close button-close">
        <VscClose size={22} onClick={() => handleIsPriorityPressed(false)} />
      </div>
      {priorities.map((name) => {
        return (
          <li
            key={name}
            onClick={() => {
              handlePriorityName(name);
            }}
          >
            {icons(name)}
            {name}
          </li>
        );
      })}
    </PriorityStyled>
  );
}
