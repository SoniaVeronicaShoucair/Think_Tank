const Notification = require('../Models/notification');

exports.sendNotification = async (req, res) => {
  const { plant, material, date } = req.body;

  // Calculate two weeks before the given date
  const twoWeeksBeforeDate = new Date(date.getTime() - (14 * 24 * 60 * 60 * 1000));

  try {
    // Check if there is a stock record for the given plant and material
    const stockRecord = await Stock.findOne({ plant, material });

    if (!stockRecord) {
      return res.status(400).json({ message: 'Stock record not found for the given plant and material' });
    }

    // Check if the current stock level will be sufficient until two weeks before the given date
    if (stockRecord.quantity >= stockRecord.daily_consumption * (date.getTime() - twoWeeksBeforeDate.getTime()) / (24 * 60 * 60 * 1000)) {
      return res.status(200).json({ message: 'Stock level is sufficient' });
    }

    // Check if there is already a notification for the given plant, material, and date
    const existingNotification = await Notification.findOne({ plant, material, date });

    if (existingNotification) {
      return res.status(200).json({ message: 'Notification already sent for the given plant, material, and date' });
    }

    // Create a new notification and save it to the database
    const notification = new Notification({ plant, material, date });
    await notification.save();

    // Send a notification to the plant
    // Your code to send a notification goes here

    return res.status(200).json({ message: 'Notification sent' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
