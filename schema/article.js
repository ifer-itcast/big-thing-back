const joi = require('@hapi/joi');

const name = joi.string().required();
const alias = joi.string().alphanum().required();

exports.add_cate_schema = {
    body: {
        name,
        alias
    }
};


const id = joi.number().integer().min(1).required();
exports.delete_cate_schema = {
    params: {
        id
    }
};

exports.get_cate_schema = {
    params: {
        id
    }
};

exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
};

// 发布文章
// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow('');
const state = joi.string().valid('已发布', '草稿').required();
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
};