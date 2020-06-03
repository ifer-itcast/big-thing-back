const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./router/user');

app.use(cors());
app.use(express.urlencoded({ extended: false }));

// 用户路由模块
app.use('/api', userRouter);

app.listen(3007, () => {
    console.log('server running on http://localhost:3007');
});