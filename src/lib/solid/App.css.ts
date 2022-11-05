import { style } from "@vanilla-extract/css";

const baseDark = "#0e0e10";
const baseLighter = "#18181b";

const flexCenter = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

export const AppStyle = style([
  {
    height: "100vh",
    width: "100%",
    backgroundColor: baseDark,
    color: "white"
  },
  flexCenter
]);

export const AppCard = style({
  backgroundColor: baseLighter,
  width: 400,
  height: 600,
  overflowY: "auto",
  padding: 16
});

export const FormStyle = style([
  {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10
  },
  flexCenter
]);

export const InputStyle = style({
  height: "3rem",
  paddingLeft: 16,
  paddingRight: 16,
  color: "white",
  backgroundColor: baseDark
});

export const BtnStyle = style([
  InputStyle,
  {
    backgroundColor: "purple"
  }
]);

export const ListWrapperStyle = style({
  width: "100%",
  listStyle: "initial"
});

export const TodoItemStyle = style({
  backgroundColor: baseDark,
  marginBottom: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

export const ActionBtnStyle = style({
  padding: 10,
  cursor: "pointer",
  transition: "background-color 250ms ease",
  ":hover": {
    backgroundColor: baseLighter
  }
});
