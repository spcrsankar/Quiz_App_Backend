const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(process.env.DB, connectionParams)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};
