const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const TopFive = require('../models/Topfive');

exports.getTopFives = asyncHandler(async (req, res, next) => {
  const topfives = await TopFive.find();

  res.status(200).json({
    success: true,
    count: topfives.length,
    data: topfives,
  });
});

// exports.getOneTopFive = asyncHandler(async (req, res, next) => {
//   const singleTopFive = await TopFive.findOne();
//   res
//     .status(200)
//     .json({ success: true, count: singleTopFive.length, data: singleTopFive });
// });

exports.getTopFive = asyncHandler(async (req, res, next) => {
  const singleTopFive = await TopFive.findById(req.params.id);
  if (!singleTopFive) {
    return next(
      new ErrorResponse(`Top Five not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: singleTopFive });
});

exports.createTopFive = asyncHandler(async (req, res, next) => {
  const topfive = await TopFive.create(req.body);
  res.status(201).json({
    success: true,
    data: topfive,
  });
});

exports.updateTopFive = asyncHandler(async (req, res, next) => {
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
});

exports.deleteTopFive = asyncHandler(async (req, res, next) => {
  const topfive = await TopFive.findByIdAndDelete(req.params.id);
  if (!topfive) {
    return next(
      new ErrorResponse(`Top Five not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// upload a picture

exports.topfivePhotoUpload = asyncHandler(async (req, res, next) => {
  const topfive = await TopFive.findById(req.params.id, {
    new: true,
    runValidators: true,
  });

  if (!topfive) {
    return next(
      new ErrorResponse(`Top Five not found with ID of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please Upload a file`, 400));
  }

  // const file = req.files.file;
  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create Custom File Name
  file.name = `photo_${topfive._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    await TopFive.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
