import { useContext, useState } from "react";
import BarChart from "../charts/BarChart";
import { ListsContext } from "../../../context/ListsContext";
import { IDataBar } from "../Dashboard";
import { IListsContext, IListsWithCards } from "../../../types/kanbam";

interface IBottomDashboard {
  handleBarData: (task: string, lists: IListsWithCards[]) => void;
  dataBar: IDataBar[];
}

export default function BottomDashboard({
  handleBarData,
  dataBar,
}: IBottomDashboard) {
  const { lists } = useContext(ListsContext) as IListsContext;
  const [legendName, setLegendName] = useState("Lists");

  const deepListsCopy = JSON.parse(JSON.stringify(lists)) as IListsWithCards[];

  return (
    <div className="bottom">
      <div className="bar">
        <div className="headers">
          <h2>Cards by: </h2>
          <select
            name="cardby"
            id="cardby"
            onChange={(ev) => {
              setLegendName(ev.target.value);
              handleBarData(ev.target.value, deepListsCopy);
            }}
          >
            <option value="Lists">Lists</option>
            <option value="Priority">Priority</option>
            <option value="Comments">Comments</option>
          </select>
        </div>
        <div className="chart">
          <BarChart data={dataBar} legendName={legendName} />
        </div>
      </div>
    </div>
  );
}
