import { FC } from "react";
import Card from "../card/Card";
import { List, ListsType } from "../../types/lists.type";
import "./Lists.scss";

interface IList {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<ListsType>>;
  idOfList: number;
  title: string;
}

const Lists: FC<IList> = ({ list, title }) => {
  return (
    <div className="lists--container-main">
      <div className="lists--container-sub">
        <h1 className="lists__heading">{title}</h1>
        <div className="lists">
          {list.map((content) => {
            return <Card {...content} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Lists;
