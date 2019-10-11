const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser")
const fs = require("fs");
const {
  getAllProducts,
  getProductsByCategory,
  getAllContacts,
  insertNewContact,
  deleteContact,
  updateContact
} = require("./routes.js");

const accessLogStream = fs.createWriteStream("morgan.log", { flags: "a" });
// the "A" is for append, appends to

app.use(bodyParser())
app.use(morgan("combined", { stream: accessLogStream }));

// disables certain headers so they can be private

app.use(helmet());

app.get("/products", getAllProducts);

app.get("/products/productFilter/:category", getProductsByCategory);

app.get("/contacts", getAllContacts);

app.post("/newContact" , insertNewContact)

app.delete("/deleteContact/:contact_id" , deleteContact)

app.put("/updateContact/:contact_id", updateContact)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log("Listening on port" + PORT);
});
