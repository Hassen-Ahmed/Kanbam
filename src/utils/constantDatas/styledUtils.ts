import styled from "styled-components";
import { themes } from "./themes";
import { IBg, IBgAndFont, IBorder, IFont } from "../../types/styledComp";

export const Bg = styled.div<IBg>`
  background-color: ${({ $themename, $group }) =>
    themes[$themename].bg[$group]};
`;

export const Font = styled.div<IFont>`
  color: ${({ $themename, $group }) => themes[$themename].font[$group]};
`;

export const BgAndFont = styled.div<IBgAndFont>`
  background-color: ${({ $themename, $groupbg }) =>
    themes[$themename].bg[$groupbg]};

  color: ${({ $themename, $groupfont }) => themes[$themename].font[$groupfont]};
`;

export const Border = styled.div<IBorder>`
  border-color: ${({ $themename, $group }) =>
    themes[$themename].border[$group]};
`;

export const Hr = styled.hr<IBg>`
  background-color: ${({ $themename, $group }) =>
    themes[$themename].bg[$group]};
`;
