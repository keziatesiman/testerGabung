'use strict';

const axios = require('axios');
const fs = require('fs');


    axios.get('http://localhost:1338/user')
    .then(function (response) {
      console.log('response');
      console.log(response.data);
      let data = JSON.stringify(response.data);
      fs.writeFileSync('student-2.json', data);  
    })
    .catch(function (error) {
      console.log(error);
    });

    var obj = JSON.parse(fs.readFileSync('student-2.json', 'utf8'));
    console.log('READ NODE');
    console.log(obj);


// let data = JSON.stringify(stud);  
// fs.writeFileSync('student-2.json', data);  