import { styled } from "../styles";

const Button = styled("button", {
  backgroundColor: "$rocketseat",
  border: "none",
  padding: "8px",
  borderRadius: 4,
  cursor: "pointer",

  "&:hover": {
    filter: "brightness(0.8)",
  },
});

export default function Home() {
  return (
    <>
      <Button>Hello world</Button>
    </>
  );
}
