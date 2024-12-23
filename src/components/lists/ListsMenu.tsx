import { useContext, useEffect, useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { FaArrowRotateLeft } from "react-icons/fa6";

import { IError } from "../../types/status.type";

import "./ListsMenu.scss";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { Hr } from "../../utils/constantDatas/styledUtils";
import useDeletes from "../../utils/api/useDeletes";
import { logger } from "../../utils/logger";

const ListMenuStyled = styled.div<INewTheme>`
  .lists-menu {
    border: 0.1rem solid
      ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].border["secondary"]};

    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["cardModal"]};

    &__btns {
      .lists-menu__btn {
        button {
          background-color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].bg["transparent"]};
          color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].font["primary"]};
        }
      }
    }
  }
`;

export default function ListsMenu({
  handleIsListMenuVisible,
  id,
  boardId,
  setIsNewCardInputVisible,
}: {
  handleIsListMenuVisible: (value: boolean) => void;
  id: string;
  boardId: string;
  setIsNewCardInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { deleteListsById } = useDeletes();
  const [isListRemoved, setIsListRemoved] = useState(false);
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;

  const menuListRef = useRef(null);

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
      await deleteListsById(listId, boardId);
      handleIsListMenuVisible(false);
    } catch (err) {
      const error = err as IError;
      logger("error", `Error deleting list, err:  ${error.message}`);
      setIsListRemoved(false);
    }
  };

  const archiveButton = (
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
  );

  return (
    <ListMenuStyled
      $themeList={themeList}
      $newtheme={theme}
      className="lists-menu-container"
    >
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

          <Hr $themeList={themeList} $themename={theme} $group="primary" />

          <div className="lists-menu__btn">
            <button>Sort by...</button>
          </div>

          <Hr $themeList={themeList} $themename={theme} $group="primary" />
          <div className="lists-menu__btn">
            <button>Archive all cards in this list</button>
          </div>
          <div className="lists-menu__btn">
            <button>Move all cards in this list</button>
          </div>
          <Hr $themeList={themeList} $themename={theme} $group="primary" />

          {archiveButton}
        </div>
        <div
          className="lists-menu__btn-close"
          onClick={() => handleIsListMenuVisible(false)}
        >
          <VscClose size={22} />
        </div>
      </div>
    </ListMenuStyled>
  );
}
