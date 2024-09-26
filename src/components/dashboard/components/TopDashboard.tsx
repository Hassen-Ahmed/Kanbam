import { useContext } from "react";
import PieChart from "../charts/PieChart";
import { IDataPie, ITableContents } from "../Dashboard";
import { ListsContext } from "../../../context/ListsContext";
import { BoardType, IListsContext } from "../../../types/board.type";

interface ITopDashboard {
  dataPie: IDataPie[];
  handlePieData: (priority: string, lists: BoardType) => void;
  handleListTitle: (title: string, lists: BoardType) => void;
  listTitles: string[];
  tableContents: ITableContents[];
}
export default function TopDashboard({
  dataPie,
  handlePieData,
  handleListTitle,
  listTitles,
  tableContents,
}: ITopDashboard) {
  const { lists } = useContext(ListsContext) as IListsContext;

  return (
    <div className="top">
      <div className="pie">
        <div className="headers">
          <h2>Priorities: </h2>
          <select
            name="priorities"
            id="priorities"
            onChange={(ev) => handlePieData(ev.target.value, lists!)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="chart">
          <PieChart data={dataPie!} />
        </div>
      </div>
      <div className="table">
        <div className="headers">
          <h2>Tasks on:</h2>
          <select
            name="taskon"
            id="taskon"
            onChange={(ev) => handleListTitle(ev.target.value, lists!)}
          >
            {listTitles.map((title, i) => {
              return (
                <option key={i} value={title}>
                  {title}
                </option>
              );
            })}
          </select>
        </div>

        <h3>{tableContents?.length} Cards</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Priority</th>
                <th>List</th>
              </tr>
            </thead>
            <tbody>
              {tableContents &&
                tableContents.map(({ cardTitle, priority, list }, i) => {
                  return (
                    <tr key={cardTitle}>
                      <td>{i + 1}</td>
                      <td>
                        {cardTitle.slice(0, 30)}
                        {cardTitle.length >= 30 && "..."}
                      </td>
                      <td>{priority}</td>
                      <td>{list}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
