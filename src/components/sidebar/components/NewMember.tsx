import { IoMdClose } from "react-icons/io";
import "./NewMember.scss";
import { useContext, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";
import styled from "styled-components";
import { INewTheme } from "../../../types/styledComp";
import { validateEmail } from "../../../utils/validations";

const NewMemberStyled = styled.div<INewTheme>`
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

export interface INewMemberDetail {
  email: string;
  role: string;
}

interface INewMember {
  requestError: boolean;
  handleInviteMember: (item: INewMemberDetail) => void;
  handleNewMemberModlaVisibility: (value: boolean) => void;
}

export default function NewMember({
  requestError,
  handleInviteMember,
  handleNewMemberModlaVisibility,
}: INewMember) {
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;
  const [inputError, setInputError] = useState(false);
  const [newMemberDetail, setNewMemberDetail] = useState<INewMemberDetail>({
    email: "",
    role: "Admin",
  });

  const handleWriteDetail = (key: string, value: string) => {
    setNewMemberDetail((preValue) => {
      return { ...preValue, [key]: value };
    });

    if (inputError) setInputError(false);
  };

  const handleInvititation = () => {
    if (
      !newMemberDetail.email ||
      !newMemberDetail.role ||
      !validateEmail(newMemberDetail.email)
    ) {
      setInputError(true);
    } else {
      handleInviteMember(newMemberDetail);
    }
  };

  return (
    <div className="board-new-member-container">
      <NewMemberStyled
        $themeList={themeList}
        $newtheme={theme}
        className="board-new-member"
      >
        <div
          className="close-modal"
          onClick={() => handleNewMemberModlaVisibility(false)}
        >
          <IoMdClose size={22} />
        </div>
        <h1 className="heading">Member</h1>
        <div className="email input-container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email address"
            onChange={(ev) => handleWriteDetail("email", ev.target.value)}
          />
        </div>

        <div className="role input-container">
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

        {inputError && (
          <p className="input-error">Input must not be empty or Wrong Email!</p>
        )}
        <div
          className="invite-btn"
          style={{ opacity: `${requestError ? ".5" : "1"}` }}
        >
          <button onClick={handleInvititation}>Invite</button>
        </div>

        {requestError && (
          <p className="request-error">Something went wrong 404!</p>
        )}
      </NewMemberStyled>
      <div
        className="board-new-member-overlay"
        onClick={() => handleNewMemberModlaVisibility(false)}
      ></div>
    </div>
  );
}
