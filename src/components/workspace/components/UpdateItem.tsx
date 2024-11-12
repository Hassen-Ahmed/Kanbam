import { IoMdClose } from "react-icons/io";
import "./NewItem.scss";
import { INewTheme } from "../../../types/styledComp";
import styled from "styled-components";
import { themes } from "../../../utils/constantDatas/themes";
import { useContext, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";

const NewItemStyled = styled.div<INewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
  color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
  border: 0.1rem solid ${({ $newtheme }) => themes[$newtheme].font["primary"]};

  .close-modal {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
    color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
    border: 0.1rem solid ${({ $newtheme }) => themes[$newtheme].font["primary"]};
  }
`;

export interface IItemDetail {
  name: string;
  description: string;
}

interface INewItem {
  type: string;
  requestError: boolean;
  handleItemUpdate: (item: IItemDetail) => void;
  handleUpdateItemModlaVisibility: (value: boolean) => void;
}

export default function UpdateItem({
  type,
  requestError,
  handleItemUpdate,
  handleUpdateItemModlaVisibility,
}: INewItem) {
  const { theme } = useContext(KanbamContext) as IkanbamContext;
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
      handleItemUpdate(itemDetail);
    }
  };

  return (
    <div className="new-item-container">
      <NewItemStyled $newtheme={theme} className="new-item">
        <div
          className="close-modal"
          onClick={() => handleUpdateItemModlaVisibility(false)}
        >
          <IoMdClose size={22} />
        </div>
        <h2 className="heading">{type}</h2>
        <div className="name input-container">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
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
            Update
          </button>
        </div>
        {requestError && (
          <p className="request-error">Something went wrong 404!</p>
        )}
      </NewItemStyled>

      <div
        className="new-item-overlay"
        onClick={() => handleUpdateItemModlaVisibility(false)}
      ></div>
    </div>
  );
}
