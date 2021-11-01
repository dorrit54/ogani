require('dotenv').config();

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const {v4: uuid_v4} = require('uuid');
const session = require('express-session');
const moment = require('moment-timezone');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const db = require(__dirname + '/db_connect2');


const app = express(); // 建立伺服器個體
const router = express.Router();

app.use(session({
    secret:'abc',
    resave:false,
    saveUninitialized:true,
}))
app.use(require('cors')());

// 指定樣版引擎
app.use(require('express-ejs-layouts'))
app.set('view engine','ejs')
app.set('layout',__dirname+'/../views/layouts/main')//設定主模板
app.set('views', __dirname + '/../views');
app.set('logina',__dirname+'/../views/parts/logina');
app.set('favorites',__dirname+'/../views/favorites');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
//每個頁面的全域變數=>locals
app.use((req, res, next)=>{
    // res.locals.title = 'ㄐ';

    // res.locals.dateToDateString = d => moment(d).format('YYYY-MM-DD');
    // res.locals.dateToDateTimeString = function(d) {
    //     return moment(d).format('YYYY-MM-DD hh:mm:ss');
    // };
    res.locals.session = req.session;

    next();
});


app.get('/',(req,res)=>{
    res.render('index')
})

app.use(express.static('public'));
app.use(express.static(__dirname+'/../ogani'));

app.use((req, res, next)=>{ //right here!
   res.locals.title = 'Rose supermarket';
    next()
});

app.use(require(__dirname + '/routes/products'));//可能因為這行寫在這裡的關係所以所有路由都會跑到products.js的middleware

app.get('/logina', (req, res)=>{
    res.render('logina');
});
app.post('/logina', async (req, res)=>{
    const output = {
        success: false,
        error: '',
        postData: req.body,
    };
    if(!req.body.account || !req.body.password){
        output.error = '欄位資料不足';
        return res.json(output);
    }

    const sql = "SELECT * FROM admin WHERE account=?";
    const [rs] = await db.query(sql, [req.body.account]);

    
    if(!rs.length){
        output.error = '帳號錯誤';
        return res.json(output);
    }

    const result = await bcrypt.compare(req.body.password, rs[0].password_hash);
    
    if(result){
        req.session.admin = {
            user_id: rs[0].sid,
            account: rs[0].account,
        };
        output.success = true;
    } else {
        output.error = '密碼錯誤';
    }
    
    res.json(output);
});
app.get('/logout', (req, res)=>{
    delete req.session.admin;
    res.redirect('/');
});

const port = process.env.PORT || 3000;
// console.log('4:', port);
app.listen(port, ()=>{
    console.log('Web Server 啟動: ' + port);
});