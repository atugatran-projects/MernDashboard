require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const mongoose = require("mongoose");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

app.use(cors('*'));

app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.get('/db-status', async (req, res) => {
  const db = mongoose.connection;
  console.log(db.readyState);
  if (db.readyState === 1) {
    res.status(200).send('Database is connected');
  } else {
    res.status(500).send('Database is not connected');
  }
});


app.get("/", (req, res) => {
    return res.send("Welcome to Node js, express js in Docker");
});


app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// let's define admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
