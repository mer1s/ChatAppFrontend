import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, InputGroup } from "react-bootstrap";
import { UserContext } from "../contexts/userContext";
import { FiPlus } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { CgEnter } from "react-icons/cg";
import Dialog from "./UI/Dialog";
import { chatActions, fetchChatRoomsAsync } from "../store/chat-slice";
import { createChatRoomAsync } from "../store/chat-slice";
import { createJoinRequestAsync, requestActions } from "../store/request-slice";
import { fetchRequestsAsync } from "../store/request-slice";
import { HubConnectionBuilder } from "@microsoft/signalr";

// Ovde ce biti dostupne grupe i razgovori
const ChatList = () => {
  const [createChat, setCreateChat] = useState(false);
  // naziv chata koji ce biti dodan
  const [chatName, setChatName] = useState("");
  // grupe kojima je korisnik poslao zahtev za ulazak
  const [requestedRooms, setRequestedRooms] = useState([]);
  // chats from redux
  const { rooms, status, error } = useSelector((state) => state.chat);
  const {
    chosenRoom,
    status: requestsStatus,
    requests,
  } = useSelector((state) => state.requests);
  // show modal
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatRoomsAsync());
    dispatch(fetchRequestsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (requests && rooms) {
      const userRequests = requests
        .filter((request) => request.senderId === user.id)
        .map((request) => request.roomId);

      setRequestedRooms(userRequests);
    }
  }, [requests, rooms, user]);

  const addChatSubmitHandler = (e) => {
    e.preventDefault();
    alert(`Chat ${chatName} has been created`);
    dispatch(createChatRoomAsync({ name: chatName, createdBy: user.id }));
    setCreateChat(false);
    setChatName("");
  };

  const showRoomMessagesHandler = (n) => {
    dispatch(chatActions.setRoom(n));
  };

  const joinRoom = async (n) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5116/chatHub")
        .withAutomaticReconnect()
        .build();

      connection.on("ReceiveMessage", (data) => {
        // setMessages((messages) => [...messages, data]);
        dispatch(chatActions.newMessage(data.message));
      });
      dispatch(chatActions.newMessage({ changedRoom: true }));

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
      });

      console.log(n);

      await connection.start();
      await connection.invoke("JoinRoom", {
        userId: user.id,
        username: user.username,
        roomId: n.id,
      });
      dispatch(chatActions.setRoom(n));
      dispatch(chatActions.setConnection(connection));
      setConnection({ connection });
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = (n) => {
    setShowModal(true);
    // console.log(n)
    dispatch(requestActions.chooseRoom(n));
  };

  const dialogHandler = () => {
    // console.log(user.id)
    // console.log(chosenRoom)
    dispatch(
      createJoinRequestAsync({
        senderId: user.id,
        senderUsername: user.username,
        roomId: chosenRoom.id,
        roomName: chosenRoom.name,
      })
    );
  };

  useEffect(() => {
    if (requestsStatus === "idle") {
      setShowModal(false);
    }
  }, [requestsStatus]);

  const getView = () => {
    let acceptedRequests = [];
    let pendingRequests = [];
    let availableRequests = [];
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].customers.some((x) => x === user.id)) {
        acceptedRequests.push(rooms[i]);
      } else {
        if (requestedRooms.includes(rooms[i].id)) {
          pendingRequests.push(rooms[i]);
        } else {
          availableRequests.push(rooms[i]);
        }
      }
    }
    return (
      <div>
        {acceptedRequests.length > 0 && (
          <div>
            <h1>Accepted</h1>
            {acceptedRequests.map((n, index) => (
              <div
                className="border-bottom d-flex"
                key={index}
                onClick={() => joinRoom(n)}
              >
                <button
                  className="text-start w-100 py-3 px-3 btn btn-light h-100"
                  onClick={showRoomMessagesHandler.bind(this, n)}
                >
                  {n.name}
                </button>
                <button className="btn btn-light">
                  <CgEnter />
                </button>
              </div>
            ))}
          </div>
        )}
        {pendingRequests.length > 0 && (
          <div>
            <h1>Pending</h1>
            {pendingRequests.map((n, index) => (
              <div className="border-bottom d-flex" key={index}>
                <button className="text-start w-100 py-3 px-3 btn btn-light h-100">
                  {n.name}
                </button>
                <button className="btn btn-light">
                  <GiSandsOfTime />
                </button>
              </div>
            ))}
          </div>
        )}
        {availableRequests.length > 0 && (
          <div>
            <h1>Available</h1>
            {availableRequests.map((n, index) => (
              <div className="border-bottom d-flex" key={index}>
                <button className="text-start w-100 py-3 px-3 btn btn-light h-100">
                  {n.name}
                </button>
                <button className="btn btn-light" onClick={(e) => openModal(n)}>
                  <FaSignInAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Dialog
        changeModalVisibility={() => setShowModal(false)}
        open={showModal}
        acceptHandler={dialogHandler}
      />
      <div className=" h-100-auto-overflow">
        <div className="bg-light w-100 mb-3 border-bottom d-flex justify-content-between align-items-center">
          <h3 className="p-0 m-0 py-3 text-center w-50 fw-light text-muted">
            Chat
          </h3>
          {user?.roles[0] === "Support" && (
            <button
              className="btn btn-light"
              onClick={(e) => setCreateChat(true)}
            >
              <FiPlus />
            </button>
          )}
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
        {(!error && requestedRooms && status === "pendingFetchRooms") ||
        status === "pendingAddRoom" ? (
          <p>Loading</p>
        ) : (
          getView()
        )}
        {error && <p>REJECTED</p>}
        <div className="pt-5"></div>
      </div>
    </>
  );
};

export default ChatList;
