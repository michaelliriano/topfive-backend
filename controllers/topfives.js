const TopFive = require('../models/Topfive');
const ErrorResponse = require('../utils/errorResponse');

exports.getTopFives = async (req, res, next) => {
  try {
    const topfives = await TopFive.find();

    res
      .status(200)
      .json({ success: true, count: topfives.length, data: topfives });
  } catch (err) {
    next(error);
  }
};

exports.getTopFive = async (req, res, next) => {
  try {
    const singleTopFive = await TopFive.findById(req.params.id);
    if (!singleTopFive) {
      return next(
        new ErrorResponse(`Top Five not found with ID of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: singleTopFive });
  } catch (err) {
    next(err);
  }
};

exports.createTopFive = async (req, res, next) => {
  try {
    const topfive = await TopFive.create(req.body);
    res.status(201).json({
      success: true,
      data: topfive,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTopFive = async (req, res, next) => {
  try {
    const topfive = await TopFive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!topfive) {
      return next(
        new ErrorResponse(`Top Five not found with ID of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: topfive });
  } catch (error) {
    next(error);
  }
};

exports.deleteTopFive = async (req, res, next) => {
  try {
    const topfive = await TopFive.findByIdAndDelete(req.params.id);
    if (!topfive) {
      return next(
        new ErrorResponse(`Top Five not found with ID of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
