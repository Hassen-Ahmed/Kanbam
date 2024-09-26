import { useContext } from "react";
import BarChart from "../charts/BarChart";
import { ListsContext } from "../../../context/ListsContext";
import { BoardType, IListsContext } from "../../../types/board.type";
import { IDataBar } from "../Dashboard";

interface IBottomDashboard {
  handleBarData: (task: string, lists: BoardType) => void;
  dataBar: IDataBar[];
}

export default function BottomDashboard({
  handleBarData,
  dataBar,
}: IBottomDashboard) {
  const { lists } = useContext(ListsContext) as IListsContext;

  return (
    <div className="bottom">
      <div className="bar">
        <div className="headers">
          <h2>Cards by: </h2>
          <select
            name="cardby"
            id="cardby"
            onChange={(ev) => handleBarData(ev.target.value, lists!)}
          >
            <option value="Lists">Lists</option>
            <option value="Priority">Priority</option>
            <option value="Comments">Comments</option>
          </select>
        </div>
        <div className="chart">
          <BarChart data={dataBar} />
        </div>
      </div>
    </div>
  );
}
