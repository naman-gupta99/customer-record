import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import config from "./config";
import customerAPI from "./routes/api/customers";
import recordAPI from "./routes/api/records";

const app = express();
const mongoURI = config.mongoURI;
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors());

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected."))
  .catch(err => {
    console.log("Database Connection Error : " + err);
  });

app.use("/api/customer", customerAPI);
app.use("/api/record", recordAPI);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log("Server listening on port " + port));
