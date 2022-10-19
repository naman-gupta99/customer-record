import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import dateTime from "date-and-time";
import "./userRecords.css";

const userRecords = React.forwardRef((props, ref) => {
  const calcTotalAmount = () => {
    var total = 0;
    for (let i = 0; i < props.user.records.length; i++) {
      total += props.user.records[i].amount;
    }
    return total;
  };

  const tableRowClass = x => {
    if (x < 0) return "negitive";
    else return "positive";
  };

  return (
    <div>
      <div className="total-amount-div">
        Amount: <span className="total-amount">{calcTotalAmount()}</span>
      </div>
      <div className="record-container" ref={ref}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="date-cell">
                Date
              </TableCell>
              <TableCell align="center" className="amount-cell">
                Amount
              </TableCell>
              <TableCell align="center" className="comment-cell">
                Comment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.user.records
              .sort((a, b) => {
                if (a.date === b.date) return -1;
                return new Date(b.date) - new Date(a.date);
              })
              .map((record, index) => (
                <TableRow key={index} className={tableRowClass(record.amount)}>
                  <TableCell component="th" scope="row" align="center">
                    {dateTime.format(new Date(record.date), "DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="center">{record.amount}</TableCell>
                  <TableCell align="center">{record.comment}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

export default userRecords;
