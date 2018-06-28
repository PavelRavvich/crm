module.exports.getAll = (req, res) => {
    res.status(200).json({
        massage: 'getAll'
    })
};

module.exports.getById = (req, res) => {
    res.status(200).json({
        massage: 'getById'
    })
};

module.exports.remove = (req, res) => {
    res.status(200).json({
        massage: 'remove'
    })
};

module.exports.create = (req, res) => {
    res.status(200).json({
        massage: 'create'
    })
};

module.exports.update = (req, res) => {
    res.status(200).json({
        massage: 'patch'
    })
};