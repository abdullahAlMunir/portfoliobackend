import { PortfolioModel } from '../models/portfolioModel.js';

export async function createPortfolio(portfolioData) {
  try {
    const { userID, title, description, img, codeLink, liveLink } = portfolioData;

    const newPortfolio = new PortfolioModel({
      userID,
      title,
      description,
      img,
      codeLink,
      liveLink,
    });

    await newPortfolio.save();
    return { status: 'Success', message: 'Portfolio created successfully' };
  } catch (err) {
    return { status: 'Fail', message: err.message };
  }
}

export async function getPortfoliosByUser(userID) {
  try {
    const portfolios = await PortfolioModel.find({ userID });
    return { status: 'Success', data: portfolios };
  } catch (err) {
    return { status: 'Fail', message: err.message };
  }
}

export async function updatePortfolio(portfolioID, portfolioData) {
  try {
    const updatedPortfolio = await PortfolioModel.findByIdAndUpdate(
      portfolioID,
      portfolioData,
      { new: true }
    );

    return { status: 'Success', data: updatedPortfolio };
  } catch (err) {
    return { status: 'Fail', message: err.message };
  }
}

export async function deletePortfolio(portfolioID) {
  try {
    await PortfolioModel.findByIdAndDelete(portfolioID);
    return { status: 'Success', message: 'Portfolio deleted successfully' };
  } catch (err) {
    return { status: 'Fail', message: err.message };
  }
}
