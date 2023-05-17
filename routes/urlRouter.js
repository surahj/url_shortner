const express = require('express');
const urlController = require('./../controllers/urlController');

const router = express.Router();

router.post('/shorten', urlController.shortenUrl);
router.get('/urls', urlController.getUrls);
router.get('/:shortUrl', urlController.getShortenUrl);



module.exports = router;