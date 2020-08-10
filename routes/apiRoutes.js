const path = require("path");
const fs = require("fs")

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, jsonString) => {
            if (err) {
                return console.log(err)
            }
            res.json(JSON.parse(jsonString));
        })
    });

    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        newNote.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const noteData = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), 'utf8', (err, jsonString) => {
            if (err) {
                return console.log(err)
            }
            return jsonString;
        }));

        noteData.push(newNote);
        let json = JSON.stringify(noteData);
        fs.writeFile(path.join(__dirname, "../db/db.json"), json, "utf8", (err) => {
            if (err) {
                throw err;
            }
        });
        res.json(req.body);
    });

    app.delete("/api/notes/:id", function (req, res) {
        let noteID = req.params.id;
        const noteData = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), 'utf8', (err, jsonString) => {
            if (err) {
                return console.log(err)
            }
            res.json(JSON.parse(jsonString));
        }));
        for (let index = 0; index < noteData.length; index++) {
            const element = noteData[index];
            if (element.id === noteID) {
                noteData.splice(index, 1);
                break;
            };
        }
        let json = JSON.stringify(noteData);


        fs.writeFile(path.join(__dirname, "../db/db.json"), json, "utf8", (err) => {
            if (err) {
                throw err;
            }
        });
        res.json(noteData);
    });
}
