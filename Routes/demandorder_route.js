const express = require('express');
const router = express.Router();
const demandController = require('../Controller/demandorder_controller');


router.get('/', demandController.getAllDemandOrders);


router.get('/:id', demandController.getDemandOrderById);


router.post('/', demandController.createDemandOrder);


router.put('/:id', demandController.updateDemandOrder);


router.delete('/:id', demandController.deleteDemandOrder);

module.exports = router;
