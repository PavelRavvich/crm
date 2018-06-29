const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');


module.exports.login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const candidate = await User.findOne({email: email});

    if (candidate) {
        // User is exist verify password.
        const passwordResult = bcrypt.compareSync(password, candidate.password);
        if (passwordResult) {
            // Token generation.
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                massage: 'Wrong email or password'
            });
        }
    } else {
        // User does not exist.
        res.status(404).json({
            massage: 'User not found'
        });
    }

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

