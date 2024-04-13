import { useRef, useState } from "react";
import Lists from "../lists/Lists";
import { ICard } from "../../types/lists.type";
import { BoardType } from "../../types/board.type";
import { IoMdAdd } from "react-icons/io";
import "./Board.scss";

const board: BoardType = [
  // id: objectId / id
  {
    id: 1,
    title: "title",
    isDragging: false,
    indexNumber: 0,
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
    isDragging: false,
    indexNumber: 1,
    list: [
      {
        id: 2,
        title: "Heading Lorem, Pariatur sunt Lorem, Pariatur sunt",
        description: "Lorem, Pariatur sunt",
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
  {
    id: 3,
    title: "title",
    isDragging: false,
    indexNumber: 2,
    list: [],
  },
  {
    id: 4,
    title: "title",
    isDragging: false,
    indexNumber: 3,
    list: [],
  },
  {
    id: 5,
    title: "title",
    isDragging: false,
    indexNumber: 4,
    list: [],
  },
];

const Board = () => {
  const [lists, setLists] = useState<BoardType>(board);
  const itemDragging = useRef<ICard | null>(null);

  return (
    <div className="board-container">
      <div className="board">
        {lists.map((list) => {
          // list === {id:100, list:[]}
          return (
            <Lists
              key={list.id}
              id={list.id}
              list={list.list}
              setLists={setLists}
              idOfList={list.id}
              title={list.title}
              itemDragging={itemDragging}
            />
          );
        })}

        <div className="board__btn--add">
          <IoMdAdd size={20} />
          <p>Add another list</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
