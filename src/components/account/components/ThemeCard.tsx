import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Theme } from "../../../types/theme.type";
import { promptGenerator } from "../../../utils/constantDatas/prompt";
import ThemeAI from "./ThemeAI";
import "./ThemeCard.scss";

export default function ThemeCard() {
  const [themeName, setThemeName] = useState("");
  const [isThemesLoading, setIsThemesLoading] = useState(false);
  const [errorLoadingThemes, setErrorLoadingTheme] = useState(false);
  const [listOfTheme, setListOfThemes] = useState<Theme[] | null>(null);

  const options = ["Option One", "Option Two", "Option Three"];

  const generateNewThemes = async () => {
    if (!themeName) return;
    setIsThemesLoading(true);

    const geminiApiKey = `${import.meta.env.VITE_GEMINI_API_KEY}`;

    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(promptGenerator(themeName));
      const jsonString = result.response
        .text()
        .replace(/```json\n|\n```/g, "")
        .trim();
      const parsedObj = JSON.parse(jsonString);
      setListOfThemes(parsedObj);
    } catch (error) {
      console.log("error", `Error when generating AI based theme!: ${error}`);
      setErrorLoadingTheme(true);
    } finally {
      setIsThemesLoading(false);
      setThemeName("");
    }
  };

  const generatedThemes = () => {
    if (!listOfTheme) return;
    if (isThemesLoading) return;
    return (
      <>
        <p className="sub-heading">Generated themes</p>
        <div className="theme-ai-container">
          {listOfTheme?.map((gt, i) => {
            return (
              <ThemeAI
                key={i}
                option={options[i]}
                generatedTheme={gt}
                animationDelay={i}
              />
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="theme-card">
      <h3 className="heading">Create With AI</h3>

      <div className="theme-card__form">
        <input
          type="text"
          placeholder="sci-fi theme ..."
          value={themeName}
          onChange={(ev) => setThemeName(ev.target.value)}
        />
        <button onClick={generateNewThemes}>Apply</button>
      </div>

      {isThemesLoading ? (
        <div className="loading-notification">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : null}

      {errorLoadingThemes ? (
        <p className="error-loading-themes">Sorry, something went wrong!</p>
      ) : null}

      {generatedThemes()}
    </div>
  );
}
