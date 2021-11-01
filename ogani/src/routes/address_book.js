const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect2');

const router = express.Router();

router.use((req, res, next)=>{
    if(!req.session.admin){
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/', (req, res)=>{
    res.redirect('/address-book/list');
});

router.get('/list', async (req, res)=>{
    const perPage = 10; // 每頁有幾筆
    //let page = req.query.page ?? 1;
    let page = req.query.page ? parseInt(req.query.page) : 1;

    // 算總筆數
    const [r1] = await db.query("SELECT COUNT(1) num FROM `address_book`");
    const totalRows = r1[0]['num'];


    // 算總頁數
    const totalPages = Math.ceil(totalRows/perPage);
    let rows = [];

    if(totalRows>0){
        if(page<1){
            // page=1;
            return res.redirect('?page=1');
        }
        if(page>totalPages) {
            // page=totalPages;
            return res.redirect('?page=' + totalPages);
        }

        const sql = `SELECT * FROM address_book ORDER BY sid DESC LIMIT ${(page-1)*perPage}, ${perPage} `;
        [rows] = await db.query(sql);
    }

    res.render('address-book/list', {
        totalRows,
        totalPages,
        perPage,
        page,
        rows,
    });

});

// *** 新增資料 ***
router.get('/add', async (req, res)=>{
    res.render('address-book/add');
});
router.post('/add', async (req, res)=>{
    const output = {
        success: false,
        postData: req.body,   // 丟回 client 以方便除錯
        error: '',
        code: 0,
    };
    let {name, email, mobile, birthday, address} = req.body;

    if(name.length < 2){
        output.error = '姓名字串長度要超過兩個字';
        return res.json(output);
    }

    // 如果生日不符合日期格式, 則設定為空值
    if(! moment(birthday).isValid()){
        birthday = null;
    }

    // TODO: 檢查資料格式


    const sql = `INSERT INTO \`address_book\` 
                (\`name\`, \`email\`, \`mobile\`, \`birthday\`, \`address\`, \`created_at\`)
                 VALUES (?, ?, ?, ?, ?, NOW())`;

    const [result] = await db.query(sql, [name, email, mobile, birthday, address]);


    /*
    // 只有在透過 mysql2 才能這樣用
    const sql = `INSERT INTO \`address_book\` SET ?`;
    const [result] = await db.query(sql, [{name, email, mobile, birthday, address, created_at: new Date() }]);
    */

    output.result = result;
    if(result.affectedRows){
        output.success = true;
    }
    res.json(output);
});

router.get('/delete/:sid', async (req, res)=>{
    //return res.send(req.get('Referer')); // 測試用
    const sql = "DELETE FROM `address_book` WHERE `sid`=?";

    await db.query(sql, [req.params.sid]);

    let redirectUrl = '/address-book/list';
    // 判斷是否有 referer (從哪裡來)
    if(req.get('Referer')){
        redirectUrl = req.get('Referer');
    }

    res.redirect(redirectUrl);
});

router.get('/edit/:sid', async (req, res)=>{

    const sql = "SELECT * FROM address_book WHERE sid=?";
    let [rs] = await db.query(sql, [req.params.sid]);

    // 如果找不到那一筆資料
    if(! rs.length){
        return res.redirect('/address-book/list');
    }
    // res.json(rs[0]); // 測試用
    res.render('address-book/edit', {row: rs[0]});
});
router.post('/edit/:sid', async (req, res)=>{
    const output = {
        success: false,
        postData: req.body,   // 丟回 client 以方便除錯
        error: '',
        code: 0,
    };
    let {name, email, mobile, birthday, address} = req.body;

    if(name.length < 2){
        output.error = '姓名字串長度要超過兩個字';
        return res.json(output);
    }

    // 如果生日不符合日期格式, 則設定為空值
    if(! moment(birthday).isValid()){
        birthday = null;
    }

    // TODO: 檢查資料格式


    const sql = `UPDATE \`address_book\` SET \`name\`=?, \`email\`=?, \`mobile\`=?, \`birthday\`=?, \`address\`=?  WHERE sid=?`;

    const [result] = await db.query(sql, [name, email, mobile, birthday, address, req.params.sid]);


    /*
    // 只有在透過 mysql2 才能這樣用
    const sql = `UPDATE \`address_book\` SET ? WHERE sid=?`;
    const [result] = await db.query(sql, [{name, email, mobile, birthday, address }, req.params.sid]);
    */

    output.result = result;
    if(result.affectedRows){
        if(result.changedRows){
            output.success = true;
        } else {
            output.error = '資料沒有變更';
        }
    }
    res.json(output);
});


module.exports = router;