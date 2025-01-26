import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import usePosts from "../../utils/api/usePosts";
import { logger } from "../../utils/logger";
import { useAppSelector } from "../../features/hooks";
import "./BoardNewListCreator.scss";
import { IError } from "../../types/kanbam";

type isListAddedType = {
  isListAddedSetter: (value: boolean) => void;
  boardId: string;
};

const BoardNewListCreator = ({
  isListAddedSetter,
  boardId,
}: isListAddedType) => {
  const { postList } = usePosts();
  const [inputList, setInputList] = useState<string>("");
  const lists = useAppSelector((state) => state.lists.lists);

  //

  const handleAddList = async () => {
    if (!inputList.length) return;

    const newList = {
      boardId,
      title: inputList,
      indexNumber: lists?.length as number,
    };

    try {
      await postList(newList);

      setInputList("");
    } catch (err) {
      const error = err as IError;
      logger("error", `Error message: ${error.message}`);
    } finally {
      logger("info", "Send POST request for new list...");
    }
  };

  return (
    <div className="board__new-list board__new-list--creator">
      <div className="board__new-list--input">
        <input
          type="text"
          placeholder="Write list title..."
          autoFocus
          value={inputList}
          onChange={(ev) => setInputList(ev.target.value)}
        />
      </div>
      <div className="board__new-list--btns">
        <div className="board__new-list--btns-add" onClick={handleAddList}>
          <button>Add list</button>
        </div>
        <div
          className="board__new-list--btns-cancel"
          onClick={() => isListAddedSetter(false)}
        >
          <MdOutlineCancel size={20} />
        </div>
      </div>
    </div>
  );
};

export default BoardNewListCreator;
