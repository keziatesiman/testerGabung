const express = require('express');
const mysql = require('mysql');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const randomstring = require("randomstring");
const bodyparser = require('body-parser');
const datetime = require('node-datetime');
const uuidv4 = require('uuid/v4');
const fs = require('fs');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    //properties...
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'leantera_production_import',
    multipleStatements: true
});

connection.connect(function(error) {
    if (!!error) {
        console.log('Error');
    }
    else {
        console.log('Connected');
    }
});


//Insert an username
app.post('/signup', (req, res) => {
    let emp = req.body;
    var usern = emp.username;
    var passw =randomstring.generate(7);
    var name = emp.name;
    var phone = emp.phone;
    var current_company = emp.current_company;
    var division = emp.division;
    var id = uuidv4(); 

    var now = datetime.create();
    var created_at = now.format('Y-m-d H:M:S');
    
    var hashedPass = bcrypt.hashSync(passw, saltRounds); 
    console.log("ID ", id);
    console.log("Username ", usern);
    console.log("Password", passw);
    console.log("Hashed pass ",hashedPass);
    console.log("date time: ", created_at);

    var sql = "INSERT INTO users(id, username, password, name, phone, current_company, division, created_at) \
	VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    connection.query(sql, [id, usern, hashedPass, name, phone, current_company, division, created_at], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log("Success \n");

            var idLog = uuidv4()
            var sqlInsertLog = "INSERT INTO logs(id, username, type, class, activity, description) \
            VALUES (?, ?, 'web', 'tryRegister', 'register', 'register success');"
            connection.query(sqlInsertLog, [idLog, usern] ,(err, result) => {
                if (!err) {
                    console.log('updated logs at register success');
                }
                else {
                    console.log("error \n");
                    console.log(err);
                }
         })
            
        }
        else {
            console.log("error \n");
            console.log(err);
        }
    })
});

//Get user and put all those data on json file 
app.get('/user', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err) {
            

            var data_table = [];

            for (var i in rows) {
                var user_id = rows[i].id; 
                var user_username =rows[i].username;
                var user_name =rows[i].name;
                var user_phone = rows[i].phone;
                var user_current_company = rows[i].current_company;
                var user_division = rows[i].division;

                data_table.push({
                    user_id :user_id,
                    user_username : user_username,
                    user_name :user_name,
                    user_phone : user_phone,
                    user_current_company: user_current_company,
                    user_division : user_division
                });
                let data = JSON.stringify(data_table);
                fs.writeFileSync('./client/src/components/student-2.json', data); 
            }

            res.send(data_table);
        
        }
        else {
            console.log(err);
        }
    })
   
});

//Authenticate user data
app.post('/authenticate', (req, res) => {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password

    //hash the password
    var hashedPass = bcrypt.hashSync(password, saltRounds); 
    console.log("Hashed password: ",hashedPass);   
    const sql = 'SELECT * FROM users WHERE username = ?'
    connection.query(sql, [username], (err, result) => {
        if(result.length > 0) {
            // var hasil = bcrypt.compareSync(password, result[0].Password); 
            
            const dbpass = result[0].password;
            console.log(dbpass);

            bcrypt.compare(password, dbpass, function(err, resp) {
                if(resp) {
                    // Passwords match
                    console.log("match");
                    var now = datetime.create();
                    var last_login = now.format('Y-m-d H:M:S');
                    
                    var sqlUpdate = "UPDATE users SET last_login = ? WHERE username = ?";
                    connection.query(sqlUpdate, [last_login, username] ,(err, result) => {
                        if (!err) {
                            console.log('updated last login at ', last_login);
                        }
                        else {
                            console.log("error \n");
                            console.log(err);
                        }
                 })
                    var idLog = uuidv4()
                    var sqlInsertLog = "INSERT INTO logs(id, username, type, class, activity, description) \
                    VALUES (?, ?, 'web', 'tryLogin', 'login', 'login success');"
                    connection.query(sqlInsertLog, [idLog, username] ,(err, result) => {
                        if (!err) {
                            console.log('updated logs at login success', last_login);
                        }
                        else {
                            console.log("error \n");
                            console.log(err);
                        }
                 })

                 res.status(200).json({
                    statusCode: 200,
                    loginSuccess: true,
                    message: "Login Success Yey"
                })
                } else {
                 // Passwords don't match
                 console.log("not match");

                 var idLog = uuidv4()
                 var sqlInsertLog = "INSERT INTO logs(id, username, type, class, activity, description) \
                 VALUES (?, ?, 'web', 'tryLogin', 'login', 'login failed, wrong password');"
                 connection.query(sqlInsertLog, [idLog, username] ,(err, result) => {
                     if (!err) {
                         console.log('updated logs wrong password');
                     }
                     else {
                         console.log("error \n");
                         console.log(err);
                     }
              })

                 res.status(200).json({
                    statusCode: 401,
                    loginSuccess: false,
                    message: "Failed : Password is wrong"
                })

                
                } 
              });
              
        } else {
            console.log("not match");

            var idLog = uuidv4()
                var sqlInsertLog = "INSERT INTO logs(id, username, type, class, activity, description) \
                VALUES (?, ?, 'web', 'tryLogin', 'login', 'login failed, username does not exist');"
                connection.query(sqlInsertLog, [idLog, username] ,(err, result) => {
                    if (!err) {
                        console.log('updated logs username does not exist ');
                    }
                    else {
                        console.log("error \n");
                        console.log(err);
                    }
             })

            res.status(200).json({
                statusCode: 404,
                loginSuccess: false,
                message: "Failed : Username does not exist"
            })
        }
    })
})


const port = 1338;

app.listen(port, () => `Server running on port ${port}`);


//USERNAME : bla@gmail.com
//PASSWORD : turFDnR