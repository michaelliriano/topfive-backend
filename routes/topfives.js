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

const { protect } = require('../middleware/auth');

router.route('/').get(getTopFives).post(protect, createTopFive);

router
  .route('/:id')
  .get(getTopFive)
  .put(protect, updateTopFive)
  .delete(protect, deleteTopFive);

// router.route('/topItem').get(getOneTopFive);

router.route('/:id/photo').put(protect, topfivePhotoUpload);

module.exports = router;
