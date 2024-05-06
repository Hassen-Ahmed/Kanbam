import { GiRank3 } from "react-icons/gi";
import {
  MdContentCopy,
  MdOutlineArchive,
  MdOutlineAttachment,
  MdOutlineWatchLater,
} from "react-icons/md";
import { IoMdArrowRoundForward, IoMdCard } from "react-icons/io";
import { IPriority } from "../CardModal";
import Priorities from "./priorities/Priorities";
import { ICard } from "../../../../types/board.type";

const sizeTwo = 22;

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
  return (
    <>
      <div
        className="priority right-bar__btn"
        onClick={() => handlePriority(false, priority)}
      >
        <GiRank3 size={sizeTwo} />
        <h2>Priority</h2>
      </div>

      {isPriorityPicked && (
        <Priorities cardDetail={cardDetail} handlePriority={handlePriority} />
      )}

      <div className="dates right-bar__btn">
        <MdOutlineWatchLater size={sizeTwo} />
        <h2>Dates</h2>
      </div>
      <div className="attachment right-bar__btn">
        <MdOutlineAttachment size={sizeTwo} />
        <h2>Attachment</h2>
      </div>
      <div className="cover right-bar__btn">
        <IoMdCard size={sizeTwo} />
        <h2>Cover</h2>
      </div>
      <h3>Actions</h3>
      <div className="move right-bar__btn">
        <IoMdArrowRoundForward size={sizeTwo} />
        <h2>Move</h2>
      </div>
      <div className="copy right-bar__btn">
        <MdContentCopy size={sizeTwo} />
        <h2>Copy</h2>
      </div>
      <div
        className="archive right-bar__btn"
        onClick={() => handleCardArchive(cardDetail.id!)}
      >
        <MdOutlineArchive size={sizeTwo} />
        <h2>Archive</h2>
      </div>
    </>
  );
}
