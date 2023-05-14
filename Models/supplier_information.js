const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  supplier_name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true 
  },
  iso_code: { 
    type: String, 
    required: true 
  },
  latitude: { 
    type: Number, 
    required: true 
  },
  longitude: { 
    type: Number, 
    required: true 
  },
  material: { 
    type: String, 
    required: true 
  }
});

SupplierSchema.statics.createSupplier = async function(supplierData) {
  const supplier = new this(supplierData);
  await supplier.save();
  return supplier;
};

module.exports = mongoose.model('Supplier', SupplierSchema);
