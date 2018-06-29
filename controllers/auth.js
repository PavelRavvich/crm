const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports.login = (req, res) => {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
};

module.exports.register = async (req, res) => {

    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // User already exist throw exception.
        res.status(409).json({
            massage: 'User already exist. Try another email.'
        });
    } else {
        // Create new user.

        const sold = bcrypt.genSaltSync(10);
        const password = req.body.password;


        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, sold)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            console.log(e);
        }
    }

};

