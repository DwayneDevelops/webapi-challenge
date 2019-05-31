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

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const project = await db.get(id);
        if (!project) {
            res.status(404).json({ message: "The project with this id could not be found" });
        } else {
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(505).json({ message: "server error" });
    }
});

router.post('/', async (req,res) => {
    const { name, description } = req.body;

    try {
        const newProject = await db.insert({ name, description })
        if (name && description) {
            res.status(201).json(newProject);
        } else {
            res.status(400).json({ message: 'Please provide a name and description and try again'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Server could not handle post'});
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    try {
        const project = await db.update(id, changes);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: "Could not update this entry"});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const project = await db.remove(id);
        if (project === 0) {
            res.status(404).json({ message: 'The item with this ID could not be found'})
        } else {
            res.status(200).json({ message: "This entry has been terminated"})
        }
    } catch (error) {
        res.status(500).json({ error: 'Server ran into errors removing this entry'});
    }
});

router.get('/:id/actions', async (req,res) => {
    const { id } = req.params;

    try {
        const project = await db.getProjectActions(id);
        if (project.length === 0) {
            res.status(404).json({ message: 'No actions for this project were found' });
        } else {
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving actions'});
    }
});

module.exports = router;