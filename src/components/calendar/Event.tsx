/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdEditNote } from "react-icons/md";
import { ICard } from "../../types/kanbam";

interface IEvent {
  eventInfo: any;
  cardDetails: ICard[] | null;
  setCardDetail: React.Dispatch<React.SetStateAction<ICard | null>>;
  setShowModalCard: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Event({
  eventInfo,
  cardDetails,
  setCardDetail,
  setShowModalCard,
}: IEvent) {
  return (
    <div className="event">
      <span className="event__title">{eventInfo.event.title} </span>
      <div className="event-calendar-edite--btn-container">
        <div
          className="event-calendar-edite--btn"
          onClick={() => {
            setCardDetail(
              () =>
                cardDetails?.filter(
                  (card) => card.id == eventInfo.event.id
                )[0] as ICard
            );
            setShowModalCard(true);
          }}
        >
          <MdEditNote size={18} />
        </div>
      </div>
    </div>
  );
}
