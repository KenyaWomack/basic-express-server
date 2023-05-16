const express = require('express');
const logger = require('./src/middleware/logger');
const validator = require('./src/middleware/validator');
const errorHandler404 = require('./src/error-handlers/404');
const errorHandler500 = require('./src/error-handlers/500');

const app = express();

// Middleware
app.use(logger);

// Routes
app.get('/person', validator, (req, res) => {
  const name = req.query.name;
  if (name) {
    res.json({ name });
  } else {
    throw new Error('Name is missing');
  }
});

// Error Handlers
app.use(errorHandler404);
app.use(errorHandler500);

module.exports = {
  start: function (port) {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  },
  app: app,
};