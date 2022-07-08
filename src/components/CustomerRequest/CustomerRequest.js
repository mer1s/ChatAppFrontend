import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import styles from "./CustomerRequest.module.css";
import requestService from "../../services/requestService";

export default function CustomerRequest({ customer, requestAccepted }) {

  const onAcceptRequestHandler = () => {
    requestService
      .sendAcceptCustomerRequest({
        roomId: customer.roomId,
        customerId: customer.senderId,
      })
      .then((res) => requestAccepted(res))
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
        <FiXCircle className={styles.redIcon} />
      </div>
    </div>
  );
}
