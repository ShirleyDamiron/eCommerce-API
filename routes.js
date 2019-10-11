const connection = require("./connection.js");

//  GET all values of Products table & LEFT JOIN on Prices table to get it's values by using the foreign key.

exports.getAllProducts = (req, res) => {
  const productsQuery =
    "SELECT Products.*, Prices.Price, Prices.Tax FROM Products LEFT JOIN Prices ON Products.Products_Id = Prices.Prices_Id;";
  connection.query(productsQuery, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
};

// GET receiving back all Values of Product's Table targeting Category column to specify the result you want to see only.
// parameterizing your queries so no hacking can happen. 

exports.getProductsByCategory = (req, res) => {
  const category = req.params.category;
  const filterQuery =
    "SELECT Products.*, Prices.Price, Prices.Tax FROM Products LEFT JOIN Prices ON Products.Products_Id = Prices.Prices_Id WHERE Products.Category = ?";
  connection.query(filterQuery, [category], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
};

// GET all values of the Contacts table by only adding "/contacts" to the route.

exports.getAllContacts = (req, res) => {
  connection.query("SELECT * FROM  Contacts", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
};

//BONUSES

// POST will add a new contact with auto incrementing the ID's.

exports.insertNewContact = (req, res) => {
  const newContactQuery =
    "INSERT INTO Contacts (Contact_Name, Contact_Address, City, Contact_State, Zip_Code, Email, Primary_Number) VALUES (?,?,?,?,?,?,?)";
  const {
    Contact_Name,
    Contact_Address,
    City,
    Contact_State,
    Zip_Code,
    Email,
    Primary_Number
  } = req.body;
  connection.query(
    newContactQuery,
    [
      Contact_Name,
      Contact_Address,
      City,
      Contact_State,
      Zip_Code,
      Email,
      Primary_Number
    ],
    (err, rows) => {
      if (err) throw err;
      res.status(200).send("Successfully Posted!");
    }
  );
};

// DELETE will remove a contact by the matching ID that is found in the Contacts Table.

exports.deleteContact = (req, res) => {
  const deleteContactQuery = "DELETE FROM Contacts WHERE Contact_Id = ?";
  const contact_id = Number(req.params.contact_id);
  connection.query(deleteContactQuery, [contact_id], (err, rows) => {
    if (err) throw err;
    res.status(200).send("Successfully Deleted Contact!");
  });
};

// PUT will add changes to the ID that matches your request and reference the new changes. Using "Number" to convert the string to an Integer.

exports.updateContact = (req, res) => {
  const updateContactQuery =
    "UPDATE Contacts SET Contact_Name = ?, Contact_Address = ?, City = ?, Contact_State = ?, Zip_Code = ?, Email = ?, Primary_Number = ? WHERE Contact_Id = ?";
  const {
    Contact_Name,
    Contact_Address,
    City,
    Contact_State,
    Zip_Code,
    Email,
    Primary_Number
  } = req.body;
  const contact_id = Number(req.params.contact_id);

  const newValues = [
    Contact_Name,
    Contact_Address,
    City,
    Contact_State,
    Zip_Code,
    Email,
    Primary_Number,
    contact_id
  ];
  connection.query(updateContactQuery, newValues, (err, rows) => {
    if (err) throw err;
    res.status(200).send("Successfully Updated!");
  });
};
