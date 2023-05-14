const express = require('express');
const router = express.Router();
const notificationController = require('../Controller/notification_controller');

// Send notification route
router.post('/', notificationController.sendNotification);

module.exports = router;
