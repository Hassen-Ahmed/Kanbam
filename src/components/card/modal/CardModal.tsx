import { useContext, useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { BsTextParagraph } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";
import { deleteCardById } from "../../../utils/api/deletes";
import { VscClose } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";

import { ListsContext } from "../../../context/ListsContext";
import { BoardType, ICard, IListsContext } from "../../../types/board.type";
import { IError } from "../../../types/status.type";
import { priorities } from "../../../utils/constantDatas/priorities";
import TextEditor from "./components/textEditor/TextEditor";
import ButtonsRight from "./components/ButtonsRight";
import Comment from "./components/Comment";
import "./CardModal.scss";
import { updateCard } from "../../../utils/api/updates";
import { MdAccountCircle } from "react-icons/md";

const sizeOne = 22;
const sizeTwo = 22;

export interface IPriority {
  name: string;
  color: string;
  direction: string;
}

export default function CardModal({
  handleModlaVisibility,
  cardDetail,
}: {
  handleModlaVisibility: (value: boolean) => void;
  cardDetail: ICard;
}) {
  const [comment, setComment] = useState("");
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [priority, setPriority] = useState({
    name: "",
    color: "",
    direction: "0",
  });
  const [isPriorityPicked, setIsPriorityPicked] = useState(false);
  const [titleValueOfThisCard, setTitleOfThisCard] = useState<string>(
    cardDetail.title
  );
  const [isTitleInputVisible, setIsTitleInputVisible] =
    useState<boolean>(false);
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;

  // end of hook

  const bgColor = cardDetail.priority
    ? `${
        priorities.filter(
          (priorityObj) => priorityObj.name === cardDetail.priority
        )[0].color
      }`
    : "#00000033";

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (comment.length) {
      cardDetail.comments?.push(comment);

      try {
        await updateCard(cardDetail.id!, cardDetail, token);
        setComment("");
        setIsCommentVisible(false);
      } catch (err) {
        const error = err as IError;
        console.log(`Error message: ${error.message}`);
      } finally {
        console.log("Send put request for Comment...");
      }
    }
  };

  const computedTitle =
    titleValueOfThisCard?.length > 20
      ? titleValueOfThisCard.slice(0, 16) + "..."
      : titleValueOfThisCard;

  const handleCardArchive = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await deleteCardById(cardId, token);
      handleModlaVisibility(false);

      const updatedLists = lists?.map((listObj) => {
        if (listObj.id != cardDetail.listId) return listObj;

        const updatedList = listObj.cards?.filter((card) => card.id != cardId);

        listObj.cards = updatedList;
        return listObj;
      });

      dispatch({ type: "ADD_ALL_LISTS", payload: updatedLists as BoardType });
      localStorage.setItem("storedLists", JSON.stringify(updatedLists));
    } catch (err) {
      const error = err as IError;
      console.log("Error deleting card, err: ", error.message);
    }
  };

  const handleDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  const handlePriority = (
    changePriorityValues: boolean,
    priority: IPriority
  ) => {
    if (changePriorityValues) {
      setIsPriorityPicked((preValue) => !preValue);
      setPriority(priority);
    } else {
      setIsPriorityPicked((preValue) => !preValue);
    }
  };

  const handleTitleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (
      titleValueOfThisCard.length &&
      titleValueOfThisCard !== cardDetail.title
    ) {
      cardDetail.title = titleValueOfThisCard;

      try {
        const res = await updateCard(cardDetail.id!, cardDetail, token);
        console.log("res from CardModal:--->>", res);
        setIsTitleInputVisible(false);
      } catch (err) {
        const error = err as IError;
        console.log(`Error message: ${error.message}`);
      } finally {
        console.log("Send put request for title...");
      }
    }
  };

  const handleTitleInputClose = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key == "Enter") {
      setIsTitleInputVisible(false);
    }
  };

  const handleClosingModal = () => {
    const newLists = lists?.map((listObj) => {
      if (listObj.id != cardDetail.listId) return listObj;

      const updatedCards = listObj.cards?.map((card) => {
        if (card.id != cardDetail.id) return card;
        cardDetail.opacity = "1";
        return cardDetail;
      });

      return { ...listObj, cards: updatedCards };
    });

    dispatch({ type: "ADD_ALL_LISTS", payload: newLists as BoardType });

    handleModlaVisibility(false);
  };

  return (
    <div
      className="card-modal--container"
      style={{ zIndex: 2300 }}
      draggable="true"
      onDragStart={(ev) => handleDragStart(ev)}
    >
      <div className="card-modal">
        <div className="card-modal__btn--close" onClick={handleClosingModal}>
          <VscClose size={sizeOne} />
        </div>

        <div className="card-modal__heading">
          <div className="card-modal__heading--icon">
            <FaRegCreditCard size={sizeTwo} />
          </div>

          {!isTitleInputVisible && (
            <div
              className="edit-btn"
              onClick={() => setIsTitleInputVisible(true)}
            >
              <CiEdit size={sizeOne} />
            </div>
          )}

          {isTitleInputVisible ? (
            <input
              type="text"
              value={titleValueOfThisCard}
              onKeyDown={(ev) => handleTitleInputClose(ev)}
              autoFocus
              spellCheck="false"
              onBlur={handleTitleUpdate}
              onChange={(e) => {
                setTitleOfThisCard(e.target.value);
              }}
            />
          ) : (
            <h1 onClick={() => setIsTitleInputVisible(true)}>
              {computedTitle}
            </h1>
          )}
        </div>

        {/* main */}

        <div className="card-modal__main">
          {/* left-bar */}

          <div className="card-modal__left-bar">
            <div className="left-bar--container">
              <div className="priority">
                <h3>Priority</h3>
                <div
                  className="priority__box"
                  style={{
                    backgroundColor: `${bgColor}`,
                  }}
                >
                  <span>
                    {!cardDetail.priority ? "None" : cardDetail.priority}
                  </span>
                </div>
              </div>
              <div className="description">
                <div className="description__heading">
                  <BsTextParagraph size={sizeOne} />
                  <h2>Description</h2>
                </div>

                <div>
                  <TextEditor cardDetail={cardDetail} />
                </div>
              </div>

              <div className="activity">
                <div className="activity__heading">
                  <RxActivityLog size={sizeOne} />
                  <h2>Activity</h2>
                </div>
                <Comment
                  isCommentVisible={isCommentVisible}
                  comment={comment}
                  handleSave={handleSave}
                  setComment={setComment}
                  setIsCommentVisible={setIsCommentVisible}
                />

                <ul className="comment-list">
                  {cardDetail.comments?.map((comment) => {
                    return (
                      <div className="comment-with-icon">
                        <MdAccountCircle size={32} />
                        <li key={comment}>{comment}</li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* right-bar */}

          <div className="card-modal__right-bar">
            <div className="right-bar--container">
              <h3>Add to card</h3>
            </div>
            <ButtonsRight
              handlePriority={handlePriority}
              isPriorityPicked={isPriorityPicked}
              priorities={priorities}
              priority={priority}
              handleCardArchive={handleCardArchive}
              cardDetail={cardDetail}
            />
          </div>
        </div>
      </div>
      <div className="card-modal__overlay" onClick={handleClosingModal}></div>
    </div>
  );
}
