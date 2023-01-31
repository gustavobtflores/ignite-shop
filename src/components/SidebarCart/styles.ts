import { styled } from "@/src/styles";
import * as Dialog from "@radix-ui/react-dialog";

export const Content = styled(Dialog.Content, {
  height: "100vh",
  position: "fixed",
  top: 0,
  right: 0,
  width: 480,
  padding: "72px 48px 48px",
  background: "$gray800",
  display: "flex",
  flexDirection: "column",
});

export const Close = styled(Dialog.Close, {
  position: "absolute",
  top: 24,
  right: 24,
  background: "none",
  border: "none",
  color: "white",
});

export const CartItems = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: 32,
  gap: 24,

  li: {
    listStyle: "none",
    display: "flex",
    alignItems: "stretch",
    gap: 20,
  },
});

export const ItemInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",

  span: {
    fontSize: "$md",
    color: "$gray300",
    display: "block",
    lineHeight: 1.6,
    marginBottom: 2,
  },

  strong: {
    fontSize: "$md",
    lineHeight: 1.6,
  },

  button: {
    background: "none",
    border: "none",
    color: "$green500",
    fontWeight: 700,

    "&:hover": {
      color: "$green300",
    },
  },
});

export const CartWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const ImageCard = styled("div", {
  width: 100,
  height: 100,
  background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
  borderRadius: 8,
});

export const CartSummary = styled("div", {
  marginTop: "auto",

  button: {
    width: "100%",
    padding: "20px 32px",
    background: "$green300",
    borderRadius: 8,
    color: "white",
    fontWeight: 700,
    fontSize: "$md",
    transition: "background-color 0.2s ease",
    marginTop: 48,
    border: "none",

    "&:hover": {
      background: "$green500",
    },
  },
});

export const SummaryDetails = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const Total = styled(SummaryDetails, {
  marginTop: 4,
  lineHeight: 1.6,

  span: {
    fontSize: "$md",
    fontWeight: 700,
  },
});
