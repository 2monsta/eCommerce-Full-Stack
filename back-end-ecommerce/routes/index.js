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
var stripe = require("stripe")(config.stripeKey);
connection.connect();
/* GET home page. */



router.post('/fakelogin', (req, res, next)=>{
  const getFirstUser = `SELECT * from users limit 1;`;
  connection.query(getFirstUser, (error, results)=>{
    if(error){
      throw error;
    }
    res.json({
      msg: "loginSuccess",
      token: results[0].token,
      name: results[0].email
    });
  })
});

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
          // res.json(results);
          const getCartProducts = `select * from cart inner join products on products.productCode = cart.producdtCode where uid =?;`;
          connection.query(getCartProducts, [uid], (error, cartContents)=>{
            if (error){
              throw error;
            }else{
              var finalCart = results[0];
              finalCart.product=cartContents;
              res.json(finalCart);
            }
          })
        }
      })
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
              res.json(results[0]);
            }
          })
        }
      })
    }
  })
});
router.post('/updateUserInfo', (req, res,next)=>{
  console.log(req.body);
});



router.post('/stripe',(req, res, next)=>{
  // Bring in vars from the ajax request
  const userToken = req.body.userToken;
  console.log(userToken);
  const stripeToken = req.body.stripeToken;
  const amount = req.body.amount;
  // stripe module required above, is associated with our secretkey.
  // it has a charges object which has multiple methods.
  // the one we want, is create.
  // create takes 2 args:
  // 1. object (stripe stuff)
  // 2. function to run when done
  stripe.charges.create({
      amount: amount,
      currency: 'usd',
      source: stripeToken,
      description: "Charges for classicmodels"
    },
    (error, charge)=>{
      // stripe, when the charge has been run,
      // runs this callback, and sends it any errors, and the charge object
      if(error){
        res.json({
          msg: error
        })
      }else{
        // Insert stuff from cart that was just paid into:
        // - orders
        const getUserQuery = `SELECT MAX(users.id) as id, MAX(users.cid) as cid, MAX(cart.producdtCode) as productCode, MAX(products.buyPrice) as buyPrice, COUNT(cart.producdtCode) as quantity FROM users 
				INNER JOIN cart ON users.id = cart.uid
				INNER JOIN products ON cart.producdtCode = products.productCode
				WHERE token = ?
				GROUP BY cart.producdtCode`
        console.log(userToken)
        console.log(getUserQuery);
        connection.query(getUserQuery, [userToken], (error2, results2)=>{
          if(error2){
            throw error2; //halt everything/dev only
          }
          const customerId = results2[0].cid;
          const insertIntoOrders = `INSERT INTO orders
					(orderDate,requiredDate,comments,status,customerNumber)
					VALUES
					(?,?,'Website Order','Paid',?)`
          connection.query(insertIntoOrders,[null,Date.now(),customerId],(error3,results3)=>{
            // console.log(results3)
            if(error3){
              throw error3;
            }
            const newOrderNumber = results3.insertId;
            // results2 (the select query above) contains an array of rows.
            // Each row has the uid, the productCOde, and the price
            // map through this array, and add each one to the orderdetails tabl

            // Set up an array to stash our promises inside of
            // After all the promises have been created, we wil run .all on this thing
            var orderDetailPromises = [];
            // Loop through all the rows in results2, which is...
            // a row for every element in the users cart.
            // Each row contains: uid, productCode,BuyPrice
            // Call the one we're on, "cartRow"
            results2.map((cartRow)=>{
              // Set up an insert query to add THIS product to the orderdetails table
              var insertOrderDetail = `INSERT INTO orderdetails
								(orderNumber,productCode,quantityOrdered,priceEach,orderLineNumber)
								VALUES
								(?,?,?,?,1)`
              // Wrap a promise around our query (because queries are async)
              // We will call resolve if it succeeds, call reject if it fails
              // Then, push the promise onto the array above
              // So that when all of them are finished, we know it's safe to move forward

              const aPromise = new Promise((resolve, reject) => {
                connection.query(insertOrderDetail,[newOrderNumber,cartRow.productCode,cartRow.quantity, cartRow.buyPrice],(error4,results4)=>{
                  // another row finished.
                  if (error4){
                    reject(error4)
                  }else{
                    resolve(results4)
                  }
                })
              })
              orderDetailPromises.push(aPromise);
            })
            // When ALL the promises in orderDetailPromises have called resolve...
            // the .all function will run. It has a .then that we can use
            Promise.all(orderDetailPromises).then((finalValues)=>{
              console.log("All promises finished")
              console.log(finalValues)
              const deleteQuery = `
								DELETE FROM cart WHERE uid = ${results2[0].id}
							`
              connection.query(deleteQuery, (error5, results5)=>{
                // - orderdetails
                // Then remove it from cart
                res.json({
                  msg:'paymentSuccess'
                })
              })
            });
          })
        });

      }
    });
});


module.exports = router;



//TODO: add time internal for token token_exp = DATE_ADD(NOW(), Internval 1 hour);