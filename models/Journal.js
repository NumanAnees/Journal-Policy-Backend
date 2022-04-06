const { model, Schema } = require('mongoose');


const journalSchema = new Schema({
  title:String,
  username: String,
  url: String,
  issn: String,
  Rating: String,
  body: String,
  user: { type: Schema.Types.ObjectId, ref: "users" },
    createdAt: String,
});

module.exports = model('Journal', journalSchema);
