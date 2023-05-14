const demandOrder = require('../Models/demand_order');

const email = require('../email');

exports.getAllDemandOrders = async (req, res) => {
  try {
    const demandOrders = await DemandOrder.find().populate('supplier_id');
    res.status(200).json(demandOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDemandOrder = async (req, res) => {
  const demandOrder = new DemandOrder({
    plant: req.body.plant,
    material: req.body.material,
    demand_date: req.body.demand_date,
    quantity: req.body.quantity,
    supplier_id: req.body.supplier_id
  });

  try {
    const newDemandOrder = await demandOrder.save();
    // Call the sendEmail function passing in the necessary parameters
    const supplierEmail = req.body.supplier_email;
    const materialName = req.body.material;
    const demandDate = req.body.demand_date;
    const plantName = req.body.plant;
    email.sendEmail(supplierEmail, materialName, demandDate, plantName);
    res.status(201).json(newDemandOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDemandOrderById = async (req, res) => {
  try {
    const demandOrder = await DemandOrder.findById(req.params.id).populate('supplier_id');
    if (!demandOrder) {
      res.status(404).json({ message: 'Demand order not found' });
    } else {
      res.status(200).json(demandOrder);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDemandOrder = async (req, res) => {
  try {
    const demandOrder = await DemandOrder.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('supplier_id');
    if (!demandOrder) {
      res.status(404).json({ message: 'Demand order not found' });
    } else {
      res.status(200).json(demandOrder);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteDemandOrder = async (req, res) => {
  try {
    const demandOrder = await DemandOrder.findByIdAndDelete(req.params.id);
    if (!demandOrder) {
      res.status(404).json({ message: 'Demand order not found' });
    } else {
      res.status(200).json({ message: 'Demand order deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const DemandOrder = require('../models/DemandOrder');
// const email = require('../email');


// exports.getAllDemandOrders = async (req, res) => {
//   try {
//     const demandOrders = await DemandOrder.find().populate('supplier_id');
//     res.status(200).json(demandOrders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createDemandOrder = async (req, res) => {
//   const demandOrder = new DemandOrder({
//     plant: req.body.plant,
//     material: req.body.material,
//     demand_date: req.body.demand_date,
//     quantity: req.body.quantity,
//     supplier_id: req.body.supplier_id
//   });

//   try {
//     const newDemandOrder = await demandOrder.save();
//     res.status(201).json(newDemandOrder);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.getDemandOrderById = async (req, res) => {
//   try {
//     const demandOrder = await DemandOrder.findById(req.params.id).populate('supplier_id');
//     if (!demandOrder) {
//       res.status(404).json({ message: 'Demand order not found' });
//     } else {
//       res.status(200).json(demandOrder);
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateDemandOrder = async (req, res) => {
//   try {
//     const demandOrder = await DemandOrder.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('supplier_id');
//     if (!demandOrder) {
//       res.status(404).json({ message: 'Demand order not found' });
//     } else {
//       res.status(200).json(demandOrder);
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.deleteDemandOrder = async (req, res) => {
//   try {
//     const demandOrder = await DemandOrder.findByIdAndDelete(req.params.id);
//     if (!demandOrder) {
//       res.status(404).json({ message: 'Demand order not found' });
//     } else {
//       res.status(200).json({ message: 'Demand order deleted' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
