var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/config");
var connection = mysql.createConnection(config.db);
var bcrypt = require("bcrypt-nodejs");
// include bcrypt to hash and checking password
// include a random token for generating a random token
var randToken = require("rand-token");

// console.log(randToken.uid(100));
connection.connect();
/* GET home page. */
router.post("/register", (req, res, next)=>{
  const userData = req.body;
  // console.log(req.body.email);
  // first check if user exist , we will use email
  let checkEmail = new Promise((resolve, reject)=>{
    const checkEmailQuery = "select * from users where email = ?;";
    connection.query(checkEmailQuery, [userData.email], (error, results)=>{
      if(error){
        throw (error);
      }else if(results.length>0){
        reject({
          msg: "userExists"
        })
      }else{
        resolve(results);
      }
    })
  });


  checkEmail
  .then(
    ()=>{
      // console.log("User is not in the db");
        const insertIntoCust = `insert into customers (customerName, city, state, salesRepEmployeeNumber, creditLimit)
        values (
        ?,?,?,?,?);`;
        connection.query(insertIntoCust, [userData.name, userData.city, userData.state, 1337, 100000], (error, results)=>{
          if(error){
            throw (error);
          }
          const newID = results.insertId;
          const token = randToken.uid(60);
          const hash = bcrypt.hashSync(userData.password);
          const insertUsers = `insert into users (cid, type, password, token, email) values (?,?,?,?,?);`;
          connection.query(insertUsers, [newID, 'customer', hash, token, userData.email], (error, results)=>{
            if(error){
              throw error;
            }else{
              // if we get this far, this is going to be inside of the auth reducer
              res.json({
                token: token,
                name: userData.name,
                msg: "registerSuccess"
              })
            }
          });
        })
    }
  )
  .catch((error)=>{
    res.json(error);
  })
});

module.exports = router;
