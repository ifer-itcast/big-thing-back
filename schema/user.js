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

// 更新用户信息
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
};

// 更新密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
};

// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required();
exports.update_avatar_schema = {
    body: {
        avatar
    }
};