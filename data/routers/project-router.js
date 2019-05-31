const express = require('express');
const db = require('../helpers/projectModel.js');
const router = express.Router();

router.get('/', async (req, res) => {
try {
    const project = await db.get();
    res.status(200).json(project);
} catch (error) {
    res.status(500).json({ error: 'Problem with your server man'});
}
});

module.exports = router;