import useFetchAllWorkspace from "../../hooks/useFetchAllWorkspace";
import "./Workspaces.scss";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import { useContext, useState } from "react";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { themes } from "../../utils/constantDatas/themes";
import { IoMdAdd } from "react-icons/io";
import NewItem, { IItemDetail } from "./components/NewItem";
import Loading from "../notifications/Loading";
import { IError } from "../../types/status.type";
import Item from "./components/Item";
import AreYouSure from "../../utils/areYouSure/AreYouSure";
import UpdateItem from "./components/UpdateItem";
import ErrorMessage from "../notifications/ErrorMessage";
import useUpdates from "../../utils/api/useUpdates";
import usePosts from "../../utils/api/usePosts";
import useDeletes from "../../utils/api/useDeletes";

const WorkspacesStyled = styled.div<INewTheme>`
  background-color: ${({ $newtheme }) => themes[$newtheme].bg["lists"]};
  color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};

  .workspaces__top {
    background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
  }
  .item {
    border: 0.2rem solid
      ${({ $newtheme }) => themes[$newtheme].border["secondary"]};
  }
`;

export default function WorkspaceList() {
  const { postWorkspace } = usePosts();
  const { updateWorkspace } = useUpdates();
  const { deleteWorkspaceById } = useDeletes();
  const { theme } = useContext(KanbamContext) as IkanbamContext;
  const { data, loading, error, refetch } = useFetchAllWorkspace();

  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);

  const [requestError, setRequestError] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [IdToModify, setIdToModify] = useState("");

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
      console.log("Error Creating Board: ", error.message);
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
      console.log("Error Creating Board: ", error.message);
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
      console.log("Error Creating Board: ", error.message);
    } finally {
      setShowAreYouSureModal(false);
    }
  };

  //

  if (loading) return <Loading />;

  if (error) return <ErrorMessage />;

  return (
    <div className="workspaces-contianer">
      <WorkspacesStyled $newtheme={theme} className="workspaces">
        <div className="workspaces__top">
          <div className="user-detail">
            <h3>{data?.userDetail.userName}</h3>
            <h4>{data?.userDetail.email}</h4>
          </div>
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
            {data?.workspaces.length == 0 ? (
              <p className="empty-data">No items available to dispaly.</p>
            ) : (
              data?.workspaces.map((w) => {
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
