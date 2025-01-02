import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import { useAppSelector } from "../../features/hooks";
import "./Task.scss";

interface ITask {
  title: string;
  priority: string;
}

interface newINewTheme extends INewTheme {
  $priority: string;
}

const TaskStyled = styled.div<newINewTheme>`
  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["cardModal"]};

  &::after {
    background-color: ${({ $priority }) => {
      switch ($priority) {
        case "High":
          return "#c04a4a";
        case "Medium":
          return "orange";
        case "Low":
          return "#56a356";
        default:
          return "#6c6c6c";
      }
    }};
  }

  .######### {
    box-shadow: 0.1rem 0.1rem 1rem
      ${({ $themeList, $newtheme }) => $themeList[$newtheme].bg["navBar"]};

    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["lists"]};

    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["primary"]};
  }
`;

export default function Task({ title, priority }: ITask) {
  const { themeName, themeList } = useAppSelector((state) => state.theme);

  return (
    <TaskStyled
      $themeList={themeList}
      $newtheme={themeName}
      $priority={priority}
      className="task"
    >
      <div className="task__heading">
        <h3>{title}</h3>
      </div>
      <div className="task__priority">
        <p>{priority}</p>
      </div>
    </TaskStyled>
  );
}
