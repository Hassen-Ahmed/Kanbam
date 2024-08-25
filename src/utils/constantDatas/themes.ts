// theme.js

export const themes = {
  light: {
    bg: {
      nav_01: "#3d567d",
      nav_glass: "#22272b68",
      side_bar_01: "#3d547dfc",
      lists: "#f1f2f4",
      card: "#ffffff",
      card_modal: "#ffffff",
      menu: "#f1f2f4",
      btn_account: "#1a66d8",
      scroll_01: "#445777fc",
      hover: "#6e849626",
      hover_02: "#8aa2b65a",
      hover_03: "#6e849640",
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
      nav_01: "#1d2125",
      nav_glass: "#22272b68",
      side_bar_01: "#1e2429fc",
      lists: "#101204",
      card: "#21262a",
      card_modal: "#323940",
      menu: "#283036",
      btn_account: "#1a66d8",
      scroll_01: "#1e2429fc",
      hover: "#c1d3ef1a",
      hover_02: "#c1d3ef1a",
      hover_03: "#c1d3ef40",
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
} as const;

export type Theme = typeof themes;
