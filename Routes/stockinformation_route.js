const express = require('express');
const router = express.Router();
const stockInformationController = require('../Controller/stockinformation_controller');

// Route for retrieving stock information of a given plant for a given material
router.get('/:plant/:material', stockInformationController.getStockInformationByPlantAndMaterial);

// CRUD routes
router.post('/', stockInformationController.create);
router.get('/:id', stockInformationController.read);
router.put('/:id', stockInformationController.update);
router.delete('/:id', stockInformationController.delete);
router.get('/', stockInformationController.list);

module.exports = router;
