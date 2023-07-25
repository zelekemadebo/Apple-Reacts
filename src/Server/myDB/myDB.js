const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

let app = express(); //This starts the express server
app.use(cors());

// Use  body parser as middle ware
// app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  //Middle ware to extract info from the html name attribute
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json()); //Middle ware to extract info from the frontend that are sent through json
// app.use(bodyparser.urlencoded({ extended: true }));

let mysqlConnection = mysql.createConnection({
  //mysql.createConnection() is a method in the Node.js MySQL module that creates a new connection to a MySQL server.
  user: "myDB",
  password: "myDB",
  host: "127.0.0.1",
  database: "myDB",
});

mysqlConnection.connect((err) => {
  //mysqlConnection.connect() is a method used in Node.js to connect to a MySQL database.
  if (err) console.log(err);
  else console.log("Connected");
});

app.get("/", (req, res) => {
  res.send("Up and running...");
  // app.get() is a method in the Express.js web framework for creating a new route for handling HTTP GET requests. It takes two arguments: the first argument is the route path, and the second argument is a callback function that will be called when the route is accessed with a GET request.
});

// _____________Create the table_______________________

app.get("/create-table", (req, res) => {
  // this creates table on our database

  let products = `CREATE TABLE if not exists products(
    product_id int auto_increment,
    product_url varchar(255) not null,
    product_name varchar(255) not null,
    PRIMARY KEY (product_id))`;

  let productPrice = `CREATE TABLE if not exists productPrice(
    price_id int auto_increment,
    product_id int(11) not null,    
    starting_price varchar(255) not null,
    price_range varchar(255) not null,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id))`;

  let productDescription = `CREATE TABLE if not exists productDescription(
    description_id int auto_increment,
    product_id int(11) not null,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    product_img varchar(255) not null,
    product_link varchar(255) not null,
    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id))`;

  let user = `CREATE TABLE if not exists user(
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
    )`;

  let orders = `CREATE TABLE if not exists orders(
    order_id int auto_increment,
    product_id int not null,
    user_id int not null,
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id))`;

  mysqlConnection.query(products, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  mysqlConnection.query(productPrice, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  mysqlConnection.query(productDescription, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  mysqlConnection.query(user, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  mysqlConnection.query(orders, (err, results, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  res.end("Table Created");
  console.log("Table Created");
});

//________________Inserting Data_______________
// Below we are inserting data automatically to our database when our client put information in the html form we created:

app.post("/add-product", (req, res) => {
  console.log(bodyparser.json);

  let userName = req.body.userName;
  let userPassword = req.body.password;
  let orderId = req.body.orderId;
  let userId = req.body.userId;
  let productId = req.body.productId;
  let productUrl = req.body.productUrl;
  let productName = req.body.productName;
  let productImage = req.body.productImage;
  let productLink = req.body.productLink;
  let startingPrice = req.body.startingPrice;
  let priceRange = req.body.priceRange;
  let productBriefDescription = req.body.productBriefDescription;
  let ProductDescription = req.body.productDescription;

  // To use it as a foreign key
  let addedProductId = 0;

  // Insert data into products table
  let sqlAddToProducts = `INSERT INTO Products (product_id, product_url, product_name) 
  VALUES ('${productId}', '${productUrl}', '${productName}')`;

  mysqlConnection.query(sqlAddToProducts, function (err, result) {
    if (err) throw err;
    console.log("Record inserted on Product table successfully");
  });
  // ____________________________________________
  mysqlConnection.query(
    `SELECT * FROM Products WHERE product_url = '${productUrl}' `,
    (err, rows, fields) => {
      addedProductId = rows[0].product_id;
      // console.log(addedProductId);
      if (err) console.log(err);
     
      // Insert data into product discription table
      if (addedProductId != 0) {
        let sqlAddToProductDescription = `INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES ('${addedProductId}', '${productBriefDescription}', '${ProductDescription}', '${productImage}', '${productLink}')`;

        // Insert data into product price table
        let sqlAddToProductPrice = `INSERT INTO productPrice (product_id, starting_price, price_range) VALUES ('${productId}', '${startingPrice}', '${priceRange}')`;
        mysqlConnection.query;

        // Insert data into user table
        if (userName != 0) {
          let userQuery = `INSERT INTO user (user_Id, user_name, user_password) VALUES ('${userId}', '${userName}', '${userPassword}')`;
          mysqlConnection.query(userQuery, function (err, results) {
            if (err) {
              console.log(err);
            } else {
              console.log("Data inserted into user table.");

              // Insert data into orders table
              if (orderId != 0) {
                let orderQuery = `INSERT INTO orders (order_id, product_id, user_id) VALUES ('${orderId}', '${productId}', '${userId}')`;

                mysqlConnection.query(orderQuery, function (err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Data inserted into orders table.");
                  }
                });
              }
            }
          });

          mysqlConnection.query(
            sqlAddToProductDescription,
            function (err, result) {
              if (err) throw err;
              console.log("Product description inserted");
            }
          );
          mysqlConnection.query(sqlAddToProductPrice, function (err, result) {
            if (err) throw err;
            console.log("Product price inserted");
          });
        }
      }
    }
  );
  res.end("Product Added");
});

app.get("/iphones", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Products JOIN ProductDescription JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id",
    (err, rows, fields) => {
      let iphones = { products: [] };
      iphones.products = rows;
      console.table(iphones);

      var stringIphones = JSON.stringify(iphones);
      if (!err) res.end(stringIphones);
      else console.log(err);
    }
  );
});

// _________________________
app.listen(2023, () => {
  console.log("Listening and running on http://localhost:2023");
  //app.listen is a method in the popular Node.js web framework, Express, that creates an HTTP server to listen for incoming requests on a specific port.
});
