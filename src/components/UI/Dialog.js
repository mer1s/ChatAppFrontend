import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "none",
  boxShadow: 24,
};

const Dialog = ({ changeModalVisibility, open, acceptHandler }) => {
  const handleClose = () => changeModalVisibility();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="bg-dark rounded p-5" sx={style}>
            <Typography className="text-light" id="transition-modal-title" variant="h5" component="h2">
              Are you sure you want to send a request?
            </Typography>
            <Typography className="text-light" id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'right'}}>
                <button className="btn-main text-light w-50 btn" style={{marginLeft: '0.5rem'}} onClick={handleClose}>Close</button>
                <button className="btn-main text-light btn w-50" style={{marginLeft: '0.5rem'}} onClick={acceptHandler}>Send Request</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Dialog;
