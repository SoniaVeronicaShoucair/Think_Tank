const Supplier = require('../Models/Supplier_Information');



exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.createSupplier = async (req, res) => {
  const supplier = new Supplier(req.body);
  try {
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    supplier.supplier_name = req.body.supplier_name;
    supplier.email = req.body.email;
    supplier.country = req.body.country;
    supplier.iso_code = req.body.iso_code;
    supplier.latitude = req.body.latitude;
    supplier.longitude = req.body.longitude;
    supplier.material = req.body.material;

    const updatedSupplier = await supplier.save();
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// exports.deleteSupplier = async (req, res) => {
//   try {
//     const supplier = await Supplier.findById(req.params.id);
//     if (!supplier) {
//       return res.status(404).json({ message: 'Supplier not found' });
//     }
//     await supplier.remove();
//     res.status(200).json({ message: 'Supplier deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }
exports.deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.deleteOne({ _id: req.params.id });
    if (deletedSupplier.deletedCount === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.create = async function(req, res) {
  try {
    const supplier = await Supplier.createSupplier(req.body);
    res.status(201).json({ message: 'Supplier created successfully', supplier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getStockInfo = async (req, res) => {
  try {
    const supplierId = req.params.supplier_id;
    const materialId = req.params.material_id;
    const supplier = await Supplier.findById(supplierId);
    const material = supplier.materials.id(materialId);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    const stockInfo = {
      plant: material.plant,
      material: material.material,
      stock: material.stock,
      unit: material.unit
    };
    res.json(stockInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
