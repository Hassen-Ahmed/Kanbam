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
import useFetchAllWorkspaceMembersByWorkspaceId from "../../../hooks/useFetchAllWorkspaceMembersByWorkspaceId";
import ErrorMessage from "../../notifications/ErrorMessage";
import Loading from "../../notifications/Loading";
import AreYouSure from "../../../utils/areYouSure/AreYouSure";
import { IError } from "../../../types/status.type";
import UpdateMember, { IUpdateMemberDetail } from "./UpdateMember";
import useUpdates from "../../../utils/api/useUpdates";
import useDeletes from "../../../utils/api/useDeletes";

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
  w_id: string;
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Members({ w_id, setShowMembers }: IMembers) {
  const { updateWorkspaceMember } = useUpdates();
  const { deleteWorkspaceMemberById } = useDeletes();
  const { theme } = useContext(KanbamContext) as IkanbamContext;
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  const [showUpdateMemberModal, setShowUpdateMemberModal] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [IdToModify, setIdToModify] = useState<string | null>(null);
  const [requestError, setRequestError] = useState(false);

  const { dataWrMembers, loadingWrMembers, errorWrMembers, refetchWrMembers } =
    useFetchAllWorkspaceMembersByWorkspaceId(w_id!);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const { userId } = jwtDecode(accessToken) as IUserDecodedResult;
      setCurrentUserId(userId);

      if (dataWrMembers) {
        const filterMemberByUserId = dataWrMembers.filter(
          (m) => m.userId == userId
        );
        setCurrentUserRole(filterMemberByUserId[0].role);
      }
    }
  }, [dataWrMembers]);

  const handleUpdateMemberModlaVisibility = (value: boolean) =>
    setShowUpdateMemberModal(value);

  const handleUpdateMember = async (item: IUpdateMemberDetail) => {
    try {
      await updateWorkspaceMember(IdToModify!, item);
      handleUpdateMemberModlaVisibility(false);
      refetchWrMembers();
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      console.log("Error Creating Board: ", error.message);
    }
  };

  const handleMemberDeletion = async () => {
    try {
      await deleteWorkspaceMemberById(IdToModify!);
      refetchWrMembers();
    } catch (err) {
      const error = err as IError;
      console.log("Error Creating Board: ", error.message);
    } finally {
      setShowAreYouSureModal(false);
    }
  };

  const handleAreYouSure = (status: boolean) => {
    if (!status) {
      setShowAreYouSureModal(false);
    } else {
      handleMemberDeletion();
    }
  };

  const clickToUpdate = (status: boolean, id: string) => {
    setShowUpdateMemberModal(status);
    setIdToModify(id);
  };

  const clickToDelete = (status: boolean, id: string) => {
    setShowAreYouSureModal(status);
    setIdToModify(id);
  };

  //

  if (loadingWrMembers || dataWrMembers == null) return <Loading />;

  if (errorWrMembers) return <ErrorMessage />;

  return (
    <div className="members-container">
      {showAreYouSureModal && (
        <AreYouSure handleAreYouSure={handleAreYouSure} />
      )}

      {showUpdateMemberModal && (
        <UpdateMember
          type={"Workspace"}
          requestError={requestError}
          handleUpdateMember={handleUpdateMember}
          handleUpdateMemberModlaVisibility={handleUpdateMemberModlaVisibility}
        />
      )}

      <MembersStyled $newtheme={theme} className="members">
        <div className="close-modal" onClick={() => setShowMembers(false)}>
          <IoMdClose size={22} />
        </div>

        <div className="list-of-item">
          {dataWrMembers?.length ? null : (
            <p className="no-member">You're the only one here for now!</p>
          )}

          {dataWrMembers?.map((member) => {
            return (
              <div key={member.id} className="item member">
                <div className="item-name">
                  <h4>{member.userName}</h4>
                  <p className="desc">{member.email}</p>
                  <p className="desc">{member.role}</p>
                </div>

                {currentUserId &&
                  currentUserRole == "Admin" &&
                  member.userId != currentUserId && (
                    <div className="item__btns">
                      <div
                        className="btn__edit btn"
                        onClick={() => clickToUpdate(true, member.id)}
                      >
                        <MdEditNote size={20} />
                      </div>

                      <div
                        className="btn__delete btn"
                        onClick={() => clickToDelete(true, member.id)}
                      >
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
