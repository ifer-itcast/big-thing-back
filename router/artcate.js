const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const artCate_handler = require('../router_handler/artcate');
const { add_cate_schema } = require('../schema/article');

// 文章分类列表
router.get('/cates', artCate_handler.getArtCates);

// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArticleCates);

module.exports = router;