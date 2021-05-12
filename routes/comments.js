const { Comment, validateComment } = require ('../models/comment');
const express = require('express');
const router = express.Router();

//get all videos 
router.get('/', async (req, res) => {
    try{
        const comment = await Comment.find();
        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//post comment 
router.post ('/', async (req, res) => {
    try {
        const { error } = validateComment(req.body);
        if (error)
            return res.status(400).send(error);

        const comment = new Comment({
            text: req.body.text,
            videoId: req.body.videoId,
        });

        await comment.save();

        return res.send(comment);

    }   catch (ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//put for likes / dislikes
router.put('/:id/likes', async (req, res) => {
    try {
        const { error } = validateComment(req.body);
        if (error) return res.status(400).send(error);

        const comment = await Comment.findById(req.params.id);
        if(!comment)
        return res.status(400).send(`The comment id "${req.params.id}" does not exist.`);

        comment.likes=req.body.likes;

        await comment.save();
        return res.send(comment);
    }   catch (ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id/dislikes', async (req, res) => {
    try { 
        const { error } = validateComment(req.body);
        if (error) return res.status(400).send(error);

        const comment = await Comment.findById(req.params.id);
        if(!comment)
        return res.status(400).send(`The comment id "${req.params.id}" does not exist.`);

        comment.dislikes=req.body.dislikes;

        await comment.save();
        return res.send(comment);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//post reply 

module.exports = router;