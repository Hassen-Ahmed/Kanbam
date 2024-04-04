import { ICard } from "../../types/lists.type";
import "./Card.scss";

const Card = ({ title }: ICard) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card__heading">
          <h2>
            {title} someting else Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Atque, quos.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
