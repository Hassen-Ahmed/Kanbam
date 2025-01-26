import useFetchAllWorkspace from "../../hooks/useFetchAllWorkspace";
import "./Workspaces.scss";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import NewItem, { IItemDetail } from "./components/NewItem";
import Loading from "../notifications/Loading";
import Item from "./components/Item";
import AreYouSure from "../../utils/areYouSure/AreYouSure";
import UpdateItem from "./components/UpdateItem";
import useUpdates from "../../utils/api/useUpdates";
import usePosts from "../../utils/api/usePosts";
import useDeletes from "../../utils/api/useDeletes";
import ErrorMessage from "../notifications/ErrorMessage";
import { useAppSelector } from "../../features/hooks";
import { IError, IWorkspace, StatusType } from "../../types/kanbam";
import { logger } from "../../utils/logger";

const WorkspacesStyled = styled.div<INewTheme>`
  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["lists"]};
  color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].font["secondary"]};

  .workspaces__top {
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["card"]};
  }

  .item-sub {
    border: 0.1rem solid
      ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].border["secondary"]};
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["lists"]};
  }
`;

export default function WorkspaceList() {
  const { postWorkspace } = usePosts();
  const { updateWorkspace } = useUpdates();
  const { deleteWorkspaceById } = useDeletes();
  const { themeName, themeList } = useAppSelector((state) => state.theme);
  const searchText = useAppSelector((state) => state.kanbam.searchText);
  const { status, profile } = useAppSelector((state) => state.profile);

  const { data, loading, error, refetch } = useFetchAllWorkspace();
  const [filterdWorkspaces, setFilterdWorkspaces] = useState<
    IWorkspace[] | null
  >(null);

  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);

  const [requestError, setRequestError] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [IdToModify, setIdToModify] = useState("");

  useEffect(() => {
    if (data)
      setFilterdWorkspaces(() =>
        data.filter((ws) => ws.name.toLowerCase().includes(searchText))
      );
  }, [searchText, data]);

  const handleNewItemModlaVisibility = (value: boolean) => {
    setShowNewItemModal(value);
  };

  const handleUpdateItemModlaVisibility = (value: boolean) => {
    setShowUpdateItemModal(value);
  };

  const handleItemCreation = async (item: IItemDetail) => {
    try {
      await postWorkspace(item);
      handleNewItemModlaVisibility(false);
      refetch();
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      logger("error", `Error Creating Board: ${error.message}`);
    }
  };

  const handleItemUpdate = async (item: IItemDetail) => {
    try {
      const modifiedItem = { workspaceId: IdToModify!, ...item };
      await updateWorkspace(IdToModify, modifiedItem);
      handleUpdateItemModlaVisibility(false);
      refetch();
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      logger("error", `Error Creating Board: ${error.message}`);
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

  const handleItemDeletion = async () => {
    try {
      await deleteWorkspaceById(IdToModify);
      refetch();
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      logger("error", `Error Creating Board: ${error.message}`);
    } finally {
      setShowAreYouSureModal(false);
    }
  };

  const profileElem = (profileStatus: StatusType) => {
    switch (profileStatus) {
      case "loading":
        return <p>Loading ... </p>;
      case "failed":
        return <p>Sorry, something went wrong. Try again!</p>;
      default:
        return (
          <div className="user-detail">
            <h3>{profile.userName}</h3>
            <h4>{profile.email}</h4>
          </div>
        );
    }
  };

  //
  if (loading) return <Loading />;

  if (error)
    return (
      <ErrorMessage message={error.message} statusCode={error.statusCode} />
    );

  return (
    <div className="workspaces-contianer">
      <WorkspacesStyled
        $themeList={themeList}
        $newtheme={themeName}
        className="workspaces"
      >
        <div className="workspaces__top">
          {profileElem(status)}
          <div
            className="create-workspace"
            onClick={() => {
              handleNewItemModlaVisibility(true);
              setRequestError(false);
            }}
          >
            <button>Create Workspace</button>
            <IoMdAdd size={25} />
          </div>
        </div>
        <div className="workspaces__bottom">
          <div className="heading">
            <h1>Workspaces</h1>
          </div>
          <div className="list">
            {filterdWorkspaces?.length == 0 ? (
              <p className="empty-data">No items available to dispaly.</p>
            ) : (
              filterdWorkspaces?.map((w) => {
                return (
                  <Item
                    key={w.workspaceId}
                    type={"w"}
                    id={w.workspaceId}
                    name={w.name}
                    description={w.description}
                    boardAccessLevel={w.boardAccessLevel}
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
      </WorkspacesStyled>
      {showAreYouSureModal && (
        <AreYouSure handleAreYouSure={handleAreYouSure} />
      )}

      {showNewItemModal && (
        <NewItem
          type={"Workspace"}
          requestError={requestError}
          handleItemCreation={handleItemCreation}
          handleNewItemModlaVisibility={handleNewItemModlaVisibility}
        />
      )}

      {showUpdateItemModal && (
        <UpdateItem
          type={"Workspace"}
          requestError={requestError}
          handleItemUpdate={handleItemUpdate}
          handleUpdateItemModlaVisibility={handleUpdateItemModlaVisibility}
        />
      )}
    </div>
  );
}
