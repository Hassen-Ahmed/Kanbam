import { Link, useLocation, useParams } from "react-router-dom";
import useFetchAllBoardsByWorkspaceId from "../../hooks/useFetchAllBoardsByWorkspaceId";
import { useCallback, useContext, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import "./Workspace.scss";
import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import { MdGroupAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import NewItem, { IItemDetail } from "./components/NewItem";
import Loading from "../notifications/Loading";
import { IError } from "../../types/status.type";
import AreYouSure from "../../utils/areYouSure/AreYouSure";
import Item from "./components/Item";
import UpdateItem from "./components/UpdateItem";
import NewMember, { INewMemberDetail } from "./components/NewMember";
import Members from "./components/Members";
import { FaUsersGear } from "react-icons/fa6";
import ErrorMessage from "../notifications/ErrorMessage";
import useUpdates from "../../utils/api/useUpdates";
import usePosts from "../../utils/api/usePosts";
import useDeletes from "../../utils/api/useDeletes";
import useSignalRConnection from "../../hooks/useSignalRConnection";
import { IBoard } from "../../types/kanbam";
import { logger } from "../../utils/logger";

const WorkspaceStyled = styled.div<INewTheme>`
  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["lists"]};
  color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].font["secondary"]};

  .boards__top {
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["card"]};
  }

  .members__list {
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["lists"]};
  }

  .item {
    border: 0.2rem solid
      ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].border["secondary"]};
  }
`;

export default function Workspace() {
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;
  const { updateBoard } = useUpdates();
  const { deleteBoardById } = useDeletes();
  const { w_id, w_name } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accessLevel = queryParams.get("al");
  const { postWorkspaceMemeber, postBoard } = usePosts();

  const { data, loading, error, setData } = useFetchAllBoardsByWorkspaceId(
    w_id!
  );

  const configureOnConnections = useCallback(
    async (connection: signalR.HubConnection) => {
      // create
      connection.on("ReceiveBoardCreated", (newItem: IBoard) => {
        setData(
          (prevItems) =>
            prevItems &&
            (prevItems.some((prevItem) => prevItem.boardId == newItem.boardId)
              ? prevItems
              : [...prevItems, newItem])
        );
      });
      // update
      connection.on("ReceiveBoardUpdate", (updatedItem: IBoard) => {
        setData(
          (prevItems) =>
            prevItems &&
            prevItems.map((item) => {
              if (item.boardId != updatedItem.boardId) return item;
              return {
                ...item,
                name: updatedItem.name,
                description: updatedItem.description,
              };
            })
        );
      });
      // delete
      connection.on("ReceiveBoardDelete", (boardId: string) =>
        setData(
          (prevItems) =>
            prevItems && prevItems.filter((item) => item.boardId != boardId)
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [showMembers, setShowMembers] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);

  const [requestError, setRequestError] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);

  const [IdToModify, setIdToModify] = useState("");

  // SignalR connections
  useSignalRConnection({
    url: `${import.meta.env.VITE_KANBAM_HUB_URL}/boardHub?groupId=${w_id}`,
    configureOnConnections,
  });

  //

  const handleNewItemModlaVisibility = (value: boolean) =>
    setShowNewItemModal(value);

  const handleUpdateItemModlaVisibility = (value: boolean) =>
    setShowUpdateItemModal(value);

  const handleNewMemberModlaVisibility = (value: boolean) =>
    setShowNewMemberModal(value);

  const handleItemCreation = async (item: IItemDetail) => {
    try {
      const modifiedItem = { workspaceId: w_id!, ...item };
      await postBoard(modifiedItem);
      handleNewItemModlaVisibility(false);
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      logger("error", `Error Creating Board: ${error.message}`);
    }
  };

  const handleItemUpdate = async (updatedItem: IItemDetail) => {
    try {
      const modifiedItem = { workspaceId: w_id!, ...updatedItem };
      await updateBoard(IdToModify, modifiedItem);
      handleUpdateItemModlaVisibility(false);
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      logger("error", `Error updating Board: ${error.message}`);
    }
  };

  const handleInviteMember = async (item: INewMemberDetail) => {
    try {
      const modifiedItem = { workspaceId: w_id!, ...item };
      await postWorkspaceMemeber(modifiedItem);
      handleNewMemberModlaVisibility(false);
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      logger("error", `Error inviing Board memeber: ${error.message}`);
    }
  };

  const handleItemDeletion = async () => {
    try {
      await deleteBoardById(IdToModify, w_id!);
      setData(
        (prevItems) =>
          prevItems && prevItems.filter((item) => item.boardId != IdToModify)
      );
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      logger("error", `Error deleting Board: ${error.message}`);
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

  if (loading) return <Loading />;

  if (error)
    return (
      <ErrorMessage message={error.message} statusCode={error.statusCode} />
    );

  return (
    <div className="boards-container">
      <WorkspaceStyled
        $themeList={themeList}
        $newtheme={theme}
        className="boards"
      >
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
