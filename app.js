const express = require('express');
const cors = require('cors');
const joi = require('@hapi/joi');
const expressJWT = require('express-jwt');
const userRouter = require('./router/user');
const userinfoRouter = require('./router/userinfo');
const config = require('./config');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // status: 0 代表成功
    // status: 1 代表失败
    // 默认将 status 为 1，方便处理失败情况
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        });
    };
    next();
});

// 一定要在路由之前配置解析 Token 的中间件
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }));

// 用户路由模块
app.use('/api', userRouter);
app.use('/my', userinfoRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
    // 验证失败的错误
    if (err instanceof joi.ValidationError) return res.cc(err);
    // 身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！');
    // 未知错误
    res.cc(err);
});

app.listen(3007, () => {
    console.log('server running on http://localhost:3007');
});