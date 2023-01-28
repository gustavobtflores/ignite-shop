import { styled } from "..";

export const ProductContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "2rem",
  alignItems: "stretch",

  maxWidth: 1180,
  margin: "auto",
  padding: "0 1rem",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  height: "calc(656px - 0.5rem)",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  button: {
    marginTop: "auto",
    backgroundColor: "$green300",
    border: "none",
    padding: "1.25rem 2rem",
    borderRadius: 8,
    color: "$white",
    fontWeight: 700,
    fontSize: "$md",
    transition: "background-color 0.2s ease",

    "&:not(:disabled):hover": {
      backgroundColor: "$green500",
    },

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },

  h1: {
    fontSize: "$2xl",
    fontWeight: 700,
    color: "$gray300",
  },

  span: {
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    fontSize: "$md",
    color: "$gray300",
    marginTop: "2.5rem",
    lineHeight: 1.6,
  },
});
