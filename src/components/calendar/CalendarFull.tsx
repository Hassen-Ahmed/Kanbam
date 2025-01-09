/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

import Loading from "../notifications/Loading";
import CardModal from "../card/modal/CardModal";
import { createNewTask, eventDrop, eventResize, events } from "./helpers";
import "./CalendarFull.scss";
import Event from "./Event";
import EventTaskContainer from "./EventTaskContainer";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { ICard, IListsWithCards } from "../../types/kanbam";
import { useParams } from "react-router-dom";
import useFetchAllListByBoardId from "../../hooks/useFetchAllListByBoardId";
import ErrorMessage from "../notifications/ErrorMessage";
import useUpdates from "../../utils/api/useUpdates";
import usePosts from "../../utils/api/usePosts";
import { useAppDispath, useAppSelector } from "../../features/hooks";
import { addAllList } from "../../features/slices/listsSlice";

export interface IListFewDetail {
  id: string;
  title: string;
}

const CalendarFullStyled = styled.div<INewTheme>`
  .fc {
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["primary"]};
  }
`;

const CalendarFull = () => {
  const dispatchRdx = useAppDispath();
  const { postCard } = usePosts();
  const { updateCard } = useUpdates();
  const lists = useAppSelector((state) => state.lists.lists);

  const searchText = useAppSelector((state) => state.kanbam.searchText);
  const { themeName, themeList } = useAppSelector((state) => state.theme);
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
  const filterCardDetail = useCallback(
    (newLists: IListsWithCards[]) => {
      let cardListFiltered: ICard[] = [];
      const cardList: ICard[] = [];

      const cardsArrayList = newLists?.map((list) => {
        setListsFewDetail((preValue) => [
          ...preValue,
          { id: list.id!, title: list.title },
        ]);
        return list?.cards;
      });

      cardsArrayList?.forEach((cards) =>
        cards?.forEach((card) => cardList.push(card))
      );

      cardListFiltered = cardList.filter((card) =>
        card.title.toLowerCase().includes(searchText)
      );

      return cardListFiltered;
    },
    [searchText]
  );

  const handleCardDetailsAssignment = useCallback(() => {
    let newLists: IListsWithCards[] = [];

    if (!lists) {
      dispatchRdx(addAllList(data as IListsWithCards[]));
      localStorage.setItem("storedLists", JSON.stringify(data));
      newLists = data!;
    } else {
      newLists = lists;
    }
    setCardDetails(filterCardDetail(newLists));
  }, [lists, data, dispatchRdx, filterCardDetail]);

  useEffect(() => {
    handleCardDetailsAssignment();
    console.log("data");
  }, [handleCardDetailsAssignment]);

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
    eventDrop(info, cardDetails!, updateCard);
  };

  const handleEventResize = (info: any) => {
    eventResize(info, cardDetails!, updateCard).then(() => {
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
    createNewTask(dispatchRdx, lists!, newTask, postCard).then(() => {
      setNewTask((preValue) => ({ ...preValue, title: "" }));
    });

    setShowAddTask(false);
  };

  if (loading) return <Loading />;

  if (error)
    return (
      <ErrorMessage message={error.message} statusCode={error.statusCode} />
    );

  return (
    <CalendarFullStyled
      $themeList={themeList}
      $newtheme={themeName}
      className="calendar-full"
      style={{
        backgroundColor: themeName == "light" ? "#ffffff" : "#3d4349",
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
