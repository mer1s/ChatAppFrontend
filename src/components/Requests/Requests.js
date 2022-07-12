import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Requests.module.css";
import { fetchRoomsForWhichRequestExistAsync } from "../../store/request-slice";
import CustomAccordition from "../UI/CustomAccordition";
import { requestActions } from "../../store/request-slice";

export default function Requests() {
  const { status, roomsForWhichRequestExist } = useSelector(
    (state) => state.requests
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomsForWhichRequestExistAsync());
  }, [dispatch]);

  const onEmptyRoom = (id) => {
    dispatch(requestActions.onEmptyRoom(id));
  };

  return status === "pendingFetchRoomsForWhichRequestExist" ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.container}>
      <h3 className="p-0 m-0 py-3 text-center w-50 fw-light text-muted">
        Requests
      </h3>
      <div className={styles.requestContainer}>
        {roomsForWhichRequestExist &&
          roomsForWhichRequestExist.length > 0 &&
          roomsForWhichRequestExist.map((room, index) => (
            <CustomAccordition
              room={room}
              key={index}
              onEmptyRoom={onEmptyRoom}
            />
          ))}
        {roomsForWhichRequestExist &&
          roomsForWhichRequestExist.length === 0 && <p>No requests</p>}
      </div>
    </div>
  );
}
