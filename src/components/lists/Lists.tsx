import Card from "../card/Card";
import { List, ListsType } from "../../types/lists.type";
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

import "./Lists.scss";
import { useState } from "react";

interface IList {
  list: List;
  setLists: React.Dispatch<React.SetStateAction<ListsType>>;
  idOfList: number;
  title: string;
}

const Lists = ({ list, title }: IList) => {
  const [titleValue, setTitleValue] = useState<string>(title);
  const [isTitleInputVisible, setIsTitleInputVisible] =
    useState<boolean>(false);

  const hadlerTitleInputClose = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key == "Enter") {
      setIsTitleInputVisible(false);
    }
  };

  return (
    <div className="lists--container--main">
      <div className="lists--container--sub">
        <h1 className="lists__heading">
          <div className="lists__heading--text">
            {!isTitleInputVisible ? (
              <p onClick={() => setIsTitleInputVisible(true)}>{titleValue}</p>
            ) : (
              <input
                type="text"
                value={titleValue}
                onKeyDown={(ev) => hadlerTitleInputClose(ev)}
                autoFocus
                spellCheck="false"
                onBlur={() => setIsTitleInputVisible(false)}
                onChange={(e) => {
                  setTitleValue(e.target.value);
                }}
              />
            )}
          </div>
          <div className="lists__heading--btn">
            <BsThreeDots />
          </div>
        </h1>
        <div className="lists">
          {list.map((content) => {
            return <Card {...content} />;
          })}
          <div className="lists__btn--add">
            <IoMdAdd size={20} />
            <p>Add a Card</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
