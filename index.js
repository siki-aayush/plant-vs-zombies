import fs from "fs";
import express from "express";
import cors from "cors";

const app = express();

const getHscore = () => {
    if (!fs.existsSync("data")) {
        fs.mkdirSync("data");
    }

    if (!fs.existsSync("data/highscore.json")) {
        const data = {
            highscore: 0,
        };
        fs.writeFileSync("data/highscore.json", JSON.stringify(data));
    }
    const data = JSON.parse(fs.readFileSync("./data/highscore.json"));
    return data;
};

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/highscore", (_req, res) => {
    const data = getHscore();
    res.json(data);
});

app.put("/highscore", (req, res) => {
    const data = getHscore();
    if (+req.body.score > +data.highscore) {
        data.highscore = req.body.score;
        fs.writeFileSync("./data/highscore.json", JSON.stringify(data));
        res.json({
            status: "success",
            message: "new highscore set",
            highscore: data.highscore,
        });
    } else {
        res.json({
            status: "success",
            message: "not a highscore",
            yourscore: req.body.score,
            highscore: data.highscore,
        });
    }
});

app.get("/", (_req, res) => {
    res.sendFile(`/public/index.html`);
});

app.listen(3000, () => {
    console.log("Application listening on port 3000!");
});
