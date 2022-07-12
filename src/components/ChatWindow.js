import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { UserContext } from "../contexts/userContext";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../store/chat-slice";

const ChatWindow = ({ room }) => {
  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);
  const connection = useSelector((state) => state.chat.connection);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatActions.newMessage({ changedRoom: true }));
  }, []);

  const onSendMessageToGroupHandler = async () => {
    // try {
    //   const connection = new HubConnectionBuilder()
    //     .withUrl("http://localhost:5116/chatHub")
    //     .withAutomaticReconnect()
    //     .build();

    //   connection.on("ReceiveMessage", (data) => {
    //     console.log("CHAT WINDOW", data);
    //     setMessages((messages) => [...messages, data]);
    //   });

    //   connection.onclose((e) => {
    //     // setConnection();
    //     // setMessages([]);
    //   });

    //   await connection.start();
    //   await connection.invoke("SendMessageToGroup", {
    //     userId: user.id,
    //     message,
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
    await connection.invoke("SendMessageToGroup", {
      userId: user.id,
      message,
    });
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
              n.userId === 1
                ? "d-flex justify-content-end"
                : "d-flex justify-content-start"
            }
          >
            <p
              className={`p-2 px-4 rounded ${
                n.userId !== 1 ? "bg-primary text-light" : "bg-light text-dark"
              }`}
            >
              {/* {n.message} */}
              {n}
            </p>
          </div>
        ))}
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
