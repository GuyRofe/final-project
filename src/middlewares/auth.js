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

const isSeller = (req, res, next) => {
    if (req.session.user && req.session.user.role === 1) {
        return next();
    }

    return res.status(401).send({
        message: 'Only for sellers'
    });
}

const isBuyer = (req, res, next) => {
    if (req.session.user && req.session.user.role === 0) {
        return next();
    }

    return res.status(401).send({
        message: 'Only for buyers'
    });
}

module.exports = {
    isAuthorized,
    isGuest,
    isUser,
    isSeller,
    isBuyer
};