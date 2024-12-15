import { ICard, IListsWithCards } from "../../types/kanbam";
import { IGroupedContents, ITaskContent } from "./Table";

const createCardGroupContent = (card: ICard): ITaskContent => ({
  id: card.id!,
  title: card.title,
  priority: card.priority || "-",
  startDate: card.startDate || "-",
  dueDate: card.dueDate || "-",
  listId: card.listId,
});

export const handleFiltering = (
  filterValue: string,
  lists: IListsWithCards[]
) => {
  let selectedDate = new Date().getDate();
  let selectedMonth = new Date().getMonth() + 1;
  const selectedYear = new Date().getFullYear();

  switch (filterValue) {
    case "Yesterday":
      selectedDate -= 1;
      break;
    case "Tomorrow":
      selectedDate += 1;
      break;
    case "Last month":
      selectedDate += 1;
      selectedMonth -= 1;
      break;
    case "Next month":
      selectedDate += 1;
      selectedMonth += 1;
      break;
  }

  const dateToCompare = `${selectedDate}/${
    selectedMonth <= 9 ? "0" + selectedMonth : selectedMonth
  }/${selectedYear}`;

  const filteredTaskContents: ITaskContent[] = [];

  lists?.forEach((list) => {
    list.cards?.forEach((task) => {
      if (filterValue == "All") {
        filteredTaskContents.push(createCardGroupContent(task));
      } else if (
        filterValue.includes("month") &&
        new Date(`${task.startDate}`).getMonth() + 1 == selectedMonth
      ) {
        filteredTaskContents.push(createCardGroupContent(task));
      } else if (
        filterValue.includes("year") &&
        new Date(`${task.startDate}`).getFullYear() == selectedYear
      ) {
        filteredTaskContents.push(createCardGroupContent(task));
      } else if (
        new Date(`${task.startDate}`).toLocaleDateString() == dateToCompare
      ) {
        filteredTaskContents.push(createCardGroupContent(task));
      }
    });
  });

  return filteredTaskContents;
};

export const handleGrouping = (
  groupingTerm: string,
  lists: IListsWithCards[]
) => {
  let groupedList: IGroupedContents[] = [];

  const groupByPriority = () => {
    const priorities = ["High", "Medium", "Low", null];
    return priorities.map((priority) => ({
      title: priority,
      taskList: lists
        ?.flatMap((list) => list.cards || [])
        .filter((card) => card.priority === priority)
        .map(createCardGroupContent),
    }));
  };

  const groupByListTitle = () => {
    return (
      lists?.map((list) => ({
        title: list.title,
        taskList: list.cards?.map(createCardGroupContent),
      })) || []
    );
  };

  groupedList = (
    groupingTerm === "Priority" ? groupByPriority() : groupByListTitle()
  ) as IGroupedContents[];

  return groupedList;
};

export const handleDataGrouping = (listsArg: IListsWithCards[]) => {
  const deepListsCopy = JSON.parse(
    JSON.stringify(listsArg)
  ) as IListsWithCards[];

  const cards: ITaskContent[] = [];
  const groupedList: IGroupedContents[] = [];

  deepListsCopy.forEach((list) => {
    const listGroupContent: IGroupedContents = {
      title: list.title,
      taskList: [],
    };

    list.cards?.forEach((card) => {
      const cardGroupContent: ITaskContent = {
        id: card.id!,
        title: card.title,
        priority: card.priority || "-",
        startDate: card.startDate || "-",
        dueDate: card.dueDate || "-",
        listId: card.listId,
      };

      listGroupContent.taskList.push(cardGroupContent);
      cards.push(cardGroupContent);
    });

    groupedList.push(listGroupContent);
  });

  return { groupedList, cards };
};
