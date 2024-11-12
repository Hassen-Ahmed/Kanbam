import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { Link } from "react-router-dom";
import { joinString } from "../../../utils/manipulators";
import { useContext } from "react";
import { ListsContext } from "../../../context/ListsContext";
import { IListsContext } from "../../../types/kanbam";

interface IItem {
  type: string;
  id: string;
  name: string;
  description: string;
  boardAccessLevel: string;
  clickToDelete: (status: boolean, id: string) => void;
  handleUpdateItemModlaVisibility: (status: boolean) => void;
  setRequestError: React.Dispatch<React.SetStateAction<boolean>>;
  setIdToModify: React.Dispatch<React.SetStateAction<string>>;
}

export default function Item({
  type,
  id,
  name,
  description,
  boardAccessLevel,
  clickToDelete,
  handleUpdateItemModlaVisibility,
  setRequestError,
  setIdToModify,
}: IItem) {
  const { dispatch } = useContext(ListsContext) as IListsContext;

  return (
    <div className="item">
      <div className="item-name">
        <Link
          onClick={() => {
            dispatch({ type: "ADD_ALL_LISTS", payload: null });
          }}
          to={{
            pathname: `/kanbam/${type}/${id}/${joinString(name)}`,
            search: `?accessLevel=${boardAccessLevel}`,
          }}
        >
          <h4>{name}</h4>
          <p className="desc">{description}</p>
        </Link>
      </div>

      <div className="item__btns">
        <div className="btn__edit btn">
          <MdEditNote
            size={20}
            onClick={() => {
              handleUpdateItemModlaVisibility(true);
              setRequestError(false);
              setIdToModify(id);
            }}
          />
        </div>

        <div
          className="btn__delete btn"
          onClick={() => clickToDelete(true, id)}
        >
          <MdDeleteForever size={20} />
        </div>
      </div>
    </div>
  );
}
