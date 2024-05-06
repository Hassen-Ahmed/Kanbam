import { FaArrowUp } from "react-icons/fa6";
import "./Priorities.scss";
import { IPriority } from "../../CardModal";
import { ICard } from "../../../../../types/board.type";
import { updateCard } from "../../../../../utils/api/updates";
import { IError } from "../../../../../types/status.type";
import { priorities } from "../../../../../utils/constantDatas/priorities";

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

  return (
    <ul className="pritority__lists">
      {priorities.map(({ name, color, direction }) => {
        return (
          <li
            key={name}
            onClick={() => {
              handlePriority(true, { name, color, direction });
              handlePriorityName(name);
            }}
          >
            <FaArrowUp
              size={20}
              color={color}
              style={{ transform: `rotate(${direction})` }}
            />
            {name}
          </li>
        );
      })}
    </ul>
  );
}
