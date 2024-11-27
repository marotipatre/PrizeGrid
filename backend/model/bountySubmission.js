const mongoose = require('mongoose');
require('mongoose-type-url');


const bountyProjectSchema = new mongoose.Schema({
  title: { type:String }, 
  submittedAt: { type: Date, default: new Date() },
  submissionLink: { type: mongoose.SchemaTypes.Url },
  twitterLink: { type: mongoose.SchemaTypes.Url },
  anythingElse: { type: String },
  walletAddress: { type: String },
  winner: {
      rank: { type: Number }
  },
  isWinner: { type: Boolean },
  bountyId: { type: String }, //bounty id as foreign key
});

module.exports = mongoose.model('bountySubmission', bountyProjectSchema);