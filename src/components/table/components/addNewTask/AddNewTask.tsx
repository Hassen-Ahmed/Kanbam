import { useState } from "react";

import { VscClose } from "react-icons/vsc";
import styled from "styled-components";
import { INewTheme } from "../../../../types/styledComp";
import "./AddNewTask.scss";
import { createNewTask } from "../../../calendar/helpers";
import usePosts from "../../../../utils/api/usePosts";
import { useAppDispath, useAppSelector } from "../../../../features/hooks";

const AddTaskStyled = styled.div<INewTheme>`
  .task-add-new__sub {
    border: 0.1rem solid
      ${({ $themeList, $newtheme }) => $themeList[$newtheme].font["quaternary"]};
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["card"]};
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["secondary"]};
  }

  select,
  input {
    border: 0.1rem solid
      ${({ $themeList, $newtheme }) => $themeList[$newtheme].font["quaternary"]};
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["card"]};
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["secondary"]};
  }
`;

interface IAddNewTask {
  handleAddNewTaskShow: (status: boolean) => void;
  handleRefetch: () => Promise<void>;
}

export default function AddNewTask({
  handleAddNewTaskShow,
  handleRefetch,
}: IAddNewTask) {
  const dispatchRdx = useAppDispath();
  const { postCard } = usePosts();
  const { themeName, themeList } = useAppSelector((state) => state.theme);
  const lists = useAppSelector((state) => state.lists.lists);

  const [newTask, setNewTask] = useState({
    title: "",
    listId: lists ? lists[0].id! : "",
    startDate: new Date().toISOString(),
    indexNumber: 0,
  });

  const handleAddNewTask = async () => {
    createNewTask(dispatchRdx, lists!, newTask, postCard).then(() => {
      setNewTask((preValue) => ({ ...preValue, title: "" }));
    });
    handleRefetch();
    handleAddNewTaskShow(false);
  };

  return (
    <AddTaskStyled
      $themeList={themeList}
      $newtheme={themeName}
      className="task-add-new"
    >
      <div className="task-add-new__sub">
        <div className="task__options">
          <h2>Lists: </h2>
          <select
            name="newtask"
            id="new-task"
            onChange={(ev) =>
              setNewTask((preValue) => {
                return { ...preValue, listId: ev.target.value };
              })
            }
          >
            {lists?.map((list, i) => {
              return (
                <option value={list.id} key={i}>
                  {list.title}
                </option>
              );
            })}
          </select>
        </div>

        <input
          type="text"
          placeholder="Add new task"
          value={newTask.title}
          onChange={(ev) =>
            setNewTask((preValue) => {
              return { ...preValue, title: ev.target.value };
            })
          }
        />
        <div className="task--add-btn">
          <button onClick={handleAddNewTask}>Add card</button>
          <div
            className="close-btn"
            onClick={() => handleAddNewTaskShow(false)}
          >
            <VscClose size={20} />
          </div>
        </div>
      </div>
      <div
        className="task-overlay"
        onClick={() => handleAddNewTaskShow(false)}
      ></div>
    </AddTaskStyled>
  );
}
