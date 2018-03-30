/**
 * The Element Model
 * @Author: Mohammed BERHILI
 */



//Element Model
const mongoose = require('mongoose');


// Schema Definition

const ElementSchema = mongoose.Schema({
  name: { type: String},
  type : { type: String},
});


const Element = mongoose.model('Element', ElementSchema);

module.exports = Element;
