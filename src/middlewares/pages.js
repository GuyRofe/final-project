const isAuthorizedPager = (req, res, next) => {
    if (req.session.user) {
        return next();
    }

    return res.redirect('/buyer-login');
}

const isGuestPager = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    return res.redirect('/');
}

const isUserPager = (req, res, next) => {
    if (req.session.user && req.session.user.role !== 2) {
        return next();
    }

    return res.redirect('/');
}

const isSellerPager = (req, res, next) => {
    if (req.session.user && req.session.user.role === 1) {
        return next();
    }

    return res.redirect('/');
}

module.exports = {
    isAuthorizedPager,
    isGuestPager,
    isUserPager,
    isSellerPager
};