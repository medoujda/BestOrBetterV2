/**
 * Comment Routes
 * @Author: Mohammed BERHILI
 */

const express = require('express');
const router = express.Router();
const Comment = require('../models/commentaire.js');



//Get Comments
router.post('/commentaire_classement', (req, res, next) => {
  Comment.find({nomClassement: req.body.nomClassement}, (err, comment) => {
     let returnComments = {
          email: comment.emailUser,
          Commentaire: comment.textCommentaire
        }
    if (err){
      console.log("erreur");
    }
    else{ 
  return res.send({
    Commentaire : comment})
}

  }) 
  });

// Create new Comment
router.post('/newcommentaire', (req, res, next) => {
  let newCommentaire = new Comment({
    textCommentaire: req.body.textCommentaire,
    emailUser: req.body.emailUser,
    nomClassement: req.body.nomClassement,
    dateCommentaire: new Date()
  });

  newCommentaire.save((err, commentaire) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failed to save the comment'
      });
    }
    res.send({
      success: true,
      message: 'Comment Saved',
      commentaire
    });
  });
});
module.exports = router