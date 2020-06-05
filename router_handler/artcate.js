const db = require('../db');

exports.getArtCates = (req, res) => {
    const sql = 'SELECT * FROM ev_article_cate WHERE is_delete=0 ORDER BY id ASC';
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        });
    });
};