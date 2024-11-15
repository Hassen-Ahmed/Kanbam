import { IoMdClose } from "react-icons/io";
import "./NewItem.scss";
import { INewTheme } from "../../../types/styledComp";
import styled from "styled-components";
import { themes } from "../../../utils/constantDatas/themes";
import { useContext, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";
import "./UpdateMember.scss";

const UpdateMemberStyled = styled.div<INewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
  color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
  border: 0.1rem solid ${({ $newtheme }) => themes[$newtheme].font["primary"]};

  .close-modal {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
    color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
    border: 0.1rem solid ${({ $newtheme }) => themes[$newtheme].font["primary"]};
  }
`;

export interface IUpdateMemberDetail {
  role: string;
}

interface INewItem {
  type: string;
  requestError: boolean;
  handleUpdateMember: (item: IUpdateMemberDetail) => void;
  handleUpdateMemberModlaVisibility: (value: boolean) => void;
}

export default function UpdateMember({
  type,
  requestError,
  handleUpdateMember,
  handleUpdateMemberModlaVisibility,
}: INewItem) {
  const { theme } = useContext(KanbamContext) as IkanbamContext;
  const [itemDetail, setItemDetail] = useState<IUpdateMemberDetail>({
    role: "Admin",
  });

  const handleWriteDetail = (key: string, value: string) => {
    setItemDetail((preValue) => {
      return { ...preValue, [key]: value };
    });
  };

  const handlecreate = () => {
    if (itemDetail.role) {
      handleUpdateMember(itemDetail);
    }
  };

  return (
    <div className="update-member-container">
      <UpdateMemberStyled $newtheme={theme} className="update-member">
        <div
          className="close-modal"
          onClick={() => handleUpdateMemberModlaVisibility(false)}
        >
          <IoMdClose size={22} />
        </div>
        <h2 className="heading">{type}</h2>

        <div className="role select-contianer">
          <label htmlFor="role">Role </label>

          <select
            name="role"
            id="role"
            onChange={(ev) => handleWriteDetail("role", ev.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        <div
          className="update-btn"
          style={{ opacity: `${requestError ? ".5" : "1"}` }}
        >
          <button disabled={requestError} onClick={handlecreate}>
            Update
          </button>
        </div>

        {requestError && (
          <p className="request-error">Something went wrong 404!</p>
        )}
      </UpdateMemberStyled>

      <div
        className="update-member-overlay"
        onClick={() => handleUpdateMemberModlaVisibility(false)}
      ></div>
    </div>
  );
}
