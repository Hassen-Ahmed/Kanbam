import { GiRank3 } from "react-icons/gi";
import { IoMdArrowRoundForward, IoMdCard } from "react-icons/io";
import {
  MdContentCopy,
  MdOutlineArchive,
  MdOutlineAttachment,
  MdOutlineWatchLater,
} from "react-icons/md";

import { ICard } from "../../../../types/board.type";
import Priorities from "./priorities/Priorities";
import { IPriority } from "../CardModal";
import { INewTheme } from "../../../../types/styledComp";
import styled from "styled-components";
import {
  IkanbamContext,
  KanbamContext,
} from "../../../../context/kanbamContext";
import { useContext, useState } from "react";
import { themes } from "../../../../utils/constantDatas/themes";
import MoveCard from "./move_card/MoveCard";
import CalendarPicker from "./calendar/CalendarPicker";
import useClickOutside from "../../../../hooks/useClickOutside";
import useClickOutsideMove from "../../../../hooks/useClickOutsideMove";
import useClickOutsideDate from "../../../../hooks/useClickOutsideDate";

const ButtonRightStyled = styled.div<INewTheme>`
  .right-bar__btn {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover"]};
    color: ${({ $newtheme }) => themes[$newtheme].font["quaternary"]};

    &:hover {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover_03"]};
    }
  }
`;

const iconSizeTwo = 22;

interface IPriorityCollection {
  priorities: IPriority[];
  handlePriority: (ar1: boolean, arg2: IPriority) => void;
}

interface IButtonRight extends IPriorityCollection {
  isPriorityPicked: boolean;
  priority: IPriority;
  handleCardArchive: (arg: string) => void;
  cardDetail: ICard;
}

export default function ButtonsRight({
  handlePriority,
  isPriorityPicked,
  priority,
  handleCardArchive,
  cardDetail,
}: IButtonRight) {
  const [isMovePressed, setIsMovePressed] = useState(false);
  const [isDatePressed, setIsDatePressed] = useState(false);
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  const refDate = useClickOutside(() => handleIsPressed(false, "date"));
  const refMove = useClickOutside(() => handleIsPressed(false, "move"));

  function handleIsPressed(status: boolean, type: string | null = null) {
    switch (type) {
      case "move":
        setIsMovePressed(status);
        break;
      case "date":
        setIsDatePressed(status);
        break;
      default:
        setIsMovePressed(status);
        setIsDatePressed(status);
        break;
    }
  }

  const priorityList = isPriorityPicked && (
    <Priorities cardDetail={cardDetail} handlePriority={handlePriority} />
  );

  return (
    <ButtonRightStyled $newtheme={theme}>
      <div
        className="priority right-bar__btn"
        onClick={() => handlePriority(false, priority)}
      >
        <GiRank3 size={iconSizeTwo} />
        <h2>Priority</h2>
      </div>

      {priorityList}

      <div
        className="dates right-bar__btn"
        ref={refDate}
        onClick={() => handleIsPressed(true, "date")}
      >
        {isDatePressed && (
          <CalendarPicker
            handleIsDatePressed={handleIsPressed}
            cardDetail={cardDetail}
            isVisible={isDatePressed}
          />
        )}
        <MdOutlineWatchLater size={iconSizeTwo} />
        <h2>Dates</h2>
      </div>
      <div className="attachment right-bar__btn">
        <MdOutlineAttachment size={iconSizeTwo} />
        <h2>Attachment</h2>
      </div>
      <div className="cover right-bar__btn">
        <IoMdCard size={iconSizeTwo} />
        <h2>Cover</h2>
      </div>
      <h3>Actions</h3>
      <div
        className="move right-bar__btn"
        ref={refMove}
        onClick={() => handleIsPressed(true, "move")}
      >
        {isMovePressed && (
          <MoveCard
            handleIsMovePressed={handleIsPressed}
            cardDetail={cardDetail}
            isVisible={isMovePressed}
          />
        )}
        <IoMdArrowRoundForward size={iconSizeTwo} />
        <h2>Move</h2>
      </div>
      <div className="copy right-bar__btn">
        <MdContentCopy size={iconSizeTwo} />
        <h2>Copy</h2>
      </div>
      <div
        className="archive right-bar__btn"
        onClick={() => handleCardArchive(cardDetail.id!)}
      >
        <MdOutlineArchive size={iconSizeTwo} />
        <h2>Archive</h2>
      </div>
    </ButtonRightStyled>
  );
}
