const express = require('express'),
app = express(),
http = require('http').Server(app),
io = require("socket.io")(http),
bodyParser = require('body-parser'),
cors = require('cors'),
config = require('./config/config'),
consumer = require('../Usuarios/io/consumer')
db = require("./database/database"),
consumer.start(io)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", require('../Usuarios/route/index'));

http.listen(config.port, () => {
  console.log('Server is running in port', config.port);
});
