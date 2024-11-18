import { NavLink, useParams } from "react-router-dom";

import { MdGroupAdd, MdHelpOutline } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import { PiTableLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { HiViewBoards } from "react-icons/hi";
import { useState } from "react";

import { FaUsersGear } from "react-icons/fa6";
import { IError } from "../../types/status.type";
import NewMember, { INewMemberDetail } from "./components/NewMember";
import { IBoardMemberCreate } from "../../types/kanbam";
import Members from "./components/Members";
import usePosts from "../../utils/api/usePosts";

type ActiveButtonType = ({ isActive }: { isActive: boolean }) => string;

const NavLinks = ({
  handleActiveButton,
}: {
  handleActiveButton: ActiveButtonType;
}) => {
  const { b_id, b_name } = useParams<{ b_id: string; b_name: string }>();
  const { postBoardMemeber } = usePosts();

  const [requestError, setRequestError] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);

  const handleNewMemberModlaVisibility = (value: boolean) =>
    setShowNewMemberModal(value);

  const handleInviteMember = async (item: INewMemberDetail) => {
    try {
      const modifiedItem = { boardId: b_id!, ...item } as IBoardMemberCreate;

      await postBoardMemeber(modifiedItem);

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

      {showMembers && <Members b_id={b_id!} setShowMembers={setShowMembers} />}

      <div className="side-bar-left__btn" onClick={() => setShowMembers(true)}>
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
        to={`/kanbam/b/${b_id}/${b_name}`}
        className={handleActiveButton}
      >
        <div className="side-bar-left__btn">
          <HiViewBoards />
          <p className="btn-title">Board</p>
        </div>
      </NavLink>
      <NavLink
        to={`/kanbam/tb/${b_id}/${b_name}`}
        className={handleActiveButton}
      >
        <div className="side-bar-left__btn">
          <PiTableLight />
          <p className="btn-title">Table</p>
        </div>
      </NavLink>
      <NavLink
        to={`/kanbam/cal/${b_id}/${b_name}`}
        className={handleActiveButton}
      >
        <div className="side-bar-left__btn">
          <SlCalender />
          <p className="btn-title">Calender</p>
        </div>
      </NavLink>
      <NavLink
        to={`/kanbam/ds/${b_id}/${b_name}`}
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
