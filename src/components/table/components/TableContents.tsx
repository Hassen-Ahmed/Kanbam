import TaskTable from "./TaskTable";
import { IGroupedContents, ITaskContent } from "../Table";

interface ITableContents {
  groupingValue: string;
  taskContents: ITaskContent[];
  groupedContents: IGroupedContents[];
  handleRefetch: () => Promise<void>;
}
export default function TableContents({
  groupingValue,
  taskContents,
  groupedContents,
  handleRefetch,
}: ITableContents) {
  return (
    <div className="contents">
      {groupingValue == "All"
        ? taskContents?.map((task, i) => (
            <TaskTable
              key={i}
              task={task}
              index={i}
              handleRefetch={handleRefetch}
              animationDelay={i}
            />
          ))
        : groupedContents?.map((content, i) => {
            return (
              <div className="content__sub" key={i}>
                <div className="grouping-title">
                  <h3>{content.title || "None"}</h3>
                </div>
                {content.taskList.map((task, i) => (
                  <TaskTable
                    key={i}
                    task={task}
                    index={i}
                    handleRefetch={handleRefetch}
                    animationDelay={i}
                  />
                ))}
              </div>
            );
          })}
    </div>
  );
}
