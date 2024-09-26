import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import "./Task.scss";
import { themes } from "../../utils/constantDatas/themes";
import { useContext } from "react";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";

interface ITask {
  title: string;
  priority: string;
}
interface newINewTheme extends INewTheme {
  $priority: string;
}
const TaskStyled = styled.div<newINewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["card_modal"]};

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
      ${({ $newtheme }) => themes[$newtheme].bg["nav_01"]};

    background-color: ${({ $newtheme }) => themes[$newtheme].bg["lists"]};

    color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};
  }
`;

export default function Task({ title, priority }: ITask) {
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  return (
    <TaskStyled $newtheme={theme} $priority={priority} className="task">
      <div className="task__heading">
        <h3>{title}</h3>
      </div>
      <div className="task__priority">
        <p>{priority}</p>
      </div>
    </TaskStyled>
  );
}
