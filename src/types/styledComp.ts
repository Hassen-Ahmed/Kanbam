import { ThemeGeneral } from "../utils/constantDatas/themes";
import { Theme } from "./theme.type";

export interface IBg {
  $themename: keyof ThemeGeneral;
  $group: keyof ThemeGeneral["light"]["bg"];
  $themeList: ThemeGeneral;
}

export interface IFont {
  $themename: keyof ThemeGeneral;
  $group: keyof ThemeGeneral["light"]["font"];
  $themeList: ThemeGeneral;
}

export interface IBgAndFont {
  $themename: keyof ThemeGeneral;
  $groupbg: keyof ThemeGeneral["light"]["bg"];
  $groupfont: keyof ThemeGeneral["light"]["font"];
  $themeList: ThemeGeneral;
}

export interface IBorder {
  $themename: keyof ThemeGeneral;
  $group: keyof ThemeGeneral["light"]["border"];
  $themeList: ThemeGeneral;
}

export interface INewTheme {
  $newtheme: "light" | "dark" | "aiTheme";
  $themeList: {
    light: Theme;
    dark: Theme;
    aiTheme: Theme;
  };
}
