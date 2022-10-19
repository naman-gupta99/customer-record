import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import "./navbar.css";

import SearchModal from "./searchModal/searchModal";
import AddModal from "./addModal/addModal";

const Navbar = props => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  return (
    <div className="container">
      <AppBar position="static" className="navbar">
        <Toolbar>
          {/* Search Button */}
          <Button
            variant="contained"
            className="search-btn btn-large"
            onClick={handleSearchOpen}
          >
            <SearchIcon />
          </Button>

          {/* Search Modal */}
          <Modal
            aria-labelledby="search-modal-title"
            aria-describedby="search-modal-description"
            open={searchOpen}
            onClose={handleSearchClose}
            className="modal"
          >
            <SearchModal
              setUserRecord={props.setUserRecord}
              handleSearchClose={handleSearchClose}
            />
          </Modal>

          {/* Add Button */}
          <Button
            variant="contained"
            className="add-btn btn-large"
            onClick={handleAddOpen}
          >
            <AddIcon />
          </Button>

          {/* Add Modal */}
          <Modal
            aria-labelledby="add-modal-title"
            aria-describedby="add-modal-description"
            open={addOpen}
            onClose={handleAddClose}
            className="modal"
          >
            <AddModal handleAddClose={handleAddClose} />
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
