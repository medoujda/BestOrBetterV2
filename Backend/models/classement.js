/**
 * The Classement Model
 * @Author: Mohammed BERHILI
 */



//Classement Model
const mongoose = require('mongoose');


// Schema Definition

const ClassementSchema = mongoose.Schema({
  textClassement: { type: String, required: true },
  dateClassement: { type: Date},
  nameList : { type: String, required: true},
  emailUser: { type: String, required: true }
});


const Classement = mongoose.model('Classement', ClassementSchema);

module.exports = Classement;
