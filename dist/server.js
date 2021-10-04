"use strict";

var _express = _interopRequireDefault(require("express"));

var _controllers = require("./controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT;

var logger = function logger(req, res, next) {
  // eslint-disable-next-line no-console
  console.log("".concat(req.method, " ").concat(req.url));
  next();
};

var defaultRoute = function defaultRoute(req, res) {
  res.send('Go to /Brpp2IdentificationComplet/individus');
};

var started = function started() {
  // eslint-disable-next-line no-console
  console.log("RNIPP Mock listening on port ".concat(port, "!"));
};

app.use(logger).get('/', defaultRoute).get('/Brpp2IdentificationComplet/individus', _controllers.switchController).listen(port, started);