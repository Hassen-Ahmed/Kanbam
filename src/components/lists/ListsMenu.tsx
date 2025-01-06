import { useEffect, useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { FaArrowRotateLeft } from "react-icons/fa6";

import { IError } from "../../types/status.type";

import "./ListsMenu.scss";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { Hr } from "../../utils/constantDatas/styledUtils";
import useDeletes from "../../utils/api/useDeletes";
import { logger } from "../../utils/logger";
import { useAppDispath, useAppSelector } from "../../features/hooks";
import { filtetListsById } from "../../features/slices/listsSlice";

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
  const dispatchRdx = useAppDispath();
  const { deleteListsById } = useDeletes();
  const [isListRemoved, setIsListRemoved] = useState(false);
  const { themeName, themeList } = useAppSelector((state) => state.theme);

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

  const handleListArchive = async (id: string) => {
    setIsListRemoved(true);
    try {
      await deleteListsById(id, boardId);
      handleIsListMenuVisible(false);
      dispatchRdx(filtetListsById({ id }));
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
      $newtheme={themeName}
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

          <Hr
            $themeList={themeList}
            $themename={themeName}
            $group="secondary"
          />

          <div className="lists-menu__btn">
            <button>Sort by...</button>
          </div>

          <Hr
            $themeList={themeList}
            $themename={themeName}
            $group="secondary"
          />
          <div className="lists-menu__btn">
            <button>Archive all cards in this list</button>
          </div>
          <div className="lists-menu__btn">
            <button>Move all cards in this list</button>
          </div>
          <Hr
            $themeList={themeList}
            $themename={themeName}
            $group="secondary"
          />

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
