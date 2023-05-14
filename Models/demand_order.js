const mongoose = require('mongoose');

const DemandOrderSchema = new mongoose.Schema({
  plant: { 
    type: String, 
    required: true 
  },
  material: { 
    type: String, 
    required: true 
  },
  demand_date: { 
    type: Date, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  supplier_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Supplier', 
    required: true 
  }
});

module.exports = mongoose.model('DemandOrder', DemandOrderSchema);
