const express = require('express');
const {
  getTopFive,
  getTopFives,
  createTopFive,
  updateTopFive,
  deleteTopFive,
  topfivePhotoUpload,
  getOneTopFive,
} = require('../controllers/topfives');

const router = express.Router();

router.route('/').get(getTopFives).post(createTopFive);

router.route('/:id').get(getTopFive).put(updateTopFive).delete(deleteTopFive);

// router.route('/topItem').get(getOneTopFive);

router.route('/:id/photo').put(topfivePhotoUpload);

module.exports = router;
