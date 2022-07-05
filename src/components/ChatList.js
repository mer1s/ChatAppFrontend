import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, InputGroup } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

// import chatService from "../services/chatService";
// import { chatActions } from "../store/chat-slice";
import { chatActions, fetchChatRoomsAsync } from "../store/chat-slice";
import { createChatRoomAsync } from "../store/chat-slice";

// Ovde ce biti dostupne grupe i razgovori
const ChatList = () => {
  const [createChat, setCreateChat] = useState(false);
  // naziv chata koji ce biti dodan
  const [chatName, setChatName] = useState("");
  // chats from redux
  const { rooms, status, error } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatRoomsAsync());
  }, [dispatch]);

  const addChatSubmitHandler = (e) => {
    e.preventDefault();
    alert(`Chat ${chatName} has been created`);
    dispatch(createChatRoomAsync({ name: chatName }));
    setCreateChat(false);
    setChatName("");
  };

  const showRoomMessagesHandler = (n) => {
    dispatch(chatActions.setRoom(n))
  };

  return (
    <div className=" h-100-auto-overflow">
      <div className="bg-light w-100 mb-3 border-bottom d-flex justify-content-between align-items-center">
        <h3 className="p-0 m-0 py-3 text-center w-50 fw-light text-muted">
          Chat
        </h3>
        <button className="btn btn-light" onClick={(e) => setCreateChat(true)}>
          <FiPlus />
        </button>
      </div>
      {createChat && (
        <div className="w-100 d-flex align-items-center justify-content-center pb-3 border-bottom">
          <Form onSubmit={addChatSubmitHandler} className="w-100">
            <InputGroup className="w-100 px-2">
              <input
                type="text"
                className="border-1 px-2 w-75"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
              <input
                type="submit"
                className="w-25 btn btn-dark"
                value={"Add"}
              />
            </InputGroup>
          </Form>
        </div>
      )}

      {/* ovo ce biti zamenjeno konkretnim podacima */}
      {(!error && status === "pendingFetchRooms") ||
      status === "pendingAddRoom" ? (
        <p>Loading</p>
      ) : (
        rooms.map((n) => (
          <div
            className="border-bottom"
            key={n.id}
          >
            <button 
              className="text-start w-100 py-3 px-3 btn btn-light h-100"
              onClick={showRoomMessagesHandler.bind(this, n)}
            >
              {n.name}
            </button>
          </div>
        ))
      )}
      {error && <p>REJECTED</p>}
      <div className="pt-5"></div>
    </div>
  );
};

export default ChatList;
