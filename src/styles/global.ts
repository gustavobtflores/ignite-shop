import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    maxWidth: "100%",
  },

  body: {
    "-webkit-font-smoothing": "antialiased",
    fontSmooth: "always",
    textRendering: "optimizeLegibility",
    backgroundColor: "$gray900",
    color: "$gray100",
  },

  "body, input, textarea, button": {
    fontWeight: 400,
  },

  button: {
    cursor: "pointer",
  },

  a: {
    color: "inherit",
  },
});
