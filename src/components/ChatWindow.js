import React, { useState, useContext, useEffect, useRef } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { UserContext } from "../contexts/userContext";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../store/chat-slice";

const ChatWindow = ({ room }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const connection = useSelector((state) => state.chat.connection);
  const connections = useSelector((state) => state.chat.connections);
  const activeRoom = useSelector((state) => state.chat.activeRoom);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatActions.setMessages(room.messages));
  }, [dispatch, room.messages]);

  useEffect(()=>{
    scrollToBottom();
  },[])

  const onSendMessageToGroupHandler = async () => {
    const userToFetch = connections.filter(
      (conn) => conn.userId === user.id && conn.roomId === activeRoom.id
    );

    await connection.invoke("SendMessageToGroup", {
      userId: user.id,
      message,
      connId: userToFetch[0].connId,
    });

    setMessage('')
  };

  return (
    <div className="px-3 bg-light-transparent rounded h-100 d-flex flex-column">
      <div style={{ height: "80px" }}>
        <h2 className="py-3 m-0">{room.name}</h2>
      </div>

      <div className="messages p-3 border d-flex flex-column-reverse">
        {/* mapirane poruke */}

        {messages.map((n, index) => (
          <div
            key={index}
            className={
              n.senderId === user.id
                ? "d-flex flex-column align-items-end"
                : "d-flex flex-column align-items-start"
            }
          >
            <p
              className={`p-2 px-4 mb-0 rounded message ${
                n.senderId !== user.id ? "bg-primary text-light" : "bg-light text-dark"
              }`}
            >
              {/* {n.message} */}
              {n.content}
            </p>
            <p className="text-muted small m-0 p-0 mb-4">{n.username}</p>
          </div>
        )).reverse()}
        <div ref={messagesEndRef} />
      </div>

      <Form style={{ height: "80px" }} className="d-flex align-items-center">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter your messagge..."
            aria-label="Enter your messagge..."
            aria-describedby="basic-addon2"
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            className="px-5"
            variant="outline-secondary"
            id="button-addon2"
            onClick={onSendMessageToGroupHandler}
          >
            Send
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default ChatWindow;
