var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var config = require("../config/config");
var connection = mysql.createConnection(config.db);
connection.connect();

/* GET home page. */
router.post("/register", (req, res, next)=>{
  // console.log(req.body);
  // res.json(req.body);
  const userData = req.body;
  console.log(req.body.email);
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

  checkEmail.then(
    ()=>{
      console.log("User is not in the db");
      res.json({
        msg: "user does not exist"
      })
    }
  )
});

module.exports = router;
