import TaskTable from "./TaskTable";
import { IGroupedContents, ITaskContent } from "../Table";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../features/hooks";

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
  const searchText = useAppSelector((state) => state.kanbam.searchText);
  const [filterdTaskContents, setFilterdTaskContents] =
    useState<ITaskContent[]>(taskContents);
  const [filterdGroupedContents, setFilterdGroupedContents] = useState<
    IGroupedContents[] | null
  >(null);

  const filterTask = useCallback((arr: ITaskContent[], text: string) => {
    return arr.filter((cnt) => cnt.title.toLowerCase().includes(text));
  }, []);

  useEffect(() => {
    if (groupingValue === "All") {
      setFilterdTaskContents(() => filterTask(taskContents, searchText));
    } else {
      setFilterdGroupedContents(() =>
        groupedContents.map((contents) => ({
          ...contents,
          taskList: filterTask(contents.taskList, searchText),
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, groupingValue, taskContents, filterTask]);

  return (
    <div className="contents">
      {groupingValue == "All"
        ? filterdTaskContents?.map((task, i) => (
            <TaskTable
              key={i}
              task={task}
              index={i}
              handleRefetch={handleRefetch}
              animationDelay={i}
            />
          ))
        : filterdGroupedContents?.map((content, i) => {
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
