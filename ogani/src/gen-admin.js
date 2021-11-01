const bcrypt = require('bcryptjs');
const db = require(__dirname + '/db_connect2');

(async ()=>{
    const sql = "INSERT INTO `admin`(`account`, `password_hash`) VALUES (?, ?)";

    const hash = await bcrypt.hash('1234', 8);

    const [result] = await db.query(sql, ['Amanda', hash]);
    console.log(result);
})().catch(error=>{
    console.log(error);
});