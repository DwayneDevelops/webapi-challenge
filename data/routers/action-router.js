const express = require('express');
const db = require('../helpers/actionModel.js');
const router = express.Router();

router.get('/', async (req, res) => {
try {
    const action = await db.get();
    res.status(200).json(action);
} catch (error) {
    res.status(500).json({ error: 'Problem with your server man'});
}
});

module.exports = router;