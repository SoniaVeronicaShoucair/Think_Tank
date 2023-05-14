const express = require('express');
const mongoose = require('mongoose');
const supplierRoutes = require('./Routes/supplier_route');
const demandRoutes = require('./Routes/demandorder_route');
const notificationRoutes = require('./Routes/notification_route');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://soniaveronica:Sonia1812@cluster0.hjn58hb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Enable CORS for all routes
app.use(cors());

// Define routes
app.use(express.json());
app.use('/api/suppliers', supplierRoutes);
app.use('/api/demand-orders', demandRoutes);
app.use('/api/notifications', notificationRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
