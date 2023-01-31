import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
  },

  a: {
    marginTop: "5rem",
    display: "block",
    color: "$green500",
    fontSize: "$lg",
    textDecoration: "none",
    fontWeight: 700,

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImagesWrapper = styled("div", {
  display: "flex",
});

export const ImageContainer = styled("div", {
  width: 140,
  height: 140,
  background: "linear-gradient(180deg, #1ea483, #7465d4 100%)",
  padding: "0.25rem",
  marginTop: "4rem",
  borderRadius: "100%",
  boxShadow: "0px 0px 60px 0px #000000CC",

  "& + &": {
    marginLeft: "-3rem",
  },

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});
