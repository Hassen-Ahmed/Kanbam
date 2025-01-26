import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./CalendarPicker.scss";
import { VscClose } from "react-icons/vsc";

import { CalendarStyled } from "./CalendarStyled";
import { months } from "../../../../../utils/constantDatas/months";
import { ICard, IError } from "../../../../../types/kanbam";
import useUpdates from "../../../../../utils/api/useUpdates";
import { useAppSelector } from "../../../../../features/hooks";
import { logger } from "../../../../../utils/logger";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type IReminder = Record<string, string | number>[];

interface IDateCard {
  isVisible: boolean;
  cardDetail: ICard;
  handleIsDatePressed: (status: boolean) => void;
}

export default function CalendarPicker({
  isVisible,
  cardDetail,
  handleIsDatePressed,
}: IDateCard) {
  const { updateCard } = useUpdates();
  const [value, onChange] = useState<Value>(null);
  const [startDate, setStartDate] = useState<Record<string, string>>({
    day: `${new Date().getDate()}`,
    month: `${new Date().getMonth() + 1}`,
    year: `${new Date().getFullYear()}`,
  });
  const [dueDateGets, setDueDateGets] = useState<number[] | null>(null);

  const [reminderDay, setReminderDay] = useState<string | number>(0);
  const { themeName, themeList } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (cardDetail.dueDate) {
      onChange(new Date(`${cardDetail.dueDate}`));
    }

    if (cardDetail.startDate) {
      setStartDate(() => {
        return {
          day: `${new Date(`${cardDetail.startDate}`).getDate()}`,
          month: `${new Date(`${cardDetail.startDate}`).getMonth() + 1}`,
          year: `${new Date(`${cardDetail.startDate}`).getFullYear()}`,
        };
      });
    }
  }, [cardDetail.dueDate, cardDetail.startDate]);

  useEffect(() => {
    const container = document.querySelector(
      ".react-calendar__viewContainer"
    ) as HTMLElement;

    const abbrElem = container.getElementsByTagName("abbr");

    for (let i = 0; i < abbrElem.length; i++) {
      const splitedAbbr = abbrElem[i]
        .getAttribute("aria-label")
        ?.split(" ") as string[]; // [9, January, 2025]

      // from startDate to dueDate bg and font color change ???

      // startDate bg and font color change
      const abbrParentElm = abbrElem[i]?.parentElement as HTMLElement;
      const selectedDay = splitedAbbr[0];
      const selectedMonth = splitedAbbr[1];

      // currentDate bg and font color
      if (
        selectedDay == `${new Date().getDate()}` &&
        selectedMonth == months[`${new Date().getMonth()}`]
      ) {
        abbrParentElm.style.background = "#1a66d8";
        abbrParentElm.style.color = "white";
      }

      // dueDateRemider bg color
      if (
        selectedDay ==
          `${new Date(`${cardDetail.dueDateReminder}`).getDate()}` &&
        selectedMonth ==
          months[`${new Date(`${cardDetail.dueDateReminder}`).getMonth()}`]
      ) {
        abbrParentElm.style.border = ".3rem solid #1a66d895 ";
      }

      // dueDate bg color
      if (
        selectedDay == `${new Date(`${cardDetail.dueDate}`).getDate()}` &&
        selectedMonth ==
          months[`${new Date(`${cardDetail.dueDate}`).getMonth()}`]
      ) {
        abbrParentElm.style.border = ".3rem solid #d81a1a95 ";
      }
    }
  }, [cardDetail.dueDate, cardDetail.dueDateReminder]);

  useEffect(() => {
    const newValue = !value ? cardDetail.dueDate : value;

    setDueDateGets(() => {
      return [
        new Date(`${newValue}`).getDate(),
        new Date(`${newValue}`).getMonth() + 1,
        new Date(`${newValue}`).getFullYear(),
      ];
    });
  }, [value, cardDetail.dueDate]);

  // end of hooks

  const dateFormats = ["day", "month", "year"];

  const reminders: IReminder = [
    { title: "At due date time", "At due date time": 0 },
    { title: "1 Day before", "1 Day before": 1 },
    { title: "2 Days before", "2 Days before": 2 },
  ];

  const handlerSetDate = (type: string, value: string) =>
    setStartDate((preDate) => ({ ...preDate, [type]: value }));

  const handleSave = async () => {
    const startedAt = `${
      startDate.year + "/" + startDate.month + "/" + startDate.day
    }`;

    cardDetail.startDate = `${new Date(startedAt).toISOString()}`;
    if (value) {
      cardDetail.dueDate = new Date(`${value}`).toISOString();

      const setDateReminder = new Date(`${value}`);
      setDateReminder.setDate(setDateReminder.getDate() - +reminderDay);
      cardDetail.dueDateReminder = `${setDateReminder.toISOString()}`;
    }

    try {
      await updateCard(cardDetail.id!, cardDetail);
    } catch (err) {
      const error = err as IError;
      logger("error", `Error message: ${error.message}`);
    } finally {
      logger("info", "Card dates are updating...");
      handleIsDatePressed(false);
    }
  };

  return (
    <CalendarStyled
      $themeList={themeList}
      $newtheme={themeName}
      className="calendar-container"
    >
      <div
        className="calendar"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="calendar__heading">
          <h1>Dates</h1>
        </div>
        <div className="calendar__btn--close button-close">
          <VscClose size={22} onClick={() => handleIsDatePressed(false)} />
        </div>
        <Calendar onChange={onChange} value={value} />
        <div className="calendar__start-date">
          <h3 className="heading">Start date: </h3>

          <div className="inputs">
            {dateFormats.map((item) => {
              return (
                <div key={item}>
                  <p>{item}</p>
                  <input
                    type="number"
                    placeholder={item}
                    value={startDate[item]}
                    onChange={(ev) =>
                      handlerSetDate(
                        item,
                        `${ev.target.value}`.slice(0, item == "year" ? 4 : 2)
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="calendar__due-date">
          <h3 className="heading">Due date: </h3>
          <div className="spans">
            {dueDateGets?.map((item, i) => {
              return (
                <div className="span" key={i}>
                  <p>{dateFormats[i]}</p>
                  <span>{item || "No"}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="calendar__due-date--reminder">
          <h3 className="heading">Set due date reminder</h3>
          <select
            name="reminder"
            id="reminder"
            onChange={(ev) =>
              setReminderDay(() => {
                return reminders.filter(
                  (reminder) => reminder.title == `${ev.target.value}`
                )[0][`${ev.target.value}`];
              })
            }
          >
            {reminders.map((reminder) => {
              return (
                <option key={reminder.title} value={reminder.title}>
                  {reminder.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="calendar__save calendar__btn">
          <button onClick={handleSave}>Save</button>
        </div>
        <div className="calendar__remove calendar__btn button-close">
          <button>Remove</button>
        </div>
      </div>
    </CalendarStyled>
  );
}
