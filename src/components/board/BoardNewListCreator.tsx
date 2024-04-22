import { MdOutlineCancel } from "react-icons/md";
import { useContext, useState } from "react";
import { IList } from "../../types/lists.type";
import { postList } from "../../utils/api/posts";
import { IListsContext, ListsContext } from "../../context/ListsContext";
import "./BoardNewListCreator.scss";

type isListAddedType = { isListAddedSetter: (value: boolean) => void };

const BoardNewListCreator = ({ isListAddedSetter }: isListAddedType) => {
  const [inputList, setInputList] = useState<string>("");
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;

  const handleAddList = async () => {
    if (inputList.length) {
      let newList: IList = {
        title: inputList,
        indexNumber: lists?.length,
      };
      try {
        const data = await postList(newList);

        newList = { ...data, list: [] };

        dispatch({ type: "ADD_LIST", payload: [newList] });
        setInputList("");
      } catch (err) {
        console.log(`Error message: ${err}`);
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
