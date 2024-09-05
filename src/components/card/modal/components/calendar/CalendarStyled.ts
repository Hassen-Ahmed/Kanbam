import styled from "styled-components";
import { INewTheme } from "../../../../../types/styledComp";
import { themes } from "../../../../../utils/constantDatas/themes";

export const CalendarStyled = styled.div<INewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["card_modal"]};

  border: 0.05rem solid
    ${({ $newtheme }) => themes[$newtheme].border["secondary"]};

  .calendar {
    &__heading {
      background-color: ${({ $newtheme }) =>
        themes[$newtheme].bg["card_modal"]};
    }

    &__start-date {
      .inputs {
        input {
          background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
          color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
          border: 0.1rem solid
            ${({ $newtheme }) => themes[$newtheme].border["secondary"]};
        }
      }
    }

    &__due-date {
      .span {
        span {
          background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};

          color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};

          border: 0.1rem solid
            ${({ $newtheme }) => themes[$newtheme].border["secondary"]};
        }
      }
    }

    &__due-date--reminder {
      #reminder {
        background-color: ${({ $newtheme }) =>
          themes[$newtheme].bg["card_modal"]};

        border: 0.2rem solid
          ${({ $newtheme }) => themes[$newtheme].border["secondary"]};

        color: ${({ $newtheme }) => themes[$newtheme].font["quaternary"]};

        option {
          background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
        }
      }
    }

    &__btn {
      button {
        background-color: ${({ $newtheme }) =>
          themes[$newtheme].bg["transparent"]};
      }
    }

    &__save {
      background-color: ${({ $newtheme }) =>
        themes[$newtheme].bg["btn_account"]};
    }

    &__remove {
      background-color: ${({ $newtheme }) => themes[$newtheme].bg["scroll_01"]};
    }

    .react-calendar {
      &__month-view__days,
      &__navigation {
        button,
        &__prev-button,
        &__next-button {
          color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};
        }
      }
    }
  }
`;
