const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const guestsRouter = require("./routes/guests");
const bookingsRouter = require("./routes/bookings");

require("dotenv").config();

const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

//cors config
let corsOptions = {
  origin: "*", //tillåter alla requests, ändra till rätt frontEnd api
  optionsSuccessStatus: 200,
};



app.use(cors());

app.use(express.json());
app.use(
  "/guests",
  cors(corsOptions),
  guestsRouter.allGuests,
  guestsRouter.router
);
app.use("/bookings", cors(corsOptions), bookingsRouter);

const uri = process.env.MONGO_DB;
mongoose.connect(uri, dbOptions).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on port ${PORT} and MongooDb connection OK!`)
  );
});