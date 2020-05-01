const express = require('express');
const {
  getTopFive,
  getTopFives,
  createTopFive,
  updateTopFive,
  deleteTopFive,
} = require('../controllers/topfives');

const router = express.Router();

router.route('/').get(getTopFives).post(createTopFive);

router.route('/:id').get(getTopFive).put(updateTopFive).delete(deleteTopFive);

module.exports = router;
