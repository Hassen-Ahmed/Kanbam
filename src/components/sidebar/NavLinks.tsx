import { NavLink } from "react-router-dom";

import { MdGroupAdd, MdHelpOutline } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import { PiTableLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { HiViewBoards } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import {
  IkanbamContext,
  IParamsBoard,
  KanbamContext,
} from "../../context/kanbamContext";
import { FaUsersGear } from "react-icons/fa6";
import { IError } from "../../types/status.type";
import NewMember, { INewMemberDetail } from "./components/NewMember";

type ActiveButtonType = ({ isActive }: { isActive: boolean }) => string;

const NavLinks = ({
  handleActiveButton,
}: {
  handleActiveButton: ActiveButtonType;
}) => {
  const { paramsBoard } = useContext(KanbamContext) as IkanbamContext;
  const [localParams, setLocalParams] = useState({
    b_id: paramsBoard.b_id,
    b_name: paramsBoard.b_name,
  });

  useEffect(() => {
    if (!paramsBoard.b_id && !paramsBoard.b_name) {
      const storedParams = localStorage.getItem("paramsBoardInfo");

      if (storedParams) {
        const { b_id, b_name } = JSON.parse(storedParams) as IParamsBoard;

        if (b_id && b_name) setLocalParams({ b_id, b_name });
      }
    }
  }, [paramsBoard]);
  const [requestError, setRequestError] = useState(false);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);
  const handleNewMemberModlaVisibility = (value: boolean) =>
    setShowNewMemberModal(value);

  const handleInviteMember = async (item: INewMemberDetail) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      console.log(item);

      // const modifiedItem = { workspaceId: w_id!, ...item };

      // await postWorkspaceMemeber(modifiedItem, token);
      handleNewMemberModlaVisibility(false);
      // refetchWrMembers();
    } catch (err) {
      setRequestError(true);
      const error = err as IError;
      console.log("Error Creating Board: ", error.message);
    }
  };

  return (
    <div className="side-bar-left__btns">
      {showNewMemberModal && (
        <NewMember
          requestError={requestError}
          handleNewMemberModlaVisibility={handleNewMemberModlaVisibility}
          handleInviteMember={handleInviteMember}
        />
      )}

      <div className="side-bar-left__btn">
        <FaUsersGear />
        <p className="btn-title">Members</p>
      </div>
      <div
        className="side-bar-left__btn"
        onClick={() => {
          handleNewMemberModlaVisibility(true);
          setRequestError(false);
        }}
      >
        <MdGroupAdd />
        <p className="btn-title">Invite</p>
      </div>
      <br />
      <br />
      <NavLink
        to={`/kanbam/b/${localParams.b_id}/${localParams.b_name}`}
        className={handleActiveButton}
      >
        <div className="side-bar-left__btn">
          <HiViewBoards />
          <p className="btn-title">Board</p>
        </div>
      </NavLink>
      <NavLink
        to={`/kanbam/tb/${localParams.b_id}/${localParams.b_name}`}
        className={handleActiveButton}
      >
        <div className="side-bar-left__btn">
          <PiTableLight />
          <p className="btn-title">Table</p>
        </div>
      </NavLink>
      <NavLink
        to={`/kanbam/cal/${localParams.b_id}/${localParams.b_name}`}
        className={handleActiveButton}
      >
        <div className="side-bar-left__btn">
          <SlCalender />
          <p className="btn-title">Calender</p>
        </div>
      </NavLink>
      <NavLink
        to={`/kanbam/ds/${localParams.b_id}/${localParams.b_name}`}
        className={handleActiveButton}
      >
        <div className="side-bar-left__btn">
          <TfiDashboard />
          <p className="btn-title">Dashboard</p>
        </div>
      </NavLink>
      <div className="side-bar-left__btn--help  side-bar-left__btn ">
        <MdHelpOutline />
        <p className="btn-title">Help</p>
      </div>
    </div>
  );
};

export default NavLinks;
