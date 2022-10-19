import React from "react";
import { useAddUser } from "../../../hooks/user";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./addModal.css";

const AddModal = React.forwardRef((props, ref) => {
  const [values, setValues] = React.useState({
    name: "",
    houseNo: "",
    sector: "",
    phone: ""
  });

  const [message, setMessage] = React.useState({
    status: "",
    message: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className="paper" ref={ref} tabIndex={-1}>
      <h1 id="add-modal-title">Add a Customer</h1>

      <div id="add-modal-description">
        <form
          onSubmit={event => {
            event.preventDefault();
            useAddUser(values).then(message => {
              if (message === null)
                setMessage({ status: "true", message: "Success!!!" });
              else {
                const msg = "Some Error Occured";
                setMessage({ status: "false", message: msg });
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
            className="add-button"
          >
            ADD
          </Button>
        </form>
        <Button
          variant="contained"
          color="secondary"
          className="add-button"
          onClick={event => {
            event.preventDefault();
            props.handleAddClose();
          }}
        >
          Close
        </Button>
        <h3 className={message.status}>{message.message}</h3>
      </div>
    </div>
  );
});

export default AddModal;
