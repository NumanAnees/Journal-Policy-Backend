const { AuthenticationError } = require('apollo-server');

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
    async getJournal(_, { journalId }) {
      try {
        const journal = await Journal.findById(journalId);
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
    async createJournal(_, { body }, context) {
      const user = checkAuth(context);
      const newJournal = new Journal({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const journal = await newJournal.save();

      return journal;
    },
    async deleteJournal(_, { journalId }, context) {
      const user = checkAuth(context);

      try {
        const journal = await Journal.findById(journalId)

        if (user.username === journal.username) {
          await journal.delete();
          return 'Journal deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};