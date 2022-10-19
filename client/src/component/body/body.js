import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import "./body.css";

import UserInfo from "./userInfo/userInfo";
import UserRecords from "./userRecords/userRecords";
import AddRecordModal from "./addRecordModal/addRecordModal";

const Body = props => {
  const [addRecordOpen, setAddRecordOpen] = React.useState(false);

  const handleAddRecordOpen = () => {
    setAddRecordOpen(true);
  };

  const handleAddRecordClose = () => {
    setAddRecordOpen(false);
  };

  return (
    <div>
      <UserInfo user={props.user} />
      <Button
        variant="contained"
        color="primary"
        className="add-record"
        onClick={handleAddRecordOpen}
      >
        <AddIcon />
      </Button>
      <UserRecords user={props.user} />

      {/* Add Record Modal */}
      <Modal
        aria-labelledby="add-record-modal-title"
        aria-describedby="add-record-modal-description"
        open={addRecordOpen}
        onClose={handleAddRecordClose}
        className="modal"
      >
        <AddRecordModal
          user={props.user}
          setUser={props.setUser}
          handleAddRecordClose={handleAddRecordClose}
        />
      </Modal>
    </div>
  );
};

export default Body;
