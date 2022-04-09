const { AuthenticationError,UserInputError } = require('apollo-server');
const {validateJournal} = require("../../util/validators")
const Journal = require('../../models/Journal');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    //--------------------------------Get all Journals-------------------------------
    async getJournals() {
      try {
        const journals = await Journal.find().sort({ createdAt: -1 });
        console.log(journals)
        return journals;
      } catch (err) {
        throw new Error(err);
      }
    },
    //--------------------------------Get 1 Journal----------------------------------
    async getJournal(_, { issn }) {
      try {
        const journal = await Journal.findOne({issn});
        if (journal) {
          return journal;
        } else {
          throw new Error('Journal not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createJournal(_, { journalInput: { title, issn, rating, url,date,policies,domain} }, context) {
      console.log(policies);
      const { valid, errors } = validateJournal(
        title,
        issn,
        rating,
        url,
        date,
        policies,
        domain
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const check = await Journal.findOne({issn});
      if (check) {
        throw new UserInputError('Issn should be unique', {
          errors: {
            issn: 'This Issn is already present'
          }
        });
      }
      const user = checkAuth(context);
      const newJournal = new Journal({
        title,
        issn,
        rating,
        url,
        date,
        domain,
        createdAt: new Date().toISOString()
      });
      newJournal.postedBy = user.id;
      newJournal.policies = policies;
      const journal = await newJournal.save();
      return journal;
    },
    async deleteJournal(_, { issn }, context) {
      const user = checkAuth(context);
      const check = await Journal.findOne({issn});
      if (!check) {
        throw new UserInputError('Journal with this issn is not present', {
          errors: {
            issn: 'Journal with this issn is not present'
          }
        });
      }
      try {
        const journal = await Journal.findOne({issn}).populate({path:"postedBy"})
        if (user.username === journal.postedBy.username) {
          await journal.delete();
          return 'Journal deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateJournal(_,{ journalInput: { title, issn, rating, url,date,policies,domain}},context)
    {
      const { valid, errors } = validateJournal(
        title,
        issn,
        rating,
        url,
        date,
        policies,
        domain
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const check = await Journal.findOne({issn});
      if (!check) {
        throw new UserInputError('Journal with this issn is not present', {
          errors: {
            issn: 'Journal with this issn is not present'
          }
        });
      }
      const user = checkAuth(context);
      const updatedJournal = { title, url, rating,date,policies,domain};

      try{
        const journal = await Journal.findOne({issn}).populate({path:"postedBy"})
          if (user.username === journal.postedBy.username) {
          const Newjournal = Journal.findOneAndUpdate({issn},updatedJournal,{ new: true });
          return  Newjournal;
        } else {
          throw new AuthenticationError('Action not allowed');
        }

      }catch (err) {
        throw new Error(err);
      }
    }
  }
};