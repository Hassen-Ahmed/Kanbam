import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { IUserDecodedResult } from "../../../types/kanbam";
import "./Members.scss";
import { IoMdClose } from "react-icons/io";
import { INewTheme } from "../../../types/styledComp";
import styled from "styled-components";
import { themes } from "../../../utils/constantDatas/themes";
import { useContext, useEffect, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";
import { jwtDecode } from "jwt-decode";
import ErrorMessage from "../../notifications/ErrorMessage";
import Loading from "../../notifications/Loading";
import useFetchAllBoardMembersByBoardId from "../../../hooks/useFetchAllBoardMembersByBoardId";

const MembersStyled = styled.div<INewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
  color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
  border: 0.1rem solid ${({ $newtheme }) => themes[$newtheme].font["primary"]};

  .close-modal {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
    color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
    border: 0.1rem solid
      ${({ $newtheme }) => themes[$newtheme].border["secondary"]};
  }

  .member {
    border: 0.1rem solid
      ${({ $newtheme }) => themes[$newtheme].border["secondary"]};
  }
`;

interface IMembers {
  b_id: string;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Members({ b_id, setShowMembers }: IMembers) {
  const { theme } = useContext(KanbamContext) as IkanbamContext;
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  const { dataBoardMembers, loadingBoardMembers, errorBoardMembers } =
    useFetchAllBoardMembersByBoardId(b_id!);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { userId } = jwtDecode(token) as IUserDecodedResult;
      setCurrentUserId(userId);

      if (dataBoardMembers) {
        const filterMemberByUserId = dataBoardMembers.filter(
          (m) => m.userId == userId
        );
        setCurrentUserRole(filterMemberByUserId[0].role);
      }
    }
  }, [dataBoardMembers]);

  //

  if (loadingBoardMembers)
    return (
      <div className="loading-notification__container">
        <Loading />
      </div>
    );

  if (errorBoardMembers) return <ErrorMessage />;

  return (
    <div className="members-container">
      <MembersStyled $newtheme={theme} className="members">
        <div className="close-modal" onClick={() => setShowMembers(false)}>
          <IoMdClose size={22} />
        </div>

        <div className="list-of-item">
          {dataBoardMembers?.length ? null : (
            <p className="no-member">You're the only one here for now!</p>
          )}

          {dataBoardMembers?.map((member, i) => {
            return (
              <div key={member.boardId + `${i}`} className="item member">
                <div className="item-name">
                  <h4>{member.userName}</h4>
                  <p className="desc">{member.email}</p>
                  <p className="desc">{member.role}</p>
                </div>

                {currentUserId &&
                  currentUserRole == "Admin" &&
                  member.userId != currentUserId && (
                    <div className="item__btns">
                      <div className="btn__edit btn">
                        <MdEditNote size={20} />
                      </div>

                      <div className="btn__delete btn">
                        <MdDeleteForever size={20} />
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </MembersStyled>
      <div
        className="members-overlay"
        onClick={() => setShowMembers(false)}
      ></div>
    </div>
  );
}
