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

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const action = await db.get(id);
        if (!action) {
            res.status(404).json({ message: "The action with this id could not be found" });
        } else {
            res.status(200).json(action);
        }
    } catch (error) {
        res.status(505).json({ message: "server error" });
    }
});

router.post('/', async (req,res) => {

    try {
        const newAction = await db.insert(req.body)
        if (req.body.project_id && req.body.description && req.body.notes) {
            res.status(201).json(newAction);
        } else {
            res.status(400).json({ message: 'Please provide all needed information and try again'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Server could not handle post'});
    }
});

router.put('/:id', async (req,res) => {
    const changes = req.body;
    const {id} = req.params;

    try {
        const action = await db.update(id, changes)
        if (action) {
            res.status(200).json(action)
        } else { 
            res.status(404).json({message:"The action with this ID does not exist."})
        }
    } catch(error) {
        res.status(500).json({ error: 'Server error while attempting to update'});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const action = await db.remove(id);
        if (!action) {
            res.status(404).json({ message: 'The action with this ID could not be found'})
        } else {
            res.status(200).json({ message: "This entry has been terminated"})
        }
    } catch (error) {
        res.status(500).json({ error: 'Server ran into errors removing this entry'});
    }
});

module.exports = router;