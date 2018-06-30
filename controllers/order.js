const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

// (GET) localhost:5000/api/order?offset=28&limit=5
module.exports.getAll = async (req, res) => {

    const query = {
        user: req.user.id
    };

    // Fill filter start date.
    if (req.query.start) {
        query.date = {
            // $gte means >= ${date}.
            $gte: req.query.start
        }
    }

    // Fill filter end date.
    if (req.query.end) {
        if (!query.date) {
            query.date = {};
        }

        // $lte means <= ${date}.
        query.date['$lte'] = req.query.end;
    }

    // Fill filter by order.
    if (req.query.order) {
        query.order = +req.query.order;
    }

    try {

        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit);


        res.status(200).json(orders);

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async (req, res) => {
    try {
        // .sort({date: -1}) is sorting, find last order by date.
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1});


        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = new Order({
            user: req.user.id,
            list: req.body.list,
            order: maxOrder + 1,
        });
        await order.save();

        res.status(200).json(order);

    } catch (e) {
        errorHandler(res, e);
    }
};