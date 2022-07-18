import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import styles from "./CustomerRequest.module.css";
import requestService from "../../services/requestService";
// import { HubConnectionBuilder } from "@microsoft/signalr";

export default function CustomerRequest({ customer, requestHandled }) {
  const onAcceptRequestHandler = () => {
    requestService
      .sendAcceptCustomerRequest({
        roomId: customer.roomId,
        customerId: customer.senderId,
      })
      .then((res) => {
        requestHandled(res);

        // Joining in room
        // joinRoom({ userId: customer.senderId, roomId: customer.roomId });
      })
      .catch((e) => console.log(e));
  };

  // const joinRoom = async (joiningCredentials) => {
  //   try {
  //     const connection = new HubConnectionBuilder()
  //       .withUrl("http://localhost:5116/chatHub")
  //       .withAutomaticReconnect()
  //       .build();

  //     connection.on("ReceiveMessage", (data) => {
  //       console.log("CUSTOMER REQUEST", data);
  //     });

  //     await connection.start();
  //     await connection.invoke("JoinRoom", joiningCredentials);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onRejectRequestHandler = () => {
    requestService
      .rejectCustomerRequest({
        roomId: customer.roomId,
        customerId: customer.senderId,
      })
      .then((res) => requestHandled(res))
      .catch((e) => console.log(e));
  };

  return (
    <div className={styles.container}>
      <p>{customer.senderUsername}</p>
      <div className={styles.iconsContainer}>
        <FiCheckCircle
          className={styles.greenIcon}
          onClick={onAcceptRequestHandler}
        />
        <FiXCircle
          className={styles.redIcon}
          onClick={onRejectRequestHandler}
        />
      </div>
    </div>
  );
}
