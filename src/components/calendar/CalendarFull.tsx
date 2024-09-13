/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

import { ListsContext } from "../../context/ListsContext";
import { BoardType, ICard, IListsContext } from "../../types/board.type";
import { IoMdSearch } from "react-icons/io";
import Loading from "../notifications/Loading";
import CardModal from "../card/modal/CardModal";
import {
  createNewTask,
  eventDrop,
  eventResize,
  events,
  handleGetAllLists,
} from "./helpers";
import "./CalendarFull.scss";
import Event from "./Event";
import EventTaskContainer from "./EventTaskContainer";

export interface IListFewDetail {
  id: string;
  title: string;
}

const CalendarFull = () => {
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const [searchTerm, setSearchTerm] = useState("");
  const [cardDetails, setCardDetails] = useState<ICard[] | null>(null);
  const [cardDetail, setCardDetail] = useState<ICard | null>(null);

  const [showModalCard, setShowModalCard] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<ICard>({
    title: "",
    listId: "",
    startDate: "",
    indexNumber: 0,
  });

  const [listsFewDetail, setListsFewDetail] = useState<IListFewDetail[]>([]);

  const handleCardDetailsAssignment = async () => {
    let newLists: BoardType = [];
    const cardList: ICard[] = [];
    let cardListFiltered: ICard[] = [];

    if (!lists) {
      const data = await handleGetAllLists();
      dispatch({ type: "ADD_ALL_LISTS", payload: data as BoardType });
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

    cardsRespone.forEach((cards) => {
      cards?.forEach((card) => cardList.push(card));
    });

    cardListFiltered = cardList.filter((card) =>
      card.title.toLocaleLowerCase().includes(searchTerm.trim())
    );

    setCardDetails(cardListFiltered);
  };

  useEffect(() => {
    handleCardDetailsAssignment();
  }, [searchTerm, lists]);

  useEffect(() => {
    const searchContainer =
      document.getElementsByClassName("fc-toolbar-chunk")[1];

    if (searchContainer) {
      const newDiv = document.createElement("div");
      searchContainer.appendChild(newDiv);

      const root = ReactDOM.createRoot(newDiv);
      root.render(
        <div className="calendar__search-container">
          <IoMdSearch size={22} />
          <input
            type="text"
            placeholder="Search tasks "
            onChange={(ev) => setSearchTerm(ev.target.value)}
          />
        </div>
      );
    }

    searchContainer.classList.add("calendar__search-box-title");
  }, []);

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
    eventDrop(info, lists!, cardDetails!, dispatch);
  };

  const handleEventResize = (info: any) => {
    eventResize(info, lists!, cardDetails!, dispatch).then(() => {
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

  return (
    <div className="calendar-full">
      {!cardDetails && (
        <div className="calendar-full__loading">
          <Loading />
        </div>
      )}

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
    </div>
  );
};

export default CalendarFull;
