const express = require("express"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    Blockchain = require("./blockchain");

const { getBlockchain, createNewBlock } = Blockchain;

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/blocks", (req, res) => {
    res.send(getBlockchain());
});

app.post("/blocks", (req, res) => {
    const {
        body: { data }
    } = req;
    const newBlock = createNewBlock(data);
    res.send(newBlock);
});

app.listen(PORT, () => console.log(`myCoin Server running on ${PORT} ✅`));
