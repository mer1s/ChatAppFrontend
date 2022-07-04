import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, InputGroup } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

import chatService from "../services/chatService";
// import { chatActions } from "../store/chat-slice";
import { fetchChatRoomsAsync } from "../store/chat-slice";

// Ovde ce biti dostupne grupe i razgovori
const ChatList = () => {
  const [createChat, setCreateChat] = useState(false);
  // naziv chata koji ce biti dodan
  const [chatName, setChatName] = useState("");
  // chats from redux
  const {rooms, status, error} = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatRoomsAsync());
  }, [dispatch]);

  const addChatSubmitHandler = (e) => {
    e.preventDefault();
    alert(`Chat ${chatName} has been created`);
    chatService
      .createChat({ name: chatName })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
    setCreateChat(false);
    setChatName("");
  };

  const showRoomMessagesHandler = (name) => {
    console.log(name);
  };

  return (
    <div>
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
      {!error && status === 'pendingFetchRooms' ? (
        <p>Loading</p>
      ) : (
        rooms.map((n) => (
          <div
            className="py-3 px-3 border-bottom"
            key={n.id}
            onClick={showRoomMessagesHandler.bind(this, n.name)}
          >
            <h5 className="p-0 m-0 text-start fw-light">{n.name}</h5>
          </div>
        ))
      )}
      {error && <p>REJECTED</p>}
    </div>
  );
};

export default ChatList;
