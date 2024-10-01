import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { themes } from "../../utils/constantDatas/themes";
import { useContext, useEffect, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { BoardType, IList, IListsContext } from "../../types/board.type";
import { ListsContext } from "../../context/ListsContext";
import Loading from "../notifications/Loading";
import PageReloader from "../../hooks/PageReloader";
import { handleFetchData, handleFiltering, handleGrouping } from "./Utils";
import TableBottom from "./components/TableBottom";
import "./Table.scss";
import { IActionBoard } from "../../types/actions.type";
import { handleGetAllLists } from "../calendar/helpers";
import AddNewTask from "./components/addNewTask/AddNewTask";

export interface ITaskContent {
  id: string;
  title: string;
  priority: string;
  startDate: string;
  dueDate: string;
}

export interface IGroupedContents {
  title: string;
  taskList: ITaskContent[];
}

const TableStyled = styled.div<INewTheme>`
  color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["lists"]};

  select {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
    color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};
  }
`;

export default function Table() {
  const { theme } = useContext(KanbamContext) as IkanbamContext;
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;

  const [isAsceSort, setIsAsceSort] = useState({ title: true, priority: true });
  const [taskContents, setTaskContents] = useState<ITaskContent[] | null>(null);

  const [groupingValue, setGroupingValue] = useState("All");
  const [groupedContents, setGroupedContents] = useState<
    IGroupedContents[] | null
  >(null);

  const [showModalNewTask, setShowModalNewTask] = useState(false);

  //
  PageReloader();
  //

  const handleFilter = (filterValue: string) =>
    setTaskContents(handleFiltering(filterValue, lists!));

  const handleGroup = (groupingTerm: string) => {
    setGroupedContents(handleGrouping(groupingTerm, lists!));
    if (groupingTerm == "All") handleFilter("All");
  };

  const handleSorting = (sortValue: string, sortType: keyof ITaskContent) => {
    setTaskContents((preValues) => {
      if (sortValue == "asce") {
        return preValues?.sort((a, b) =>
          a[sortType].localeCompare(b[sortType])
        ) as ITaskContent[];
      } else {
        return preValues?.sort((a, b) =>
          b[sortType].localeCompare(a[sortType])
        ) as ITaskContent[];
      }
    });
  };

  const fetchData = async (
    listsArg: BoardType,
    dispatchArg: React.Dispatch<IActionBoard>
  ) => {
    const response = await handleFetchData(listsArg!, dispatchArg);
    setGroupedContents(response.groupedList);
    setTaskContents(response.cards);
  };

  useEffect(() => {
    fetchData(lists!, dispatch);
  }, []);

  const handleRefetch = async () => {
    const responseData = (await handleGetAllLists()) as IList[];
    fetchData(responseData, dispatch);
  };

  const handleAddNewTaskShow = (status: boolean) => {
    setShowModalNewTask(status);
  };

  if (!lists) {
    return <Loading />;
  }

  return (
    <TableStyled $newtheme={theme} className="table">
      {showModalNewTask && (
        <AddNewTask
          handleAddNewTaskShow={handleAddNewTaskShow}
          handleRefetch={handleRefetch}
        />
      )}

      <div className="table__sub">
        <div className="table__top">
          <div className="heading">
            <h1>Table View</h1>
          </div>

          <div className="filter-and-group-by">
            <div className="group-by order-btn">
              <h3>Group by: </h3>

              <select
                name="groupby"
                id="groupby"
                onChange={(ev) => {
                  handleGroup(ev.target.value);
                  setGroupingValue(ev.target.value);
                }}
              >
                <option value="All">All</option>
                <option value="Lists">Lists</option>
                <option value="Priority">Priority</option>
              </select>
            </div>

            {groupingValue == "All" ? (
              <div className="filter-by order-btn">
                <h3>Filter by </h3>

                <select
                  name="filterby"
                  id="filterby"
                  onChange={(ev) => handleFilter(ev.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Yesterday">Yesterday</option>
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Last month">Last month</option>
                  <option value="This month">This month</option>
                  <option value="Next month">Next month</option>
                  <option value="This year">This year</option>
                </select>
              </div>
            ) : null}
          </div>

          <div className="add-task" onClick={() => setShowModalNewTask(true)}>
            <h3>Add new task</h3>
            <MdOutlinePlaylistAdd size={20} />
          </div>
        </div>

        <TableBottom
          groupingValue={groupingValue}
          isAsceSort={isAsceSort}
          setIsAsceSort={setIsAsceSort}
          handleSorting={handleSorting}
          taskContents={taskContents!}
          groupedContents={groupedContents!}
          handleRefetch={handleRefetch}
        />
      </div>
    </TableStyled>
  );
}
