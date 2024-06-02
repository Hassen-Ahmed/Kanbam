import { MdOutlineCancel } from "react-icons/md";
import { useContext, useState } from "react";
import { postList } from "../../utils/api/posts";
import { ListsContext } from "../../context/ListsContext";
import "./BoardNewListCreator.scss";
import { IError } from "../../types/status.type";
import { IListsContext } from "../../types/board.type";

type isListAddedType = { isListAddedSetter: (value: boolean) => void };

const BoardNewListCreator = ({ isListAddedSetter }: isListAddedType) => {
  const [inputList, setInputList] = useState<string>("");
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;

  const handleAddList = async () => {
    if (inputList.length) {
      let newList = {
        title: inputList,
        indexNumber: lists?.length as number,
      };

      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await postList(newList, token);

        newList = { ...data, cards: [] };
        dispatch({ type: "ADD_LIST", payload: [newList] });
        localStorage.setItem("storedLists", JSON.stringify([...lists!, data]));
        setInputList("");
      } catch (err) {
        const error = err as IError;
        console.log(`Error message: ${error.message}`);
      } finally {
        console.log("Send POST request for new list...");
      }
    }
  };

  return (
    <div className="board__new-list board__new-list--creator">
      <div className="board__new-list--input">
        <input
          type="text"
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
