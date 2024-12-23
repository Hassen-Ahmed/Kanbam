import { GiRank3 } from "react-icons/gi";
import { IoMdArrowRoundForward, IoMdCard } from "react-icons/io";
import {
  MdContentCopy,
  MdOutlineArchive,
  MdOutlineAttachment,
  MdOutlineWatchLater,
} from "react-icons/md";

import Priorities from "./priorities/Priorities";
import { INewTheme } from "../../../../types/styledComp";
import styled from "styled-components";
import {
  IkanbamContext,
  KanbamContext,
} from "../../../../context/kanbamContext";
import { useContext, useState } from "react";
import MoveCard from "./move_card/MoveCard";
import CalendarPicker from "./calendar/CalendarPicker";
import useClickOutside from "../../../../hooks/useClickOutside";
import { ICard } from "../../../../types/kanbam";

const ButtonRightStyled = styled.div<INewTheme>`
  .right-bar__btn {
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["hover"]};
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["quaternary"]};

    &:hover {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["hoverTertiary"]};
    }
  }
`;

const iconSizeTwo = 22;

interface IButtonRight {
  handleCardArchive: (arg: string) => void;
  cardDetail: ICard;
}

export default function ButtonsRight({
  handleCardArchive,
  cardDetail,
}: IButtonRight) {
  const [isMovePressed, setIsMovePressed] = useState(false);
  const [isDatePressed, setIsDatePressed] = useState(false);
  const [isPriorityPressed, setIsPriorityPressed] = useState(false);

  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;

  const refDate = useClickOutside(() => handleIsPressed(false, "date"));
  const refMove = useClickOutside(() => handleIsPressed(false, "move"));
  const refPriority = useClickOutside(() => handleIsPressed(false, "priority"));

  function handleIsPressed(status: boolean, type: string | null = null) {
    switch (type) {
      case "move":
        setIsMovePressed(status);
        break;
      case "date":
        setIsDatePressed(status);
        break;
      case "priority":
        setIsPriorityPressed(status);
        break;
      default:
        setIsMovePressed(status);
        setIsDatePressed(status);
        setIsPriorityPressed(status);
        break;
    }
  }

  return (
    <ButtonRightStyled $themeList={themeList} $newtheme={theme}>
      <div
        className="priority-container right-bar__btn"
        ref={refPriority}
        onClick={() => handleIsPressed(true, "priority")}
      >
        {isPriorityPressed && (
          <Priorities
            cardDetail={cardDetail}
            handleIsPriorityPressed={handleIsPressed}
            isVisible={isPriorityPressed}
          />
        )}
        <GiRank3 size={iconSizeTwo} />
        <h2>Priority</h2>
      </div>

      <div
        className="dates right-bar__btn"
        ref={refDate}
        onClick={() => handleIsPressed(true, "date")}
      >
        {isDatePressed && (
          <CalendarPicker
            handleIsDatePressed={handleIsPressed}
            isVisible={isDatePressed}
            cardDetail={cardDetail}
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
