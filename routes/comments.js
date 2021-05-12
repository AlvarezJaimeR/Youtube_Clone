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

//get related videos

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

//post reply 

module.exports = router;