import React from "react";
import { useGetUsers } from "../../../hooks/user";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./searchModal.css";

const SearchModal = React.forwardRef((props, ref) => {
  const [values, setValues] = React.useState({
    _id: "",
    name: "",
    houseNo: "",
    sector: "",
    phone: ""
  });

  const [users, setUsers] = React.useState([]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [message, setMessage] = React.useState({
    message: "",
    status: ""
  });

  return (
    <div className="paper" ref={ref} tabIndex={-1}>
      <h1 id="search-modal-title">Search a Customer</h1>

      <div id="search-modal-description">
        <form
          onSubmit={event => {
            event.preventDefault();
            useGetUsers(values, (data, err) => {
              if (err) {
                console.log("err" + err);
                setMessage({
                  message: "err" + err,
                  status: "false"
                });
              } else {
                if (data.length === 0) {
                  setMessage({
                    message: "No Users Found",
                    status: "false"
                  });
                } else {
                  setUsers(data);
                  setMessage({
                    message: "",
                    status: ""
                  });
                }
              }
            });
          }}
        >
          <TextField
            id="standard-name"
            label="Name"
            className="textfield"
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextField
            id="standard-houseNo"
            label="House Number"
            className="textfield"
            value={values.houseNo}
            onChange={handleChange("houseNo")}
            margin="normal"
          />
          <TextField
            id="standard-sector"
            label="Sector"
            className="textfield"
            value={values.sector}
            onChange={handleChange("sector")}
            margin="normal"
          />
          <TextField
            id="standard-phone"
            label="Phone number"
            className="textfield"
            value={values.phone}
            onChange={handleChange("phone")}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="search-button"
          >
            SEARCH
          </Button>
        </form>
        <h3 className={message.status}>{message.message}</h3>
        <div>
          {users.map((user, index) => {
            return (
              <div
                className="list-container"
                key={index}
                onClick={event => {
                  event.preventDefault();
                  props.setUserRecord(user);
                  props.handleSearchClose();
                }}
              >
                Name : <span className="name">{user.name}</span>
                <div>
                  House No : {user.houseNo}
                  <br />
                  Sector : {user.sector}
                  <br />
                  Phone : {user.phone}
                  <br />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default SearchModal;
