import styled from "styled-components";
import { IBg, IBgAndFont, IBorder, IFont } from "../../types/styledComp";

export const Bg = styled.div<IBg>`
  background-color: ${({ $themeList, $themename, $group }) =>
    $themeList[$themename].bg[$group]};
`;

export const Font = styled.div<IFont>`
  color: ${({ $themeList, $themename, $group }) =>
    $themeList[$themename].font[$group]};
`;

export const BgAndFont = styled.div<IBgAndFont>`
  background-color: ${({ $themeList, $themename, $groupbg }) =>
    $themeList[$themename].bg[$groupbg]};

  color: ${({ $themeList, $themename, $groupfont }) =>
    $themeList[$themename].font[$groupfont]};
`;

export const Border = styled.div<IBorder>`
  border-color: ${({ $themeList, $themename, $group }) =>
    $themeList[$themename].border[$group]};
`;

export const Hr = styled.hr<IBorder>`
  background-color: ${({ $themeList, $themename, $group }) =>
    $themeList[$themename].border[$group]};
`;
