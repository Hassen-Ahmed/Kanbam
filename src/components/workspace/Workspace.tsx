import { Link, useLocation, useParams } from "react-router-dom";
import useFetchAllBoardsByWorkspaceId from "../../hooks/useFetchAllBoardsByWorkspaceId";
import { useContext, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import "./Workspace.scss";
import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import { themes } from "../../utils/constantDatas/themes";
import { MdGroupAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import NewItem, { IItemDetail } from "./components/NewItem";
import Loading from "../notifications/Loading";
import { postBoard, postWorkspaceMemeber } from "../../utils/api/posts";
import { IError } from "../../types/status.type";
import { deleteBoardById } from "../../utils/api/deletes";
import AreYouSure from "../../utils/areYouSure/AreYouSure";
import Item from "./components/Item";
import UpdateItem from "./components/UpdateItem";
import { updateBoard } from "../../utils/api/updates";
import NewMember, { INewMemberDetail } from "./components/NewMember";
import Members from "./components/Members";
import { FaUsersGear } from "react-icons/fa6";
import ErrorMessage from "../notifications/ErrorMessage";

const WorkspaceStyled = styled.div<INewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["lists"]};
  color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};

  .boards__top {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
  }

  .members__list {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["lists"]};
  }

  .item {
    border: 0.2rem solid
      ${({ $newtheme }) => themes[$newtheme].border["secondary"]};
  }
`;

export default function Workspace() {
  const { w_id, w_name } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accessLevel = queryParams.get("al");

  const { data, loading, error, refetch } = useFetchAllBoardsByWorkspaceId(
    w_id!
  );

  const { theme } = useContext(KanbamContext) as IkanbamContext;

  const [showMembers, setShowMembers] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);

  const [requestError, setRequestError] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [IdToModify, setIdToModify] = useState("");

  const handleNewItemModlaVisibility = (value: boolean) =>
    setShowNewItemModal(value);

  const handleUpdateItemModlaVisibility = (value: boolean) =>
    setShowUpdateItemModal(value);

  const handleNewMemberModlaVisibility = (value: boolean) =>
    setShowNewMemberModal(value);

  const handleItemCreation = async (item: IItemDetail) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const modifiedItem = { workspaceId: w_id!, ...item };
      await postBoard(modifiedItem, token);
      handleNewItemModlaVisibility(false);
      refetch();
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      console.log("Error Creating Board: ", error.message);
    }
  };
  const handleItemUpdate = async (item: IItemDetail) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const modifiedItem = { workspaceId: w_id!, ...item };
      console.log("IdToModify: ", IdToModify);
      console.log("modifiedItem: ", modifiedItem);
      await updateBoard(IdToModify, modifiedItem, token);
      handleUpdateItemModlaVisibility(false);
      refetch();
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      console.log("Error Creating Board: ", error.message);
    }
  };

  const handleInviteMember = async (item: INewMemberDetail) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const modifiedItem = { workspaceId: w_id!, ...item };

      await postWorkspaceMemeber(modifiedItem, token);
      handleNewMemberModlaVisibility(false);
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      console.log("Error Creating Board: ", error.message);
    }
  };

  const handleItemDeletion = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }
      await deleteBoardById(IdToModify, token);
      refetch();
    } catch (err) {
      setRequestError(true);
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
      handleItemDeletion();
    }
  };

  const clickToDelete = (status: boolean, id: string) => {
    setShowAreYouSureModal(status);
    setIdToModify(id);
  };

  //

  if (loading)
    return (
      <div className="loading-notification__container">
        <Loading />
      </div>
    );

  if (error) return <ErrorMessage />;

  return (
    <div className="boards-container">
      <WorkspaceStyled $newtheme={theme} className="boards">
        <div className="boards__top">
          <div className="top-left">
            <div className="boards-name">
              <Link to={"/kanbam/w"}>
                <FaArrowAltCircleLeft size={30} />
              </Link>
              <h3>{w_name}</h3>
            </div>
          </div>

          {accessLevel == "All" && (
            <div className="top-right">
              <div className="members-btn" onClick={() => setShowMembers(true)}>
                <button>Members</button>
                <FaUsersGear size={25} />
              </div>

              <div
                className="invite"
                onClick={() => {
                  handleNewMemberModlaVisibility(true);
                  setRequestError(false);
                }}
              >
                <button>Invite</button>
                <MdGroupAdd size={25} />
              </div>
              <div
                className="create-board"
                onClick={() => {
                  handleNewItemModlaVisibility(true);
                  setRequestError(false);
                }}
              >
                <button>Create Board</button>
                <IoMdAdd size={25} />
              </div>
            </div>
          )}
        </div>
        <div className="boards__bottom">
          <div className="heading">
            <h1>Boards</h1>
          </div>
          <div className="list">
            {data?.length == 0 ? (
              <p className="empty-data">No items available to dispaly.</p>
            ) : (
              data?.map((b) => {
                return (
                  <Item
                    boardAccessLevel=""
                    key={b.boardId}
                    type={"b"}
                    id={b.boardId}
                    name={b.name}
                    description={b.description}
                    clickToDelete={clickToDelete}
                    handleUpdateItemModlaVisibility={
                      handleUpdateItemModlaVisibility
                    }
                    setRequestError={setRequestError}
                    setIdToModify={setIdToModify}
                  />
                );
              })
            )}
          </div>
        </div>
      </WorkspaceStyled>

      {showMembers && <Members w_id={w_id!} setShowMembers={setShowMembers} />}

      {showNewMemberModal && (
        <NewMember
          requestError={requestError}
          handleNewMemberModlaVisibility={handleNewMemberModlaVisibility}
          handleInviteMember={handleInviteMember}
        />
      )}

      {showAreYouSureModal && (
        <AreYouSure handleAreYouSure={handleAreYouSure} />
      )}

      {showNewItemModal && (
        <NewItem
          type={"Board"}
          requestError={requestError}
          handleItemCreation={handleItemCreation}
          handleNewItemModlaVisibility={handleNewItemModlaVisibility}
        />
      )}

      {showUpdateItemModal && (
        <UpdateItem
          type={"Board"}
          requestError={requestError}
          handleItemUpdate={handleItemUpdate}
          handleUpdateItemModlaVisibility={handleUpdateItemModlaVisibility}
        />
      )}
    </div>
  );
}
