const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect("mongodb+srv://himishatunwal:3AMmQB0COgubVxAa@cluster0.6q1fge8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("Failed to Connect MongoDb");
});

db.once("open", () => {
  console.log("Connected To MongoDB");
});