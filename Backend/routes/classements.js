/**
 * Classement Routes
 * @Author: Mohammed BERHILI
 */

const express = require('express');
const router = express.Router();
const Classement = require('../models/classement.js');



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
router.post('/newClassement', (req, res, next) => {
  let newClassement = new Classement({
    textClassement: req.body.textClassement,
    emailUser: req.body.emailUser,
    nameList : req.body.nameList,
    dateClassement: new Date()
  });

  newClassement.save((err, classement) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failed to save the Classement'
      });
    }
    res.send({
      success: true,
      message: 'Classement Saved',
      classement
    });
  });
});
module.exports = router