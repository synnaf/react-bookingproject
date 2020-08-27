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

//när vi sedan gör requests så kan vi välja att skicka med vårt cors-objekt.
/* 
app.get('/', cors(corsOptions), (req, res) => {
  // för get vill vi tillåta requests från vår frontend route  
}); 
app.post('/availability/addbooking', cors(corsOptions), (req, res) => {
  // för post vill vi tillåta requests från en särskild frontend route
}); 
app.delete('/delete', cors(corsOptions), (req, res) => {
  // för delete vill vi tillåta requests från en särskild frontend route
}); 
app.update('/admin/guests', cors(corsOptions), (req, res) => {
  // för update vill vi tillåta requests från en särskild frontend route
}); 

*/

app.use(cors());

app.use(express.json());
app.use("/guests", cors(corsOptions), guestsRouter);
app.use("/bookings", cors(corsOptions), bookingsRouter);
/* app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); */

const uri = process.env.MONGO_DB;
mongoose.connect(uri, dbOptions).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on port ${PORT} and MongooDb connection OK!`)
  );
});
