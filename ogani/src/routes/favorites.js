const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect2');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const router = express.Router();


router.get('/favorites', async (req, res) => {
    const sql = "SELECT * FROM productss";
    const [rs] = await db.query(sql);

    res.render('favorites', { rs });
});

router.post('/cart/remove',(req,res)=>{
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