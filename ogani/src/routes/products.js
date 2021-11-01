const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect2');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const router = express.Router();

router.use((req, res, next)=>{
    console.log(req.url)
    if(req.url == '/products' || req.url == '/favorites'){
        if(!req.session.admin){
            res.redirect('/logina');
        }
    }
    
    next();
});

router.get('/products', async (req, res) => {
    const sql = "SELECT * FROM productss";
    const [rs] = await db.query(sql);

    res.render('products', { rs });
});

router.post('/cart/remove',async (req,res)=>{
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const pk = req.body.pk;
    const output = {
        success: false,
        error: '',
        code: 0, // 追踪程式走到哪
        cart: req.session.cart,
        postData: req.body,
    };

    let remove_index = null;
    req.session.cart.forEach((element,index) => {
        if(element.sid == pk){
            remove_index = index;
        }
    });

    req.session.cart.splice(remove_index,1);


    //刪除
    let user_id = req.session.admin.user_id
    let remove_sql = "DELETE FROM `cart` WHERE user_id = ? AND product_id = ?"
    let _result = await db.query(remove_sql,[user_id,pk])

    output.success = true;
    res.json(output)
})

router.post('/cart/add', async (req, res) => {
    
    if (!req.session) {
        req.session = {};
    }
    if (!req.session.cart) {
        req.session.cart = [];
    }

    const output = {
        success: false,
        error: '',
        code: 0, // 追踪程式走到哪
        cart: req.session.cart,
        postData: req.body,
    };

    const pk = req.body.pk; // primary key
    const qty = + req.body.qty;
    if (!qty || qty < 1) {
        output.error = '數量不能小於 1';
        output.code = 401;
        res.json(output);
    }

    // 檢查是否已經有該項商品在購物車內
    const ar = req.session.cart.filter(el => el.sid == pk);
    
    if (ar.length) {
        output.success = true;
        output.code = 210;
        ar[0].quantity = qty;
        res.json(output);
    }


    const sql = "SELECT * FROM productss WHERE sid=?";
    const [rs] = await db.query(sql, [pk]);
    if (!rs.length) {
        output.error = '沒有該項商品';
        res.json(output);
    }
    const item = rs[0];
    item.quantity = qty;

    req.session.cart.push(item);
    output.cart = req.session.cart;
    output.success = true;
    output.code = 230;

    //先判斷有沒有加入過
    let user_id = req.session.admin.user_id;
    let select_sql = "SELECT * FROM `cart` WHERE user_id = ? AND product_id = ?"
    let [result] = await db.query(select_sql,[user_id,pk])
    if(result.length > 0){
        let update_sql = "UPDATE cart SET qty = ? WHERE user_id = ? AND product_id = ?"
        let result = await db.query(update_sql,[qty,user_id,pk])
        res.json(output)
    }

    //存入cart資料表
    let insert_sql = "INSERT INTO `cart` (`user_id`,`product_id`,`qty`) VALUES (?,?,?);"
    let _result = await db.query(insert_sql,[user_id,pk,qty]);

    console.log(_result)

    res.json(output);
});
router.get('/cart', async (req, res) => {


    if (!req.session.cart) {
        req.session.cart = [];
    }

    console.log(req.session.cart)
    res.render('cart', { cart: req.session.cart });
});

router.get('/favorites', async (req, res) => {

    if (!req.session.cart) {
        req.session.cart = [];
    }
    res.render('favorites', { favorites: req.session.favorites });
});



module.exports = router;
