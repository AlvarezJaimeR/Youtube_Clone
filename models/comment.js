const mongoose = require('mongoose');
const Joi = require('Joi');

const replySchema = new mongoose.Schema({
    text:{type: String, required: true, minlength:2, maxlength:300},
    likes:{type:Number, default:0},
    dislikes: {type:Number, default:0},
    date:{type: Date, default:Date.now}
});

const commentSchema = new mongoose.Schema({
    text:{type: String, required: true, minlength:2, maxlength:300},
    likes:{type: Number, default:0},
    dislikes:{type: Number, default:0},
    replies:[{type: replySchema}],
    videoId: {type:String, required:true},
    date:{type:Date, default:Date.now}
});

const Comment = mongoose.model('Comment', commentSchema);
const Reply = mongoose.model('Reply', replySchema);

function validateComment (comment){
    const schema = Joi.object({
        text: Joi.string().min(2).max(300).required(),
        likes: Joi.number(),
        dislikes: Joi.number(),
        videoId: Joi.string().required(),
        date: Joi.date(),
    });
    return schema.validate(comment);
}

function validateReply (reply){
    const schema = Joi.object({
        text: Joi.string().min(2).max(300).required(),
        likes: Joi.number(),
        dislikes: Joi.number(),
        date: Joi.date(),
    });
    return schema.validate(reply);
}

exports.Comment = Comment;
exports.Reply = Reply;
exports.commentSchema = commentSchema;
exports.replySchema = replySchema;
exports.validateComment = validateComment;
exports.validateReply = validateReply;