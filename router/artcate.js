const express = require('express');
const router = express.Router();

const artCate_handler = require('../router_handler/artcate');

router.get('/cates', artCate_handler.getArtCates);

module.exports = router;