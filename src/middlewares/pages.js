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

module.exports = {
    isAuthorizedPager,
    isGuestPager,
};