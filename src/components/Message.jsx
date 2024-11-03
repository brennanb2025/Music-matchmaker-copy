import React from "react";
import "./Message.css";

const Message = ({ text, sender, user, userData }) => {
  if (!user || !userData || !userData[sender]) {
    return <div>Loading message data...</div>;
  }
  const messageClass = sender === user.uid ? "user-message" : "other-message";
  const userDataInfo = userData[sender]["Info"];

  return (
    <div className={`message ${messageClass} mb-2`}>
      <p className="user-name">{userDataInfo["name"]}</p>
      <div className={`message-text ${messageClass}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
