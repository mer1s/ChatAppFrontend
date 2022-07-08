import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import requestService from "../../services/requestService";
import styles from "./Requests.module.css";
import CustomerRequest from "../CustomerRequest/CustomerRequest";
import { fetchRoomsForWhichRequestExistAsync } from "../../store/request-slice";

export default function Requests() {
  const { status, roomsForWhichRequestExist } = useSelector(
    (state) => state.requests
  );
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomsForWhichRequestExistAsync());
  }, [dispatch]);

  const showCustomerRequests = (id) => {
    requestService
      .getCusotmersForSpecificRequestRoom(id)
      .then((res) => {
        console.log(res);
        setCustomers(res);
      })
      .catch((error) => console.log(error));
  };

  return status === "fetchRoomsForWhichRequestExistPending" ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.container}>
      <h3 className="p-0 m-0 py-3 text-center w-50 fw-light text-muted">
        Requests
      </h3>
      <div className={styles.requestContainer}>
        {roomsForWhichRequestExist &&
          roomsForWhichRequestExist.map((room, index) => (
            <Accordion key={index} style={{ marginTop: 10 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => showCustomerRequests(room.id)}
              >
                <Typography>{room.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {customers.map((customer, index) => (
                  <CustomerRequest
                    key={index}
                    customer={{ roomId: room.id, ...customer }}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </div>
  );
}
