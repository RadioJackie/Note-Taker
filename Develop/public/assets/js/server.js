const express = require("express");
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoute")(app);

app.listen(PORT, function () {
  console.log('Listening at PORT 3000');
});
