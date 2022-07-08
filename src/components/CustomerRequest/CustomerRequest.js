import React from "react";
import { useDispatch } from "react-redux";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import styles from "./CustomerRequest.module.css";
import { acceptCustomerRequestAsync } from "../../store/request-slice";

export default function CustomerRequest({ customer }) {
  const dispatch = useDispatch();

  const onAcceptRequestHandler = () => {
    dispatch(
      acceptCustomerRequestAsync({
        roomId: customer.roomId,
        customerId: customer.senderId,
      })
    );
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
