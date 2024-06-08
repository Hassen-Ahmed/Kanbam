import { FaArrowUp } from "react-icons/fa6";

import { ICard } from "../../../../../types/board.type";
import { IError } from "../../../../../types/status.type";
import { updateCard } from "../../../../../utils/api/updates";
import { priorities } from "../../../../../utils/constantDatas/priorities";

import { IPriority } from "../../CardModal";
import "./Priorities.scss";

interface IPriorityCollection {
  handlePriority: (ar1: boolean, arg2: IPriority) => void;
  cardDetail: ICard;
}

export default function Priorities({
  handlePriority,
  cardDetail,
}: IPriorityCollection) {
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
  };

  const priorityList = priorities.map(({ name, color, rotation }) => {
    return (
      <li
        key={name}
        onClick={() => {
          handlePriority(true, { name, color, rotation });
          handlePriorityName(name);
        }}
      >
        <FaArrowUp
          size={20}
          color={color}
          style={{ transform: `rotate(${rotation})` }}
        />
        {name}
      </li>
    );
  });

  return <ul className="pritority__lists">{priorityList}</ul>;
}
