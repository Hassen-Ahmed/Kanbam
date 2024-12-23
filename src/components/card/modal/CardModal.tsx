import { useCallback, useContext, useState } from "react";

import { FaRegCreditCard } from "react-icons/fa";
import { BsTextParagraph } from "react-icons/bs";
import { RxActivityLog } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";

import { handleUpdateLists } from "../../../utils/order_and_update";
import { IError } from "../../../types/status.type";

import { ListsContext } from "../../../context/ListsContext";
import TextEditor from "./components/textEditor/TextEditor";
import ButtonsRight from "./components/ButtonsRight";
import Comment from "./components/Comment";
import "./CardModal.scss";
import { BgAndFont } from "../../../utils/constantDatas/styledUtils";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";
import { INewTheme } from "../../../types/styledComp";
import styled from "styled-components";
import { icons } from "./components/priorities/Priorities";
import {
  ICard,
  IComment,
  IListsContext,
  IListsWithCards,
  IUserDecodedResult,
} from "../../../types/kanbam";
import useUpdates from "../../../utils/api/useUpdates";
import useDeletes from "../../../utils/api/useDeletes";
import { ITokenContext, TokenContext } from "../../../context/TokenContext";
import { jwtDecode } from "jwt-decode";
import { logger } from "../../../utils/logger";
import { MdDeleteForever } from "react-icons/md";
import usePosts from "../../../utils/api/usePosts";
import useSignalRConnection from "../../../hooks/useSignalRConnection";
import { deepCopiedLists } from "../../lists/utilsForLists";
const ActivityStyled = styled.div<INewTheme>`
  &,
  &__comment {
    textArea {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["card"]};
      color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].font["quaternary"]};
    }
  }

  button:not(:first-child) {
    &:hover {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["hoverTertiary"]};
    }

    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["transparent"]};
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["quaternary"]};
  }
`;

const iconSizeOne = 22;
const iconSizeTwo = 22;

