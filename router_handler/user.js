const bcrypt = require('bcryptjs');
const db = require('../db/index');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.regUser = (req, res) => {
    const userinfo = req.body;
    // 检测数据的合法性（不能为空）
    /* if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不合法！' });
    } */
    // 检测用户名是否被占用
    const sql = 'SELECT * FROM ev_users WHERE username=?'
    db.query(sql, userinfo.username, (err, results) => {
        // if (err) return res.send({ status: 1, message: err.message });
        if (err) return res.cc(err);
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' });
            return res.cc('用户名被占用，请更换其他用户名！');
        }
        // 调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        
        // 插入新用户
        const sql = 'insert into ev_users set ?';
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // SQL 语句执行失败
            // if (err) return res.send({ status: 1, message: err.message });
            if (err) return res.cc(err);
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册失败，请稍后重试！' });
                return res.cc('注册失败，请稍后重试！');
            }
            // 注册成功
            // res.send({ status: 0, message: '注册成功！' });
            res.cc('注册成功！', 0);
        });
    });
};

exports.login = (req, res) => {
    const userinfo = req.body;
    const sql = 'SELECT * FROM ev_users WHERE username=?';
    db.query(sql, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) res.cc(err);
        // 执行 SQL 语句成功，但是查询到的数据条数不等于 1，可能不存在此用户
        if (results.length !== 1) return res.cc('登录失败！');
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败！');
        }
        // 登录成功，生成 Token 字符串，核心注意点：在生成 Token 字符串的时候，一定要剔除 密码 和 头像 的值
        const user = { ...results[0], password: '', user_pic: '' };
        // 对用户的信息进行加密，生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr
        });
    });
};