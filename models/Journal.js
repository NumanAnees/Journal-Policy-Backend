const { model, Schema } = require('mongoose');

const journalSchema = new Schema({
  title:String,
  url: String,
  issn: String,
  Rating: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Journal', journalSchema);
