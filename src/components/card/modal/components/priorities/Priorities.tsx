import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { VscClose } from "react-icons/vsc";
import { INewTheme } from "../../../../../types/styledComp";
import styled from "styled-components";
import { ICard, IError } from "../../../../../types/kanbam";
import useUpdates from "../../../../../utils/api/useUpdates";
import { useAppSelector } from "../../../../../features/hooks";
import "./Priorities.scss";
import { logger } from "../../../../../utils/logger";

interface IPriorityCollection {
  cardDetail: ICard;
  isVisible: boolean;
  handleIsPriorityPressed: (status: boolean) => void;
}

const PriorityStyled = styled.div<INewTheme>`
  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["cardModal"]};
  border: 0.05rem solid
    ${({ $themeList, $newtheme }) => $themeList[$newtheme].border["secondary"]};

  .card-move__btn--close {
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["quaternary"]};
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
  const { updateCard } = useUpdates();
  const { themeName, themeList } = useAppSelector((state) => state.theme);

  const handlePriorityName = async (name: string) => {
    cardDetail.priority = name;
    try {
      await updateCard(cardDetail.id!, cardDetail);
    } catch (err) {
      const error = err as IError;
      logger("error", `Error message: ${error.message}`);
    } finally {
      logger("info", "Send put request for Priority...");
    }

    handleIsPriorityPressed(false);
  };

  const priorities = ["High", "Medium", "Low"];

  return (
    <PriorityStyled
      $themeList={themeList}
      $newtheme={themeName}
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
