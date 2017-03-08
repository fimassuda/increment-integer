const express = require('express');
const router = new express.Router();
const ctrl = require('../controllers/index');
const ctrlUser = require('../controllers/user');
const ctrlHealth = require('../controllers/health');
const passport = require('passport');
require('../auth')();

/* Health Check */
router.get('/health', ctrlHealth.healthCheck);

/* Incrementing integer routes. */
router.get('/next', passport.authenticate('bearer', {
  session: false,
}), ctrl.getNext);
router.get('/current', passport.authenticate('bearer', {
  session: false,
}), ctrl.getCurrent);
router.put('/current', passport.authenticate('bearer', {
  session: false,
}), ctrl.resetCurrent);

/* Authentication */
router.post('/auth', ctrlUser.auth);

module.exports = router;
