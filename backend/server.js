const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

app.use(cors());
app.use(express.json());
/* app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); */

const uri = process.env.MONGO_DB;
mongoose.connect(uri, dbOptions).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on port ${PORT} and MongooDb connection OK!`)
  );
});
