const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Tilli server is running!");
});

app.post("/api/transactions", (req, res) => {
    try {
        const fileContents = fs.readFileSync("transactions.json", "utf8");
        const transactions = JSON.parse(fileContents);

        transactions.push(req.body);

        fs.writeFileSync("transactions.json", JSON.stringify(transactions, null, 2));

        res.status(201).json({ message: "Transaction saved successfully." });
    } catch (error) {
        console.error("Error saving transaction:", error.message);
        res.status(500).json({ message: "Unable to save transaction." });
    }
});

app.listen(PORT, () => {
    console.log(`Tilli server is running at http://localhost:${PORT}`);
});
