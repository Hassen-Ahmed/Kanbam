import { Theme } from "../utils/constantDatas/themes";

export interface IBg {
  $themename: keyof Theme;
  $group: keyof Theme["light"]["bg"];
}

export interface IFont {
  $themename: keyof Theme;
  $group: keyof Theme["light"]["font"];
}

export interface IBgAndFont {
  $themename: keyof Theme;
  $groupbg: keyof Theme["light"]["bg"];
  $groupfont: keyof Theme["light"]["font"];
}

export interface IBorder {
  $themename: keyof Theme;
  $group: keyof Theme["light"]["border"];
}

export interface INewTheme {
  $newtheme: "light" | "dark";
}
