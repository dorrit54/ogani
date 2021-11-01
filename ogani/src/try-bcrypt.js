var bcrypt = require('bcryptjs');

// hash() 產生編碼
bcrypt.hash('1234', 8, (err, hash)=>console.log(hash) );

// 比對

const hash = '$2a$08$xZY.PxItyf1YVriCDA0zSOMzLMYH7U8bVmrnslMDpYN69BoYJYlQW';
bcrypt.compare('1234', hash, function(err, res) {

    console.log(res);
});