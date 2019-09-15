const express = require("express");
const router = express.Router();
const UserExpenses = require("../expense.model");

//Get the all expenses
router.get("/AllExpenses", (req, res) => {
  UserExpenses.find((err, expenses) => {
    if (err) {
      console.log(err);
    } else {
      res.json(expenses);
    }
  });
});

// Get the expense by user name
router.get("/:userName", (req, res) => {
  UserExpenses.find({ userName: req.params.userName }, (error, expenses) => {
    if (error) {
      res.json(error);
    }
    res.json(expenses);
  });
});

//Add new expense
router.post("/expense/create", (req, res) => {
  let expense = new UserExpenses({
    userName: req.body.userName,
    description: req.body.description,
    amount: req.body.amount
  });
  expense
    .save()
    .then(() => {
      res.status(200).send({ expense: "expense added successfully" });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

//Update expense
router.post("/update/:id", async (req, res) => {
  await UserExpenses.findById(req.params.id, (error, expense) => {
    if (!expense) {
      res.status(404).send("data is not found");
    } else {
      expense.userName = req.body.userName;
      expense.description = req.body.description;
      expense.amount = req.body.amount;
      res.send("it's ok");
      expense.save().catch(error => {
        res.status(400).json({ error: error.message });
      });
    }
  });
});

router.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

module.exports = router;
