const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const artCate_handler = require('../router_handler/artcate');
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/article');

// 文章分类列表
router.get('/cates', artCate_handler.getArtCates);

// 新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArticleCates);

// 根据 ID 删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artCate_handler.deleteCateById);

// 根据 ID 获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), artCate_handler.getArtCateById);

// 根据 ID 更新文章数据
router.post('/updatecate', expressJoi(update_cate_schema), artCate_handler.updateCateById);

module.exports = router;