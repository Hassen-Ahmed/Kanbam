import { ICard } from "../../types/lists.type";
import "./Card.scss";

const Card = ({ title }: ICard) => {
  return (
    <div className="card-container">
      <div className="card">
        <h2 className="card__heading">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
