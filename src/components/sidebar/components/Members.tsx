import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { IWorkspaceMember } from "../../../types/kanbam";
import "./Members.scss";
import { IoMdClose } from "react-icons/io";
import { INewTheme } from "../../../types/styledComp";
import styled from "styled-components";
import { themes } from "../../../utils/constantDatas/themes";
import { useContext } from "react";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";

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
  members: IWorkspaceMember[];
  setShowMembers: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Members({ members, setShowMembers }: IMembers) {
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  console.log(members);

  return (
    <div className="members-container">
      <MembersStyled $newtheme={theme} className="members">
        <div className="close-modal" onClick={() => setShowMembers(false)}>
          <IoMdClose size={22} />
        </div>

        <div className="list-of-item">
          {members.length ? null : (
            <p className="no-member">You're the only one here for now!</p>
          )}

          {members?.map((member) => {
            return (
              <div key={member.id} className="item member">
                <div className="item-name">
                  <h4>{member.userName}</h4>
                  <p className="desc">{member.email}</p>
                  <p className="desc">{member.role}</p>
                </div>

                <div className="item__btns">
                  <div className="btn__edit btn">
                    <MdEditNote size={20} />
                  </div>

                  <div className="btn__delete btn">
                    <MdDeleteForever size={20} />
                  </div>
                </div>
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
