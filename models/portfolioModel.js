import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  img: String,  // Image URL for portfolio
  codeLink: String,
  liveLink: String,
});

export const PortfolioModel = mongoose.model('Portfolio', PortfolioSchema);
