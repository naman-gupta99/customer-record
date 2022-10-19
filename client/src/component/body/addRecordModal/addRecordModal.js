import React from "react";
import { useAddRecord } from "../../../hooks/user";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import dateTime from "date-and-time";
import "./addRecordModal.css";

const AddRecordModal = React.forwardRef((props, ref) => {
  const [values, setValues] = React.useState({
    date: dateTime.format(new Date(), "YYYY-MM-DD"),
    amount: 0,
    comment: ""
  });

  const [message, setMessage] = React.useState({
    status: "",
    message: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [credit, setCredit] = React.useState("credit");

  const handleCreditChange = event => {
    setCredit(event.target.value);
    setValues({ ...values, ["amount"]: -1 * values.amount });
  };

  const handleAmountChange = () => event => {
    if (credit === "credit") {
      setValues({ ...values, ["amount"]: -1 * parseInt(event.target.value) });
    } else {
      setValues({ ...values, ["amount"]: parseInt(event.target.value) });
    }
  };

  return (
    <div className="paper" ref={ref} tabIndex={-1}>
      <h1 id="add-record-modal-title">Add Record</h1>

      <div id="add-record-modal-description">
        <form
          onSubmit={event => {
            event.preventDefault();
            const user = props.user;
            user.records.push(values);
            props.setUser(user);
            useAddRecord(props.user._id, values).then(message => {
              if (message === null) props.handleAddRecordClose();
              else {
                const msg = "Some Error Occured" + message;
                setMessage({ status: "false", message: msg });
              }
            });
          }}
        >
          <TextField
            id="standard-date"
            label="date"
            className="textfield"
            type="date"
            value={values.date}
            onChange={handleChange("date")}
            margin="normal"
          />
          <TextField
            id="standard-amount"
            label="Amount"
            className="textfield"
            onChange={handleAmountChange()}
            margin="normal"
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Credit /Debit</FormLabel>
            <RadioGroup
              aria-label="Credit /Debit"
              name="credit/debit"
              value={credit}
              onChange={handleCreditChange}
            >
              <div className="radio-group">
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label="Credit"
                />
                <FormControlLabel
                  value="debit"
                  control={<Radio />}
                  label="Debit"
                />
              </div>
            </RadioGroup>
          </FormControl>
          <TextField
            id="standard-comment"
            label="Comment"
            className="textfield"
            value={values.comment}
            onChange={handleChange("comment")}
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
            props.handleAddRecordClose();
          }}
        >
          Close
        </Button>
        <h3 className={message.status}>{message.message}</h3>
      </div>
    </div>
  );
});

export default AddRecordModal;
