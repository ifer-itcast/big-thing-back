// 导入定义验证规则的包
const joi = require('@hapi/joi');

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required(); // \S 代表非空字符

exports.reg_login_schema = {
    body: {
        username,
        password
    }
};

// 定义 id、nickname、email 的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
};