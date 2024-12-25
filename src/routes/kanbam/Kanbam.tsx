import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../components/nav/NavBar";
import SideBarLeft from "../../components/sidebar/SideBarLeft";
import { ListsContext } from "../../context/ListsContext";
import { useContext } from "react";
import { handleAppOnDrop } from "../../utils/handleAppOnDrop";
import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { IListsContext } from "../../types/kanbam";
import "./Kanbam.scss";
import useUpdates from "../../utils/api/useUpdates";

export const GlobalStyle = styled.div<INewTheme>`
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["scrollTrack"]};
  }

  background-image: linear-gradient(
      180deg,
      ${({ $themeList, $newtheme }) => $themeList[$newtheme].bg["scrollTrack"]},
      ${({ $themeList, $newtheme }) => $themeList[$newtheme].bg["scrollTrack"]}
    ),
    url("/images/home-bg-01.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: soft-light;
`;

export default function Kanbam() {
  const { updateList, updateCard } = useUpdates();
  const { lists } = useContext(ListsContext) as IListsContext;
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;
  const location = useLocation();

  const onDropHandler = () => handleAppOnDrop(lists, updateList, updateCard);

  return (
    <GlobalStyle
      $themeList={themeList}
      $newtheme={theme}
      className="kanbam"
      onDrop={onDropHandler}
    >
      <NavBar />
      <div className="kanbam__sub">
        {!location.pathname.includes("kanbam/w") && <SideBarLeft />}

        <div className="kanbam__outlet">
          <Outlet />
        </div>
      </div>
    </GlobalStyle>
  );
}
