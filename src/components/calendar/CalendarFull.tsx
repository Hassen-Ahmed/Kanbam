/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

import { ListsContext } from "../../context/ListsContext";
import Loading from "../notifications/Loading";
import CardModal from "../card/modal/CardModal";
import { createNewTask, eventDrop, eventResize, events } from "./helpers";
import "./CalendarFull.scss";
import Event from "./Event";
import EventTaskContainer from "./EventTaskContainer";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { themes } from "../../utils/constantDatas/themes";
import { ICard, IListsContext, IListsWithCards } from "../../types/kanbam";
import { useParams } from "react-router-dom";
import useFetchAllListByBoardId from "../../hooks/useFetchAllListByBoardId";
import ErrorMessage from "../notifications/ErrorMessage";

export interface IListFewDetail {
  id: string;
  title: string;
}

const CalendarFullStyled = styled.div<INewTheme>`
  .fc {
    color: ${({ $newtheme }) => themes[$newtheme].font["primary"]};
  }
`;

const CalendarFull = () => {
  const { lists, dispatch, searchText } = useContext(
    ListsContext
  ) as IListsContext;
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  const [cardDetails, setCardDetails] = useState<ICard[] | null>(null);
  const [cardDetail, setCardDetail] = useState<ICard | null>(null);

  const [showModalCard, setShowModalCard] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<ICard>({
    id: "",
    title: "",
    listId: "",
    startDate: "",
    indexNumber: 0,
    comments: [],
  });

  const [listsFewDetail, setListsFewDetail] = useState<IListFewDetail[]>([]);

  const { b_id } = useParams();

  const { data, loading, error } = useFetchAllListByBoardId(b_id!);

  //
  const handleCardDetailsAssignment = useCallback(async () => {
    let newLists: IListsWithCards[] = [];
    const cardList: ICard[] = [];
    let cardListFiltered: ICard[] = [];

    if (!lists) {
      // const data = await handleGetAllLists();
      dispatch({ type: "ADD_ALL_LISTS", payload: data as IListsWithCards[] });
      localStorage.setItem("storedLists", JSON.stringify(data));
      newLists = data!;
    } else {
      newLists = lists;
    }

    const cardsRespone = newLists?.map((list) => {
      setListsFewDetail((preValue) => {
        return [...preValue, { id: list.id!, title: list.title }];
      });
      return list?.cards;
    });

    cardsRespone?.forEach((cards) => {
      cards?.forEach((card) => cardList.push(card));
    });

    cardListFiltered = cardList.filter((card) =>
      card.title.toLocaleLowerCase().includes(searchText.trim())
    );

    setCardDetails(cardListFiltered);
  }, [lists, dispatch, data, searchText]);

  useEffect(() => {
    handleCardDetailsAssignment();
  }, [searchText, lists, handleCardDetailsAssignment]);

  const handleDateClick = (info: any) => {
    const listsTitle = listsFewDetail.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );
    const year = new Date(info.dateStr).getFullYear();
    const month = new Date(info.dateStr).getMonth() + 1;
    const day = new Date(info.dateStr).getDate();

    const startDate = new Date(`${year}/${month}/${day}`).toISOString();

    setListsFewDetail(listsTitle);
    setNewTask((preValue) => {
      return {
        ...preValue,
        startDate,
        listId: listsTitle[0].id,
      };
    });

    setShowAddTask(true);
  };

  const handleEventDrop = (info: any) => {
    eventDrop(info, cardDetails!);
  };

  const handleEventResize = (info: any) => {
    eventResize(info, cardDetails!).then(() => {
      setNewTask((preValue) => ({ ...preValue, title: "" }));
    });
    setShowAddTask(false);
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <Event
        eventInfo={eventInfo}
        cardDetails={cardDetails}
        setCardDetail={setCardDetail}
        setShowModalCard={setShowModalCard}
      />
    );
  };

  // const renderSlotLabelContent = (slotInfo: any) => {
  //   return (
  //     <div>
  //       <span>{slotInfo.text}</span>
  //       {/* Add custom HTML or React components here */}
  //       <div style={{ fontSize: "10px", color: "gray" }}>
  //         Custom Component Here
  //       </div>
  //     </div>
  //   );
  // };

  const handleModlaVisibility = (value: boolean) => {
    setShowModalCard(value);
  };

  const handleAddNewTask = async () => {
    createNewTask(dispatch, lists!, newTask).then(() => {
      setNewTask((preValue) => ({ ...preValue, title: "" }));
    });

    setShowAddTask(false);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMessage />;

  return (
    <CalendarFullStyled
      $newtheme={theme}
      className="calendar-full"
      style={{
        backgroundColor: theme == "light" ? "#ffffff" : "#3d4349",
      }}
    >
      {!cardDetails && <Loading />}

      {showModalCard && cardDetails && (
        <CardModal
          cardDetail={cardDetail!}
          handleModlaVisibility={handleModlaVisibility}
        />
      )}

      {
        <EventTaskContainer
          showAddTask={showAddTask}
          setNewTask={setNewTask}
          listsFewDetail={listsFewDetail}
          newTask={newTask}
          handleAddNewTask={handleAddNewTask}
          setShowAddTask={setShowAddTask}
        />
      }

      <FullCalendar
        plugins={[
          timeGridPlugin,
          dayGridPlugin,
          multiMonthPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth" // "dayGridMonth" timeGridWeek
        editable={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek dayGridMonth,multiMonthYear",
        }}
        events={events(cardDetails)}
        eventContent={renderEventContent}
        // slotLabelContent={renderSlotLabelContent}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
      />
    </CalendarFullStyled>
  );
};

export default CalendarFull;
