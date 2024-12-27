/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import "./TaskTable.scss";
import styled from "styled-components";
import { INewTheme } from "../../../types/styledComp";
import { useContext, useEffect, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";
import { ITaskContent } from "../Table";
import { ListsContext } from "../../../context/ListsContext";
import CardModal from "../../card/modal/CardModal";
import AreYouSure from "../../../utils/areYouSure/AreYouSure";
import { IError } from "../../../types/status.type";
import { ICard, IListsContext } from "../../../types/kanbam";
import useDeletes from "../../../utils/api/useDeletes";

const TaskTableStyled = styled.div<INewTheme>`
  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["card"]};
  color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].font["primary"]};
`;

export default function TaskTable({
  task,
  index,
  handleRefetch,
  animationDelay,
}: {
  task: ITaskContent;
  index: number;
  handleRefetch: () => Promise<void>;
  animationDelay: number;
}) {
  const { deleteCardById } = useDeletes();
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;
  const { lists } = useContext(ListsContext) as IListsContext;

  const [showModalCard, setShowModalCard] = useState(false);
  const [showAreYouSure, setShowAreYouSure] = useState(false);
  const [cardDetail, setCardDetail] = useState<ICard | null>(null);

  const [animObj, setAnimObj] = useState({
    animationDelay: `${animationDelay / 10}s`,
    animationFillMode: "forwards",
    opacity: "0",
    transform: "2rem",
  });

  useEffect(() => {
    setTimeout(() => {
      setAnimObj((preValue) => {
        return {
          ...preValue,
          animationFillMode: "none",
          opacity: "1",
          transform: "0rem",
        };
      });
    }, 1500);
  }, []);

  const priorityColorBg = (priority: string) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";

      default:
        return "#0000001f";
    }
  };

  const handleEdit = () => {
    setCardDetail(() => {
      const cardDetailSingle: ICard[] = [];

      lists?.forEach((list) => {
        list.cards?.forEach((card) => {
          if (card.id == task.id) {
            cardDetailSingle.push(card);
          }
        });
      });

      return cardDetailSingle[0];
    });
  };

  const handleModlaVisibility = (value: boolean) => {
    setShowModalCard(value);
    handleRefetch();
  };

  const handleDeleteTask = async () => {
    try {
      await deleteCardById(task.id, task.listId);
      handleRefetch();
    } catch (err) {
      const error = err as IError;
      console.log("Error on deleting card, err:", error.message);
    } finally {
      setShowAreYouSure(false);
    }
  };

  const handleAreYouSure = (status: boolean) => {
    if (status) {
      handleDeleteTask();
    } else {
      setShowAreYouSure(false);
    }
  };

  return (
    <TaskTableStyled
      $themeList={themeList}
      $newtheme={theme}
      className="task-table"
      style={{
        ...animObj,
      }}
    >
      {showModalCard && (
        <CardModal
          cardDetail={cardDetail!}
          handleModlaVisibility={handleModlaVisibility}
        />
      )}

      {showAreYouSure && <AreYouSure handleAreYouSure={handleAreYouSure} />}

      <span className="index">{+index + 1}</span>
      <span className="title">{task.title.toUpperCase()}</span>
      <div className="priority">
        <span
          style={{
            backgroundColor: `${priorityColorBg(task.priority)}`,
          }}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>
      <span className="start-date">
        {`${
          task.startDate == "-" ? "-" : new Date(task.startDate).toDateString()
        }`}
      </span>
      <span className="due-date">
        {`${
          task.dueDate == "-"
            ? "-"
            : task.dueDate && new Date(task.dueDate).toDateString()
        }`}
      </span>
      <div className="action">
        <span
          className="edit action-btn"
          onClick={() => {
            handleEdit();
            setShowModalCard(true);
          }}
        >
          <MdEditNote size={20} />
        </span>
        <span
          className="delete action-btn"
          onClick={() => setShowAreYouSure(true)}
        >
          <MdDeleteForever size={20} />
        </span>
      </div>
    </TaskTableStyled>
  );
}
