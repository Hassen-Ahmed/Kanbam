// theme.js

export const themes = {
  light: {
    bg: {
      navBar: "#3d567d",
      navGlass: "#22272b68",
      sideBar: "#3d547dfc",
      lists: "#f1f2f4",
      card: "#ffffff",
      cardModal: "#ffffff",
      menu: "#f1f2f4",
      buttonAccount: "#1a66d8",
      scrollTrack: "#445777fc",
      hover: "#6e849626",
      hoverSecondar: "#8aa2b65a",
      hoverTertiary: "#6e849640",
      transparent: "transparent",
    },

    font: {
      primary: "#5e6c84",
      secondary: "#728393",
      tertiary: "#ffffff",
      quaternary: "#000000b3",
    },
    border: {
      primary: "#45505b",
      secondary: "#abb7c480",
      tertiary: "#59a4e1",
    },
  },

  dark: {
    bg: {
      navBar: "#1d2125",
      navGlass: "#22272b68",
      sideBar: "#1e2429fc",
      lists: "#101204",
      card: "#21262a",
      cardModal: "#323940",
      menu: "#283036",
      buttonAccount: "#1a66d8",
      scrollTrack: "#1e2429fc",
      hover: "#c1d3ef1a",
      hoverSecondar: "#c1d3ef1a",
      hoverTertiary: "#c1d3ef40",
      transparent: "transparent",
    },

    font: {
      primary: "#adbccc",
      secondary: "#ffffff",
      tertiary: "#d8d6d6",
      quaternary: "#adbccc",
    },
    border: {
      primary: "#e9e9e9",
      secondary: "#abb7c480",
      tertiary: "#59a4e1",
    },
  },

  aiTheme: {
    bg: {
      navBar: "#1d2125",
      navGlass: "#22272b68",
      sideBar: "#1e2429fc",
      lists: "#101204",
      card: "#21262a",
      cardModal: "#323940",
      menu: "#283036",
      buttonAccount: "#1a66d8",
      scrollTrack: "#1e2429fc",
      hover: "#c1d3ef1a",
      hoverSecondar: "#c1d3ef1a",
      hoverTertiary: "#c1d3ef40",
      transparent: "transparent",
    },

    font: {
      primary: "#adbccc",
      secondary: "#ffffff",
      tertiary: "#d8d6d6",
      quaternary: "#adbccc",
    },
    border: {
      primary: "#e9e9e9",
      secondary: "#abb7c480",
      tertiary: "#59a4e1",
    },
  },
};

const storedThemesString = localStorage.getItem("themeAi");

if (storedThemesString) {
  const parsedTheme = JSON.parse(storedThemesString);
  themes.aiTheme = parsedTheme;
}

export type ThemeGeneral = typeof themes;
