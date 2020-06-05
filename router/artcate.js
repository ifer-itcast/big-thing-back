const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const artCate_handler = require('../router_handler/artcate');
const { add_cate_schema, delete_cate_schema } = require('../schema/article');

// 文章分类列表
router.get('/cates', artCate_handler.getArtCates);

// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArticleCates);

// 根据 ID 删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artCate_handler.deleteCateById);

module.exports = router;