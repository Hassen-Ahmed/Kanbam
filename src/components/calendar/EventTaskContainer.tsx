import React from "react";
import { VscClose } from "react-icons/vsc";
import { ICard } from "../../types/board.type";
import { IListFewDetail } from "./CalendarFull";

interface IEventTaskContainer {
  showAddTask: boolean;
  setNewTask: (value: React.SetStateAction<ICard>) => void;
  listsFewDetail: IListFewDetail[];
  newTask: ICard;
  handleAddNewTask: () => Promise<void>;
  setShowAddTask: (value: React.SetStateAction<boolean>) => void;
}

export default function EventTaskContainer({
  showAddTask,
  setNewTask,
  listsFewDetail,
  newTask,
  handleAddNewTask,
  setShowAddTask,
}: IEventTaskContainer) {
  return (
    <div
      className="calendar-full_add-task-container"
      style={{ display: showAddTask ? "block" : "none" }}
    >
      <div className="task">
        <div className="task__options">
          <h2>Lists: </h2>
          <select
            name="newtask"
            id="new-task"
            onChange={(ev) =>
              setNewTask((preValue) => ({
                ...preValue,
                listId: ev.target.value,
              }))
            }
          >
            {listsFewDetail.map((list, i) => {
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
          onChange={(e) =>
            setNewTask((preValue) => ({
              ...preValue,
              title: e.target.value,
            }))
          }
          autoFocus
        />
        <div className="task--add-btn">
          <button onClick={handleAddNewTask}>Add card</button>
          <div className="close-btn" onClick={() => setShowAddTask(false)}>
            <VscClose size={20} />
          </div>
        </div>
      </div>
      <div className="task-overlay" onClick={() => setShowAddTask(false)}></div>
    </div>
  );
}
