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
  const priorityList = isPriorityPicked && (
    <Priorities cardDetail={cardDetail} handlePriority={handlePriority} />
  );

  return (
    <>
      <div
        className="priority right-bar__btn"
        onClick={() => handlePriority(false, priority)}
      >
        <GiRank3 size={iconSizeTwo} />
        <h2>Priority</h2>
      </div>

      {priorityList}

      <div className="dates right-bar__btn">
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
      <div className="move right-bar__btn">
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
    </>
  );
}
