import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import { themes } from "../../utils/constantDatas/themes";
import { useContext, useEffect, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { ListsContext } from "../../context/ListsContext";
import { BoardType, IList, IListsContext } from "../../types/board.type";
import { handleGetAllLists } from "../calendar/helpers";
import Loading from "../notifications/Loading";
import TopDashboard from "./components/TopDashboard";
import BottomDashboard from "./components/BottomDashboard";
import Task from "./Task";
import "./Dashboard.scss";

const DashboardStyled = styled.div<INewTheme>`
  color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};

  select {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
    color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};
  }

  text {
    background-color: grey;
    color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};
  }
`;

const colors = ["#ddb892", "#e07a5f", "#ffe8d6", "#f28482"];

export interface ITableContents {
  cardTitle: string;
  priority: string;
  list: string;
}

export interface ITodayTasks {
  title: string;
  priority: string;
}

export interface IDataPie {
  id: string;
  value: number;
  color: string;
}

type Rec = Record<string, string | number>;

export interface IDataBar extends Rec {
  title: string;
  tasks: number;
}

export default function Dashboard() {
  const { theme } = useContext(KanbamContext) as IkanbamContext;
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const [listTitles, setListTitles] = useState<string[]>([]);
  const [tableContents, setTableContents] = useState<ITableContents[] | null>(
    null
  );

  const [todayTasks, setTodayTasks] = useState<ITodayTasks[]>([]);
  const [dataPie, setDataPie] = useState<IDataPie[] | null>(null);
  const [dataBar, setDataBar] = useState<IDataBar[] | null>(null);

  const handleBarData = (task: string, lists: BoardType) => {
    const collectBarData: IDataBar[] = [];

    lists?.forEach((list) => {
      const objBarData: IDataBar = {
        title: list.title,
        tasks: 0,
      };

      list.cards?.forEach((card) => {
        if (task == "Lists") {
          objBarData.tasks += 1;
        }

        if (task == "Priority" && card.priority) {
          objBarData.tasks += 1;
        }

        if (task == "Comments" && card.comments) {
          card.comments.forEach(() => {
            objBarData.tasks += 1;
          });
        }
      });

      collectBarData.push(objBarData);
      setDataBar(collectBarData);
    });
  };

  const handlePieData = (priority: string, lists: BoardType) => {
    const collectPieData: IDataPie[] = [];
    lists?.forEach((list) => {
      const objPieData: IDataPie = {
        id: list.title,
        value: 0,
        color: colors[Math.floor(Math.random() * 4)],
      };

      list.cards?.forEach((card) => {
        if (card.priority == priority) {
          objPieData.value += 1;
        }
      });

      collectPieData.push(objPieData);
      setDataPie(collectPieData);
    });
  };

  const handleListTitle = (title: string, lists: BoardType) => {
    setTableContents(() => {
      const contents: ITableContents[] = [];

      const filteredLists = lists?.filter((list) => {
        if (title.length) return list.title == title;
        return list;
      }) as IList[];

      filteredLists[0].cards?.forEach((card) => {
        contents.push({
          cardTitle: card.title!,
          priority: card.priority!,
          list: filteredLists[0].title,
        });
      });

      return contents;
    });
  };

  const fetchData = async () => {
    let newLists: BoardType = [];

    if (!lists) {
      const data = (await handleGetAllLists()) as IList[];
      dispatch({ type: "ADD_ALL_LISTS", payload: data as BoardType });
      localStorage.setItem("storedLists", JSON.stringify(data));
      newLists = [...data];
    } else {
      newLists = lists;
    }

    //
    handlePieData("High", newLists);
    handleBarData("Lists", newLists);

    //
    const tasksForToday: ITodayTasks[] = [];
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();

    newLists.forEach((list) => {
      list.cards?.forEach((card) => {
        if (
          currentDay == new Date(`${card.startDate}`).getDate() &&
          currentMonth == new Date(`${card.startDate}`).getMonth()
        )
          tasksForToday.push({ title: card.title, priority: card.priority! });
      });
    });

    setTodayTasks(tasksForToday);

    //

    handleListTitle("", newLists);
    setListTitles(() => {
      const titles: string[] = [];
      newLists.forEach((list) => titles.push(list.title));
      return titles;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!lists) {
    return <Loading />;
  }

  return (
    <DashboardStyled
      $newtheme={theme}
      className="dashboard"
      style={{
        backgroundColor: theme == "light" ? "#f1f1f1" : "#3d4349",
      }}
    >
      <div className="dashboard__heading">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-sub">
        <div className="dashboard-sub__left">
          <div className="heading">
            <h2>Task for today</h2>
          </div>
          <div className="tasks">
            {todayTasks.length ? (
              todayTasks.map((task) => {
                return <Task {...task} key={task.title} />;
              })
            ) : (
              <p>Sorry, you don't have tasks for today.</p>
            )}
          </div>
        </div>

        <div className="dashboard-sub__right">
          <TopDashboard
            dataPie={dataPie!}
            handlePieData={handlePieData}
            handleListTitle={handleListTitle}
            listTitles={listTitles}
            tableContents={tableContents!}
          />

          <BottomDashboard handleBarData={handleBarData} dataBar={dataBar!} />
        </div>
      </div>
    </DashboardStyled>
  );
}