export default function CardModal({
  handleModlaVisibility,
  cardDetail,
}: {
  handleModlaVisibility: (value: boolean) => void;
  cardDetail: ICard;
}) {
  const { tokenInCtx } = useContext(TokenContext) as ITokenContext;
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;
  const { updateCard } = useUpdates();
  const { postCardComment } = usePosts();
  const { deleteCardById, deleteCardCommentByCommentId } = useDeletes();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<IComment[]>(cardDetail.comments);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [titleValueOfThisCard, setTitleOfThisCard] = useState<string>(
    cardDetail.title
  );

  const [isTitleInputVisible, setIsTitleInputVisible] =
    useState<boolean>(false);

  const { userId, unique_name } = jwtDecode(tokenInCtx!) as IUserDecodedResult;

  const configureOnConnections = useCallback(
    async (connection: signalR.HubConnection) => {
      let copyOfLists = deepCopiedLists(lists!);
      // create
      connection.on("ReceiveCardCommentCreated", (newCardComment: IComment) => {
        copyOfLists = copyOfLists?.map((list) => {
          const updatedCards = list.cards.map((card) => {
            if (card.id != newCardComment.cardId) return card;
            return { ...card, comments: [newCardComment, ...card.comments] };
          });

          return { ...list, cards: updatedCards };
        });

        updateListsAndStoredLists(copyOfLists);

        setComments((prevComments) => {
          return [newCardComment, ...prevComments];
        });
      });
      // update
      connection.on("ReceiveCardUpdate", (updatedCardReceived: ICard) => {
        if (!tokenInCtx) return;

        setTitleOfThisCard(() => updatedCardReceived.title);
        setComments(() => updatedCardReceived.comments);
      });
      // delete
      connection.on("ReceiveCardCommentDelete", (commentId: string) => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id != commentId)
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // SignalR connections
  useSignalRConnection({
    url: `${import.meta.env.VITE_KANBAM_HUB_URL}/cardHub?groupId=${
      cardDetail.listId
    }`,
    configureOnConnections,
  });

  const updateListsAndStoredLists = (payload: IListsWithCards[]) => {
    dispatch({
      type: "ADD_ALL_LISTS",
      payload,
    });

    localStorage.setItem("storedLists", JSON.stringify(payload));
  };

  // end of hooks

  const deleteComment = async (commentId: string) => {
    try {
      await deleteCardCommentByCommentId(cardDetail.id, commentId);
    } catch (err) {
      const error = err as IError;
      logger("error", `Error message: ${error.message}`);
    } finally {
      logger("info", "Send delete request for Comment...");
    }
  };

  const handleSave = async () => {
    if (comment.length) {
      const createdComment = {
        author: unique_name,
        description: comment,
        userId: userId,
        cardId: cardDetail.id,
      };

      try {
        await postCardComment(cardDetail.id, createdComment);

        setComment("");
        setIsCommentVisible(false);
      } catch (err) {
        const error = err as IError;
        logger("error", `Error message: ${error.message}`);
      } finally {
        logger("info", "Send put request for Comment...");
      }
    }
  };

  const handleCardArchive = async (cardId: string) => {
    try {
      await deleteCardById(cardId, cardDetail.listId);
      handleModlaVisibility(false);
    } catch (err) {
      const error = err as IError;
      logger("error", `Error deleting card, err: ${error.message}`);
    }
  };

  const handleTitleUpdate = async () => {
    if (
      titleValueOfThisCard.length &&
      titleValueOfThisCard !== cardDetail.title
    ) {
      cardDetail.title = titleValueOfThisCard;

      try {
        await updateCard(cardDetail.id!, cardDetail);
        setIsTitleInputVisible(false);
      } catch (err) {
        const error = err as IError;
        logger("error", `Error message: ${error.message}`);
      } finally {
        logger("info", "Send put request for title...");
      }
    }
  };

  const handleTitleInputClose = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key == "Enter") {
      setIsTitleInputVisible(false);
    }
  };

  const handleClosingModal = () => {
    const updatedLists = handleUpdateLists(lists!, cardDetail);
    dispatch({
      type: "ADD_ALL_LISTS",
      payload: updatedLists as IListsWithCards[],
    });
    handleModlaVisibility(false);
  };

  const handleDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  const computedTitle = () => (
    <h1 onClick={() => setIsTitleInputVisible(true)}>
      {titleValueOfThisCard?.length > 20
        ? titleValueOfThisCard.slice(0, 16) + "..."
        : titleValueOfThisCard}
    </h1>
  );

  const editIcon = () =>
    !isTitleInputVisible && (
      <div className="edit-btn" onClick={() => setIsTitleInputVisible(true)}>
        <CiEdit size={iconSizeOne} />
      </div>
    );

  const textInput = () => (
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
  );

  const commentList = () =>
    comments?.map((comment, i) => {
      return (
        <div key={comment.id + `${i}`} className="comment-with-icon">
          <div className="author">
            <p>{comment.author}</p>
          </div>
          <div className="desc">
            <p>{comment.description}</p>
          </div>

          <div className="bottom">
            <p className="created_at">
              {new Date(comment.createdAt!).toLocaleDateString()}
            </p>

            {userId == comment.userId && (
              <div
                className="bottom-right-comment"
                onClick={() => deleteComment(comment.id!)}
              >
                <MdDeleteForever size={iconSizeTwo} />
              </div>
            )}
          </div>
        </div>
      );
    });

  const commentBox = () => (
    <Comment
      isCommentVisible={isCommentVisible}
      comment={comment}
      handleSave={handleSave}
      setComment={setComment}
      setIsCommentVisible={setIsCommentVisible}
    />
  );

  const buttonList = () => (
    <ButtonsRight
      handleCardArchive={handleCardArchive}
      cardDetail={cardDetail}
    />
  );

  //  JSX

  return (
    <div
      className="card-modal--container"
      draggable="true"
      onDragStart={(ev) => handleDragStart(ev)}
    >
      <BgAndFont
        $themeList={themeList}
        $themename={theme}
        $groupbg="cardModal"
        $groupfont="quaternary"
        className="card-modal"
      >
        <div className="card-modal__btn--close " onClick={handleClosingModal}>
          <VscClose size={iconSizeOne} />
        </div>

        <div className="card-modal__heading">
          <div className="card-modal__heading--icon">
            <FaRegCreditCard size={iconSizeTwo} />
          </div>

          {editIcon()}

          {isTitleInputVisible ? textInput() : computedTitle()}
        </div>

        {/* main */}
        <div className="card-modal__main">
          {/* left-bar */}
          <div className="card-modal__left-bar">
            <div className="left-bar--container">
              <div className="priority">
                <h3>Priority</h3>
                <div className="priority__box">
                  <span>
                    {!cardDetail.priority ? "None" : cardDetail.priority}
                  </span>
                  {cardDetail.priority && (
                    <div>{icons(cardDetail.priority)}</div>
                  )}
                </div>
              </div>

              <div className="description">
                <div className="description__heading">
                  <BsTextParagraph size={iconSizeOne} />
                  <h2>Description</h2>
                </div>

                <div>
                  <TextEditor cardDetail={cardDetail} />
                </div>
              </div>

              <ActivityStyled
                $themeList={themeList}
                $newtheme={theme}
                className="activity"
              >
                <div className="activity__heading">
                  <RxActivityLog size={iconSizeOne} />
                  <h2>Activity</h2>
                </div>

                {commentBox()}

                <ul className="comment-list">{commentList()}</ul>
              </ActivityStyled>
            </div>
          </div>

          {/* right-bar */}

          <div className="card-modal__right-bar">
            <div className="right-bar--container">
              <h3>Add to card</h3>
            </div>

            {buttonList()}
          </div>
        </div>
      </BgAndFont>
      <div className="card-modal__overlay" onClick={handleClosingModal}></div>
    </div>
  );
}
