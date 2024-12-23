import { IoMdClose } from "react-icons/io";
import "./NewItem.scss";
import { INewTheme } from "../../../types/styledComp";
import styled from "styled-components";
import { useContext, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";

const NewItemStyled = styled.div<INewTheme>`
  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["card"]};
  color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].font["secondary"]};
  border: 0.1rem solid
    ${({ $themeList, $newtheme }) => $themeList[$newtheme].font["primary"]};

  .close-modal {
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["card"]};
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["secondary"]};
    border: 0.1rem solid
      ${({ $themeList, $newtheme }) => $themeList[$newtheme].font["primary"]};
  }
`;

export interface IItemDetail {
  name: string;
  description: string;
}

interface INewItem {
  type: string;
  requestError: boolean;
  handleItemCreation: (item: IItemDetail) => void;
  handleNewItemModlaVisibility: (value: boolean) => void;
}

export default function NewItem({
  type,
  requestError,
  handleItemCreation,
  handleNewItemModlaVisibility,
}: INewItem) {
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;
  const [itemDetail, setItemDetail] = useState<IItemDetail>({
    name: "",
    description: "",
  });

  const [inputError, setInputError] = useState(false);

  const handleWriteDetail = (key: string, value: string) => {
    setItemDetail((preValue) => {
      return { ...preValue, [key]: value };
    });

    if (inputError) setInputError(false);
  };

  const handlecreate = () => {
    if (!itemDetail.name || !itemDetail.description) {
      setInputError(true);
    } else {
      handleItemCreation(itemDetail);
    }
  };

  return (
    <div className="new-item-container">
      <NewItemStyled
        $themeList={themeList}
        $newtheme={theme}
        className="new-item"
      >
        <div
          className="close-modal"
          onClick={() => handleNewItemModlaVisibility(false)}
        >
          <IoMdClose size={22} />
        </div>
        <h2 className="heading">{type}</h2>
        <div className="name input-container">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            autoFocus
            autoComplete="true"
            type="text"
            placeholder={`${type} name`}
            onChange={(ev) => handleWriteDetail("name", ev.target.value)}
          />
        </div>

        <div className="description input-container">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            autoComplete="true"
            type="text"
            placeholder={`${type} description`}
            onChange={(ev) => handleWriteDetail("description", ev.target.value)}
          />
        </div>

        {inputError && <p className="input-error">Inputs must not be empty!</p>}

        <div
          className="add-btn"
          style={{ opacity: `${requestError ? ".5" : "1"}` }}
        >
          <button disabled={requestError} onClick={handlecreate}>
            Create
          </button>
        </div>

        {requestError && (
          <p className="request-error">Something went wrong 404!</p>
        )}
      </NewItemStyled>

      <div
        className="new-item-overlay"
        onClick={() => handleNewItemModlaVisibility(false)}
      ></div>
    </div>
  );
}
