import { VscClose } from "react-icons/vsc";
import "./ListsMenu.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { deleteListsById } from "../../utils/api/deletes";
import { IListsContext, ListsContext } from "../../context/ListsContext";
import { BoardType } from "../../types/board.type";
import { IError } from "../../types/status.type";
import { FaArrowRotateLeft } from "react-icons/fa6";

export default function ListsMenu({
  handleIsListMenuVisible,
  id,
  setIsNewCardInputVisible,
}: {
  handleIsListMenuVisible: (value: boolean) => void;
  id: string;
  setIsNewCardInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const menuListRef = useRef(null);
  const [isListRemoved, setIsListRemoved] = useState(false);

  useEffect(() => {
    if (!menuListRef.current) return;
    const menuList = menuListRef.current as HTMLElement;
    const menuListRectangle = menuList?.getBoundingClientRect();

    if (menuListRectangle.right > window.innerWidth) {
      menuList.style.left = `${-80}%`;
    }
    if (menuListRectangle.left < 0) {
      menuList.style.left = `${40}%`;
    }
  }, []);

  // end of hooks

  const handleListArchive = async (listId: string) => {
    setIsListRemoved(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await deleteListsById(listId, token);
      handleIsListMenuVisible(false);

      const updatedLists = lists?.filter((listObj) => {
        return listObj.id != listId;
      }) as BoardType;

      dispatch({ type: "ADD_ALL_LISTS", payload: updatedLists });
    } catch (err) {
      const error = err as IError;
      console.log("Error deleting list, err: ", error.message);
      setIsListRemoved(false);
    }
  };

  return (
    <div className="lists-menu-container">
      <div
        className="lists-menu__overlay"
        onClick={() => handleIsListMenuVisible(false)}
      ></div>
      <div className="lists-menu" ref={menuListRef}>
        <h2 className="lists-menu__heading">List actions</h2>
        <div className="lists-menu__btns">
          <div
            className="lists-menu__btn"
            onClick={() => {
              setIsNewCardInputVisible(true);
              handleIsListMenuVisible(false);
            }}
          >
            <button>Add card</button>
          </div>
          <div className="lists-menu__btn">
            <button>Copy list</button>
          </div>
          <div className="lists-menu__btn">
            <button>Move list</button>
          </div>

          <hr />

          <div className="lists-menu__btn">
            <button>Sort by...</button>
          </div>

          <hr />
          <div className="lists-menu__btn">
            <button>Archive all cards in this list</button>
          </div>
          <div className="lists-menu__btn">
            <button>Move all cards in this list</button>
          </div>
          <hr />
          <div
            className="lists-menu__btn"
            onClick={() => handleListArchive(id)}
            style={{ opacity: `${isListRemoved ? "0.5" : "1"}` }}
          >
            <button disabled={isListRemoved ? true : false}>
              Archive this list
              {isListRemoved && (
                <span className="loading-notifiation">
                  <FaArrowRotateLeft />
                </span>
              )}
            </button>
          </div>
        </div>
        <div
          className="lists-menu__btn-close"
          onClick={() => handleIsListMenuVisible(false)}
        >
          <VscClose size={22} />
        </div>
      </div>
    </div>
  );
}
