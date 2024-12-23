export const promptGenerator = (themeName: string) => {
  return `Generate a "${themeName.toUpperCase()}" theme as a JSON array containing three distinct objects. Each object represents a variation of the theme with soft, bright, and vibrant color palettes, suitable for both light and dark UI modes. Do not include any comments in the output.

Each object in the array should define the theme using the following keys:

- bg: Background colors for UI components.
- font: Font colors categorized as primary (default text), secondary (subdued text), tertiary (highlighted text), and quaternary (special text).
- border: Border colors categorized as primary (strong borders), secondary (subtle borders), and tertiary (accent borders). These should align with a light UI aesthetic.

Example JSON format:
[
  {
    "bg": {
      "navBar": "#3d567d",
      "navGlass": "#22272b68",
      "sideBar": "#3d547dfc",
      "lists": "#f1f2f4",
      "cardModal": "#ffffff",
      "card": "#ffffff",
      "menu": "#f1f2f4",
      "buttonAccount": "#1a66d8",
      "scrollTrack": "#445777fc",
      "hover": "#6e849626",
      "hoverSecondary": "#8aa2b65a",
      "hoverTertiary": "#6e849640",
      "transparent": "transparent"
    },
    "font": {
      "primary": "#5e6c84",
      "secondary": "#728393",
      "tertiary": "#ffffff",
      "quaternary": "#000000b3"
    },
    "border": {
      "primary": "#45505b",
      "secondary": "#abb7c480",
      "tertiary": "#59a4e1"
    }
  },
  ...additional objects
]

Ensure every property is included, and each color choice reflects the specified color style (soft, bright, or vibrant). Thank you!`;
};
