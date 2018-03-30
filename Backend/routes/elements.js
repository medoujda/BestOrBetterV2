/**
 * Element Routes
 * @Author: Mohammed BERHILI
 */

const express = require('express');
const router = express.Router();
const Element = require('../models/element.js');



//Get Image
router.get('/image', (req, res, next) => {

  Element.find({type:"image"}, (err,element) => {
     let returnUser = {
          name: element.name,
          type: element.type,
          id: element._id
        }
    if (err){
      console.log("erreur");
    }
    else{ 
  return res.send({
    elem : element})
}

  }) 
  });

// Create new Element
router.post('/newelement', (req, res, next) => {
  let newElement = new Element({
    name: req.body.name,
    type: req.body.type
  });

  newElement.save((err, element) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failed to save the element'
      });
    }
    res.send({
      success: true,
      message: 'Element Saved',
      element
    });
  });
});
module.exports = router