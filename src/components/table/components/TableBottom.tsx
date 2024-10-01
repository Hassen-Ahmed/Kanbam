import React from "react";
import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";
import TableContents from "./TableContents";
import { IGroupedContents, ITaskContent } from "../Table";

interface IIsAsceSort {
  title: boolean;
  priority: boolean;
}

interface ITableBottom {
  groupingValue: string;
  isAsceSort: IIsAsceSort;
  setIsAsceSort: React.Dispatch<React.SetStateAction<IIsAsceSort>>;
  handleSorting: (sortValue: string, sortType: keyof ITaskContent) => void;
  taskContents: ITaskContent[];
  groupedContents: IGroupedContents[];
  handleRefetch: () => Promise<void>;
}

export default function TableBottom({
  groupingValue,
  isAsceSort,
  setIsAsceSort,
  handleSorting,
  taskContents,
  groupedContents,
  handleRefetch,
}: ITableBottom) {
  return (
    <div className="table__bottom">
      <div className="headers">
        <span className="hash-tag">#</span>
        <span className="title">
          <p>TITLE</p>
          {groupingValue === "All" ? (
            <span
              className="sort"
              onClick={() => {
                setIsAsceSort((preValue) => ({
                  ...preValue,
                  title: !preValue.title,
                }));
              }}
            >
              {isAsceSort.title ? (
                <BsSortUpAlt
                  size={18}
                  onClick={() => handleSorting("asce", "title")}
                />
              ) : (
                <BsSortDownAlt
                  size={18}
                  onClick={() => handleSorting("des", "title")}
                />
              )}
            </span>
          ) : null}
        </span>
        <span className="priority">
          <p>PRIORITY</p>
          {groupingValue === "All" ? (
            <span
              className="sort"
              onClick={() => {
                setIsAsceSort((preValue) => ({
                  ...preValue,
                  priority: !preValue.priority,
                }));
              }}
            >
              {isAsceSort.priority ? (
                <BsSortUpAlt
                  size={18}
                  onClick={() => handleSorting("asce", "priority")}
                />
              ) : (
                <BsSortDownAlt
                  size={18}
                  onClick={() => handleSorting("des", "priority")}
                />
              )}
            </span>
          ) : null}
        </span>
        <span className="start-date">START DATE</span>
        <span className="due-date">DUE DATE</span>
        <span className="action">ACTION</span>
      </div>

      <TableContents
        groupingValue={groupingValue}
        taskContents={taskContents}
        groupedContents={groupedContents}
        handleRefetch={handleRefetch}
      />
    </div>
  );
}
