import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Button, Typography, Box } from "@material-ui/core";

function PopUp({ open, setOpen, DeleteId }) {
  // const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // handleClose();
  // handleOpen();

  return (
    <div style={{ display: "white", padding: 30 }}>
      {/* <Button onClick={handleOpen}>open</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        backgroundColor="white"
      >
        <Box
          style={{
            //position: 'absolute',
            border: "2px solid #000",
            backgroundColor: "skyblue",
            // boxShadow: '2px solid black',

            height: 80,
            width: 240,
            margin: "auto",
            textAlign: "center",
            color: "red",
          }}
        >
          Are you sure to delete
          <Button onClick={() => DeleteId()}>Confiram</Button>
          {console.log("djhdjjjfjds", handleOpen)}
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default PopUp;
