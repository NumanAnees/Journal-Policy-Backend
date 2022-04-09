const { model, Schema } = require('mongoose');
const { ObjectId } = Schema;

const journalSchema = new Schema({
  title:String,
  url: String,
  issn: String,
  rating: String,
  date: String,
  policies:[
    {
      title: String,
      first_year: String,
      last_year: String,
      policy_type: String
    }
  ],
  domain: String,
  postedBy: {
            type: ObjectId,
            ref: 'User'
            },
  createdAt: String,
});

module.exports = model('Journal', journalSchema);
