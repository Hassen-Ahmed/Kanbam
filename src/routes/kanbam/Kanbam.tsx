import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../components/nav/NavBar";
import SideBarLeft from "../../components/sidebar/SideBarLeft";
import { useEffect } from "react";
import { handleAppOnDrop } from "../../utils/handleAppOnDrop";
import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import { IUserDecodedResult } from "../../types/kanbam";
import useUpdates from "../../utils/api/useUpdates";
import { useAppDispath, useAppSelector } from "../../features/hooks";
import { setTheme, setThemeList } from "../../features/slices/themeSlice";
import { ThemeName } from "../../types/theme.type";
import { jwtDecode } from "jwt-decode";
import { fetchProfileThunk } from "../../features/thunks/profileThunk";
import "./Kanbam.scss";

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
  const dispatchRdx = useAppDispath();
  const { updateList, updateCard } = useUpdates();
  const lists = useAppSelector((state) => state.lists.lists);
  const { themeName, themeList } = useAppSelector((state) => state.theme);
  const { accessToken } = useAppSelector((state) => state.auth);

  const location = useLocation();

  const onDropHandler = () => handleAppOnDrop(lists, updateList, updateCard);

  useEffect(() => {
    dispatchRdx(setThemeList());

    const responseTheme = localStorage.getItem("theme") as ThemeName;

    if (!responseTheme) {
      localStorage.setItem("theme", "light");
    } else {
      dispatchRdx(setTheme(responseTheme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accessToken) {
      const { userId } = jwtDecode(accessToken) as IUserDecodedResult;
      dispatchRdx(fetchProfileThunk(userId));
    }
  }, [accessToken, dispatchRdx]);

  return (
    <GlobalStyle
      $themeList={themeList}
      $newtheme={themeName}
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
