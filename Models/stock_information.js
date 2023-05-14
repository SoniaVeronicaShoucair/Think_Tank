const mongoose = require('mongoose');

const StockInformationSchema = new mongoose.Schema({
  plant: { 
    type: String, 
    required: true 
  },
  material: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  remaining_stock: { 
    type: Number, 
    required: true 
  }
});

StockInformationSchema.statics.getStockInformationByPlantAndMaterial = function(plant, material) {
  return this.findOne({ plant: plant, material: material }).exec();
};

module.exports = mongoose.model('StockInformation', StockInformationSchema);
