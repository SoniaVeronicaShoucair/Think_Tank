const express = require('express');
const router = express.Router();
const supplierController = require('../Controller/supplier_controller');

router.get('/', supplierController.getAllSuppliers);

router.get('/:id', supplierController.getSupplierById);

router.post('/', supplierController.createSupplier);

router.put('/:id', supplierController.updateSupplier);

router.delete('/:id', supplierController.deleteSupplier);

//router.get('/', supplierController.home);
router.get('/:supplier_id/materials/:material_id/stock', supplierController.getStockInfo);



module.exports = router;
