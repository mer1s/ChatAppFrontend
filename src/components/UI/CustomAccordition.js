import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomerRequest from "../CustomerRequest/CustomerRequest";

import requestService from "../../services/requestService";

const CustomAccordition = ({ room, onEmptyRoom }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const showCustomerRequests = () => {
    if (expanded === false) {
      requestService
        .getCusotmersForSpecificRequestRoom(room.id)
        .then((res) => setCustomers(res))
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }

    setExpanded((oldState) => !oldState);
  };

  const requestHandled = (id) => {
    let tmpArr = [...customers];
    tmpArr = tmpArr.filter((customer) => customer.id !== id);
    if (tmpArr.length === 0) {
      onEmptyRoom(room.id);
    }
    setCustomers(tmpArr);
  };

  return (
    <Accordion style={{ marginTop: 10 }} expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={() => showCustomerRequests()}
      >
        <Typography>{room.name}</Typography>
      </AccordionSummary>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AccordionDetails>
          {customers.map((customer, index) => (
            <CustomerRequest
              key={index}
              customer={{ roomId: room.id, ...customer }}
              requestHandled={requestHandled}
            />
          ))}
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default CustomAccordition;
