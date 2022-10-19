import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import InfoIcon from "@material-ui/icons/Info";
import Modal from "@material-ui/core/Modal";
import Fab from "@material-ui/core/Fab";
import "./userInfo.css";

const HideOnScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  window: PropTypes.func
};

const UserInfo = props => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <HideOnScroll {...props}>
      <AppBar className="user-info-bar">
        <h2 className="user-name">
          {props.user.name}
          <Fab
            color="primary"
            aria-label="Add"
            className="info"
            onClick={handleOpen}
          >
            <InfoIcon />
          </Fab>
        </h2>
        <Modal
          aria-labelledby="profile-modal-title"
          aria-describedby="profile-modal-description"
          open={open}
          onClose={handleClose}
          className="modal"
        >
          <div className="paper">
            <h1 id="profile-modal-title">{props.user.name}</h1>
            <span className="field houseNo">House No.</span>
            <span className="value">{props.user.houseNo}</span>
            <br />
            <span className="field sector">Sector</span>
            <span className="value">{props.user.sector}</span>
            <br />
            <span className="field phone">Phone</span>
            <span className="value">{props.user.phone}</span>
            <br />
          </div>
        </Modal>
      </AppBar>
    </HideOnScroll>
  );
};

export default UserInfo;
