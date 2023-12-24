import { useParams, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDbUpdate, useDbData } from "../utilities/firebase";

import Message from "./Message";
import ConcertInfo from "./ConcertInfo";
import ConcertAttendee from "./ConcertAttendee";

const ChatRoom = ({ user, userData, concerts }) => {
  const { concertId } = useParams();

  const realId = parseInt(concertId) + 1;
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);
  const [update, result] = useDbUpdate(`/Concerts/${realId}/messages`);
  const [messages] = useDbData(`/Concerts/${realId}/messages`);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const lastID = messages ? Object.keys(messages).pop() : -1;
  const nextMessageId = parseInt(lastID ? lastID : -1) + 1;

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      console.log("Message sent:", newMessage);
      update({
        [nextMessageId]: {
          text: newMessage,
          sender: user.uid,
          timestamp: Date.now().toString(),
        },
      });
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const BackButton = () => (
    <Link to="/" className="back-button">
      <button className="btn btn-secondary mt-3">Back</button>
    </Link>
  );

  const sortedMessages = messages
    ? Object.values(messages).sort((a, b) => a.timestamp - b.timestamp)
    : [];

  return (
    <div className="container">
      <h1><b>Concert Chat Room</b></h1>
      <BackButton />
      <div className="row">
        <div className="col-md-4 mt-5">
          <ConcertInfo concertInfo={concerts[concertId]} userData={userData} />
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-8">
              <div className="card mt-5">
                <div className="card-header">Chat Room</div>
                <div
                  className="card-body chat-messages"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                  ref={chatRef}
                >
                  {sortedMessages.length === 0 ? (
                    <div className="text-center">
                      No messages yet. Be the first to send a message!
                    </div>
                  ) : (
                    sortedMessages.map((message, index) => (
                      <div className="row mb-2" key={index}>
                        <div className="col">
                          <Message
                            text={message.text}
                            sender={message.sender}
                            user={user}
                            userData={userData}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="card-footer">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" onClick={sendMessage}>
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 mt-5">
              <ConcertAttendee
                concertInfo={concerts[concertId]}
                userData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
