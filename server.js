const path = require("path");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// connectDB();

const handleDBConnection = async () => {
 await connectDB()
 const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/articles", require("./routes/articleRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));
}

handleDBConnection()

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));

// app.use("/api/articles", require("./routes/articleRoutes"));
// app.use("/api/comments", require("./routes/commentRoutes"));

//Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

// app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port: ${port}`));
