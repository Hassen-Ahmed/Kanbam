import { useContext } from "react";
import { Theme } from "../../../types/theme.type";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";

interface IThemeAI {
  option: string;
  generatedTheme: Theme;
  animationDelay: number;
}

export default function ThemeAI({
  option,
  generatedTheme,
  animationDelay,
}: IThemeAI) {
  const { themeSetter, setRandomNum } = useContext(
    KanbamContext
  ) as IkanbamContext;

  const storeTheme = () => {
    localStorage.setItem("aiTheme", JSON.stringify(generatedTheme));
    themeSetter("aiTheme");
    setRandomNum(Math.random());
  };

  return (
    <div
      className="theme-ai"
      onClick={storeTheme}
      style={{ animationDelay: `${animationDelay / 10 + 0.1}s` }}
    >
      <p>{option}</p>
      <div className="theme-ai-colors">
        <span style={{ background: generatedTheme.bg.menu }}></span>
        <span style={{ background: generatedTheme.bg.card }}></span>
        <span style={{ background: generatedTheme.bg.sideBar }}></span>
        <span style={{ background: generatedTheme.bg.lists }}></span>
      </div>
    </div>
  );
}
