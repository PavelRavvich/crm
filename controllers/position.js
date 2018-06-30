const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async (req, res) => {
    try {

        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        });

        res.status(200).jason(positions);

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {

        const position = new Position({
            name: req.body.name,
            coast: req.body.coast,
            category: req.body.category,
            user: req.user.id
        });

        const saved = await position.save();
        res.status(201).json(saved);

    } catch (e) {
        errorHandler(res, e);
    }
};


module.exports.remove = async (req, res) => {
    try {

        await Position.remove({_id: req.params.id});

        res.status(200).json({
            massage: 'Position has been deleted'
        });

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async (req, res) => {
    try {

        const updated = await Position.findOneAndUpdate(
            {
                // Search conditions.
                _id: req.params.id
            },
            {
                // New state for update object.
                $set: req.body
            },
            {
                // Return updated object instead old. Default false.
                new: true
            });

        res.status(200).json(updated);

    } catch (e) {
        errorHandler(res, e);
    }
};