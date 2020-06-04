const db = require('../db/index');

// 获取用户信息
exports.getUserInfo = (req, res) => {
    const sql = 'SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id=?';
    // req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err);
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取用户信息失败');
        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        });
    });
};

// 更新用户信息
exports.updateUserInfo = (req, res) => {
    const sql = 'UPDATE ev_users set ? WHERE id=?';
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('修改用户信息失败！');
        return res.cc('修改用户信息成功', 0);
    });
};