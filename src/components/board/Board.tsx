import { useState } from "react";
import Lists from "../lists/Lists";
import { ListsType } from "../../types/lists.type";
import { IKanbam } from "../../types/kanbam.type";
import "./Board.scss";

const kanbam: IKanbam = {
  theme: "light",
  lists: [
    {
      id: 1,
      title: "title",
      list: [
        {
          id: 1,
          title: "Heading 8",
          description: "Lorem, Pariatur sunt esse modi ",
          isDragging: false,
        },
      ],
    },
    {
      id: 2,
      title: "title",
      list: [
        {
          id: 2,
          title: "Heading 8",
          description:
            "Lorem, Pariatur sunt esse modi earum rem blanditiis Lorem, s",
          isDragging: false,
        },
        {
          id: 3,
          title: "Heading 8",
          description:
            "Lorem, Pariatur sunt esse modi earum rem blanditiis Lorem, ",
          isDragging: false,
        },
        {
          id: 4,
          title: "Heading 8",
          description:
            "Lorem, Pariatur sunt esse modi earum rem blanditiis Lorem, ",
          isDragging: false,
        },
      ],
    },
  ],
};

const Board = () => {
  const [lists, setLists] = useState<ListsType>(kanbam.lists);

  return (
    <div className="board-container">
      <div className="board">
        {lists.map((list) => {
          // list === {id:100, list:[]}
          return (
            <Lists
              key={list.id}
              list={list.list}
              setLists={setLists}
              idOfList={list.id}
              title={list.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
