import React from "react";
const Notification = ({ popupMessage }) => {
  if (popupMessage.message === null) {
    return;
  }
  const style = {
    color: popupMessage.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return <div style={style}>{popupMessage.message}</div>;
};

export default Notification;
