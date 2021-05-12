const { Comment } = require ('../models/comment');
const express = require('express');
const router = express.Router();

//get all videos 
router.get('/', async (req, res) => {
    try{
        const comments = await Comment.find();
        return res.send(comments);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//get related videos

//post comment 

//put for likes / dislikes

//post reply 