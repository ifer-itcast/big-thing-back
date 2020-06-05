const expressJoi = require('@escook/express-joi');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { add_article_schema } = require('../schema/article');

const article_handler = require('../router_handler/article');
const upload = multer({ dest: path.join(__dirname, '../uploads') });

router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle);

module.exports = router;