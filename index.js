const express = require("express");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const { PORT } = require("./config");

app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port number : ${PORT}`);
});

// default route
app.use((req, res) => {
  res.status(404).json({ status: "404: Bad Request" });
});
