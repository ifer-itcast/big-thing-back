const db = require('../db');

// 获取文章分类
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

// 新增文章分类
exports.addArticleCates = (req, res) => {
    const sql = 'SELECT * FROM ev_article_cate WHERE name=? OR alias=?';
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err);
        // 1. name 被第一条数据占用了，alias 被第二条数据占用了
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！');
        // 2. name 和 alias 被同一条数据占用了
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！');
        // 3. 分类名称被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！');
        // 4. 分类别名被占用
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！');

        const sql = `insert into ev_article_cate set ?`;
        db.query(sql, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err);
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！');
            // 新增文章分类成功
            res.cc('新增文章分类成功！', 0);
        });
    });
};


// 根据 ID 删除文章分类
exports.deleteCateById = (req, res) => {
    const sql = 'UPDATE ev_article_cate SET is_delete=1 WHERE id=?';
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！');
        res.cc('删除文章分类成功！', 0);
    });
};

// 根据 ID 获取指定文章分类
exports.getArtCateById = (req, res) => {
    const sql = 'SELECT * FROM ev_article_cate WHERE id=?';
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取文章分类数据失败！');

        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0]
        });
    });
};