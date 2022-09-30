const isAuthorized = (req, res, next) => {
    if (req.session.user) {
        return next();
    }

    return res.status(401).send({
        message: 'Unauthorized'
    });
}

const isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    return res.status(401).send({
        message: 'Only for guest'
    });
}

module.exports = {
    isAuthorized,
    isGuest
};