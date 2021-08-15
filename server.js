const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRoutes = require("./routes/user");
const imageRoutes = require("./routes/image");

app.use("/user", userRoutes);
app.use("/image", imageRoutes);

app.listen(3002, () => {
  console.log("Server is running on port 3002.");
}); 