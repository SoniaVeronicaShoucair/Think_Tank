const StockInformation = require('../models/stockinformation/StockInformation');

exports.create = function(req, res) {
  const newStockInformation = new StockInformation(req.body);
  newStockInformation.save(function(err, stockInformation) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(stockInformation);
    }
  });
};

exports.read = function(req, res) {
  StockInformation.findById(req.params.id, function(err, stockInformation) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(stockInformation);
    }
  });
};

exports.update = function(req, res) {
  StockInformation.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, stockInformation) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(stockInformation);
    }
  });
};

exports.delete = function(req, res) {
  StockInformation.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json({ message: 'Stock Information deleted successfully' });
    }
  });
};

exports.list = function(req, res) {
  StockInformation.find({}, function(err, stockInformation) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(stockInformation);
    }
  });
};

exports.getStockInformation = function(req, res) {
  const material = req.query.material;

  StockInformation.find({ material: material }, function(err, stockInformation) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(stockInformation);
    }
  });
};
