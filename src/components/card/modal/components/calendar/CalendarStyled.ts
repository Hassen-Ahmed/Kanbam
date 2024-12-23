import styled from "styled-components";
import { INewTheme } from "../../../../../types/styledComp";

export const CalendarStyled = styled.div<INewTheme>`
  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["cardModal"]};

  border: 0.05rem solid
    ${({ $themeList, $newtheme }) => $themeList[$newtheme].border["secondary"]};

  .calendar {
    &__heading {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["cardModal"]};
    }

    &__start-date {
      .inputs {
        input {
          background-color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].bg["card"]};
          color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].font["secondary"]};
          border: 0.1rem solid
            ${({ $themeList, $newtheme }) =>
              $themeList[$newtheme].border["secondary"]};
        }
      }
    }

    &__due-date {
      .span {
        span {
          background-color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].bg["card"]};

          color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].font["secondary"]};

          border: 0.1rem solid
            ${({ $themeList, $newtheme }) =>
              $themeList[$newtheme].border["secondary"]};
        }
      }
    }

    &__due-date--reminder {
      #reminder {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["cardModal"]};

        border: 0.2rem solid
          ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].border["secondary"]};

        color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].font["quaternary"]};

        option {
          background-color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].bg["card"]};
        }
      }
    }

    &__btn {
      button {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["transparent"]};
      }
    }

    &__save {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["buttonAccount"]};
    }

    &__remove {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["scrollTrack"]};
    }

    .react-calendar {
      &__month-view__days,
      &__navigation {
        button,
        &__prev-button,
        &__next-button {
          color: ${({ $themeList, $newtheme }) =>
            $themeList[$newtheme].font["primary"]};
        }
      }
    }
  }
`;
