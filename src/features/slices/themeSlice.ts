import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeGeneral, themes } from "../../utils/constantDatas/themes";
import { ThemeName } from "../../types/theme.type";

interface IThemeSet {
  themeName: ThemeName;
  themeList: ThemeGeneral;
}

const initialState: IThemeSet = {
  themeName: "light",
  themeList: themes,
};

export const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeName>) => {
      localStorage.setItem("theme", action.payload);
      state.themeName = action.payload;
    },

    setThemeList: (state) => {
      const storedThemesString = localStorage.getItem("aiTheme");
      if (storedThemesString) {
        const parsedTheme = JSON.parse(storedThemesString);
        state.themeList = { ...state.themeList, aiTheme: parsedTheme };
      }
    },
  },
});

export const { setTheme, setThemeList } = themeReducer.actions;
