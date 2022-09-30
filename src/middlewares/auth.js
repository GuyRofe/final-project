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

const isUser = (req, res, next) => {
    if (req.session.user && req.session.user.role !== 2) {
        return next();
    }

    return res.status(401).send({
        message: 'Only for users'
    });
}

module.exports = {
    isAuthorized,
    isGuest,
    isUser
};