export interface Theme {
  bg: {
    navBar: string;
    navGlass: string;
    sideBar: string;
    lists: string;
    card: string;
    cardModal: string;
    menu: string;
    buttonAccount: string;
    scrollTrack: string;
    hover: string;
    hoverSecondar: string;
    hoverTertiary: string;
    transparent: string;
  };

  font: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
  };
  border: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export type ThemeName = "light" | "dark" | "aiTheme";
