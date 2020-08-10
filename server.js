const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.post("/api/notes", function(req, res) {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync("db/db.json"));
  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  return res.json(newNote);
});


app.listen(PORT, function () {
  console.log('Listening at PORT 3000');
});
