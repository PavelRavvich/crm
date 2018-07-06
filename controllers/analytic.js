const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');


module.exports.overview = async (req, res) => {

    try {

        const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
        const ordersMap = getOrdersMap(allOrders);
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];

        // Amount orders yesterday.
        const yesterdayOrdersNumber = yesterdayOrders.length;

        // Amount orders.
        const totalOrdersNumber = allOrders.length;

        // Amount days.
        const daysNumber = Object.keys(ordersMap).length;

        // Orders per day.
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);

        // Percent ((заказов вчера / кол-во заказов в день) - 1) * 100
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2);

        // Revenue whole.
        const totalRevenue = calculateRevenue(allOrders);

        // Revenue day.
        const revenuePerDay = totalRevenue / daysNumber;

        // Revenue yesterday.
        const yesterdayRevenue = calculateRevenue(yesterdayOrders);

        // Percent of revenue.
        const revenuePercent = (((yesterdayRevenue / revenuePerDay) - 1) * 100).toFixed(2);

        // Compare revenue.
        const compareRevenue = (yesterdayRevenue - revenuePerDay).toFixed(2);

        // Compare amount orders.
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);


        res.status(200).json({
            gain: {
                percent: Math.abs(+revenuePercent),
                compare: Math.abs(+compareRevenue),
                yesterday: +yesterdayRevenue,
                isHigher: revenuePercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: ordersPercent > 0
            }
        });

    } catch (e) {
        errorHandler(res, e);
        console.log(e)
    }

};

module.exports.analytic = (req, res) => {

};

// function word important!!! Not ()=> !
function getOrdersMap(allOrders) {
    const daysOrders = {};

    allOrders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY');
        if (date === moment().format('DD.MM.YYYY')) {
            return;
        }

        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }

        daysOrders[date].push(order);

    });

    return daysOrders;
}

function calculateRevenue(allOrders) {

    return allOrders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity;
        }, 0);
        return total += orderPrice;
    }, 0);
}