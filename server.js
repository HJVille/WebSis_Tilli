const express = require("express");

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
    res.send("Tilli server is running!");
});

app.listen(PORT, () => {
    console.log(`Tilli server is running at http://localhost:${PORT}`);
});
