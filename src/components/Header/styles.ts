import { styled } from "@/src/styles";

export const HeaderContainer = styled("header", {
  padding: "3rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const CartButton = styled("button", {
  background: "$gray800",
  border: "none",
  borderRadius: 6,
  color: "$white",
  padding: 12,
  position: "relative",

  ".amount": {
    position: "absolute",
    top: -12,
    right: -12,
    borderRadius: "100%",
    background: "$green500",
    border: "3px solid $gray900",
    width: 24,
    height: 24,
    color: "$white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    fontWeight: 700,
  },

  variants: {
    empty: {
      true: {
        color: "$gray500",
        ".amount": {
          display: "none",
        },
      },
    },
  },
});
