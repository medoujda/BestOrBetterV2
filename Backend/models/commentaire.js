/**
 * The Commentaire Model
 * @Author: Mohammed BERHILI
 */



//Commentaire Model
const mongoose = require('mongoose');


// Schema Definition

const CommentaireSchema = mongoose.Schema({
  textCommentaire: { type: String, required: true },
  emailUser: { type: String, required: true },
  nomClassement: {type: String, required: true},
  dateCommentaire: { type: Date}
});


const Commentaire = mongoose.model('Commentaire', CommentaireSchema);

module.exports = Commentaire;
