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

  let insertIntoPromise = new Promise((resolve, reject)=>{
    const insertIntoCust = `insert into customers (customerName, city, state, salesRepEmployeeNumber, creditLimit)
        values (
        ?,?,?,?,?);`;
    connection.query(insertIntoCust, [userData.name, userData.city, userData.state, 1337, 100000], (error, results)=>{
      if(error){
        reject(error);
      }
      const newID = results.insertId;
      const token = randToken.uid(60);
      const hash = bcrypt.hashSync(userData.password);
      const insertUsers = `insert into users (cid, type, password, token, email) values (?,?,?,?,?);`;
      connection.query(insertUsers, [newID, 'customer', hash, token, userData.email], (error, results)=>{
        if(error){
          reject(error);
        }else{
          // if we get this far, this is going to be inside of the auth reducer
          resolve({
            token: token,
            name: userData.name,
            msg: "registerSuccess"
          })
        }
      });
    })
  });
  checkEmail
  .then(()=>{
      return insertIntoPromise;
    })
  .then((data)=>{
    res.json(data);
  })
  .catch((error)=>{
    res.json(error);
  })
});




router.post("/login", (req, res, next)=>{
  // console.log(req.body);
  const checkLoginQuery = 'select * from users inner join customers on users.cid = customers.customerNumber where users.email =?;';
  connection.query(checkLoginQuery, [req.body.email], (error, results)=>{
    if(error){
      throw error;
    }
    if(results.length ===0){
      // this user does not exist, send back bad user
      res.json({
        msg: 'badUser'
      })
    }else{
      // this email is valid, see if password is
      //checking the english password vs the hashed password in db
      const checkHash = bcrypt.compareSync(req.body.password, results[0].password);
      const name = results[0].customerName;
      // if they are true, update the token and then send back the token, msg and name
      if(checkHash){
        // console.log(name);
        const newToken = randToken.uid(100);
        const updateToken = "UPDATE users set token =? WHERE email = ?;";
        connection.query(updateToken, [newToken, req.body.email], (error)=>{
          if(error){
            throw error;
          }
          res.json({
            token: newToken,
            msg: "loginSuccess",
            name: name
          });
        });
        // the password is wrong, send back wrong password
      }else{
        res.json({
          msg: "wrongPassword"
        })
      }
    }
  });
});

router.get("/productlines/get", (req, res, next)=>{
	const selectQuery = "SELECT * FROM productlines;";
	connection.query(selectQuery, (error, results)=>{
		if(error){
			throw error;
		}else{
			res.json(results)
		}
	})
});


router.get("/productlines/:productline/get", (req,res,next)=>{
	const pl = req.params.productline;
	var plQuery = `SELECT * FROM productlines INNER JOIN products ON productlines.productLine = products.productLine WHERE productlines.productLine =?`;
	connection.query(plQuery, [pl],(error, results)=>{
		if(error){
			throw error;
		}else{
			res.json(results);
		}
	})
});


router.post('/updateCart', (req, res, next)=>{
  const productCode = req.body.productCode;
  const userToken = req.body.userToken;
  const getUidQuery = ' SELECT id FROM users WHERE token = ?';
  connection.query(getUidQuery, [userToken], (error, results)=>{
    if(error){
      throw error;

    }else if(results.length===0){
      // this thoken is bad
      res.json({
        msg:"badToken"
      })
    }else{
      // this is a good token, i know who this is
      const uid = results[0].id;
      const addToCartQuery = `INSERT INTO cart(uid, producdtCode) VALUES (?,?);`;
      connection.query(addToCartQuery, [uid, productCode], (error,results)=>{
        if(error){
          throw error;
        }else{
          // the insert worked
          // get the sum of their products and their total
          const getCartTotals = `SELECT SUM(products.buyPrice) as totalPrice, COUNT(products.buyPrice) as totalItems FROM cart INNER JOIN products ON products.productCode = cart.producdtCode WHERE cart.uid = ?;`;
          connection.query(getCartTotals, [uid],(error, results)=>{
            if(error){
              throw error;
            }else{
              res.json(results);
            }
          })
        }
      })
    }
  })
});


router.post('/getInitialData', (req, res,next)=>{
  const userToken = req.body.userToken;
  const getUidQuery = ' SELECT id FROM users WHERE token = ?';
  connection.query(getUidQuery, [userToken], (error, results)=>{
    if(error){
      throw error;

    }else if(results.length===0){
      // this thoken is bad
      res.json({
        msg:"badToken"
      })
    }else{
      // this is a good token, i know who this is
      const uid = results[0].id;
      const getCartTotals = `SELECT SUM(products.buyPrice) as totalPrice, COUNT(products.buyPrice) as totalItems FROM cart INNER JOIN products ON products.productCode = cart.producdtCode WHERE cart.uid = ?;`;
      connection.query(getCartTotals, [uid],(error, results)=>{
        if(error){
          throw error;
        }else{
          res.json(results);
        }
      })
    }
  })
});


router.post('/updateUserInfo', (req, res,next)=>{
  console.log(req.body);
});

module.exports = router;



//TODO: add time internal for token token_exp = DATE_ADD(NOW(), Internval 1 hour);