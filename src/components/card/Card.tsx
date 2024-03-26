import { FC } from "react";
import { ICard } from "../../types/lists.type";
import "./Card.scss";

const Card: FC<ICard> = ({ title }) => {
  return (
    <div className="card-container">
      <div className="card">
        <h2 className="card__heading">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
