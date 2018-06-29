module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        massage: error.massage ? error.massage : error
    })
};