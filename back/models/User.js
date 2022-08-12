const mongoose = require('mongoose');
//permet de vérifier que le mail enregistré sera unique(plugin <mongoose-unique-validator>)
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordConfirm: { type: String, require: true },
  picture: { type: String, default: '../images/photo-avatar-profil.png' },
  description: { type: String },
  admin: { type: Boolean, require: true },
});

//applique uniqueValidator au schéma utilisateur
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

//ajouter un userImageUrl
