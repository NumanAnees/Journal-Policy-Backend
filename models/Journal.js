const { model, Schema } = require('mongoose');
const { ObjectId } = Schema;

const journalSchema = new Schema({
  title:String,
  username: String,
  url: String,
  issn: String,
  rating: String,
  postedBy: {
            type: ObjectId,
            ref: 'User'
            },
  createdAt: String,
});

module.exports = model('Journal', journalSchema);
