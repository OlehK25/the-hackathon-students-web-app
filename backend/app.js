const express = require("express");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/users.router");
const lessonsRouter = require("./routes/lessonsRoutes");

const app = express();

app.use(express.json());


app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

// http://localhost:3000/api/users/me

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/lessons", lessonsRouter);



app.all("*", (req, res) => {
  res.status(400).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
