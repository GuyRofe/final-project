const buyerLoginPage = (req, res) => {
    return res.render("buyer-login", {});
}

const buyerRegistrationPage = (req, res) => {
    return res.render("buyer-registration", {});
}

const sellerLoginPage = (req, res) => {
    return res.render("seller-login", {});
}

const sellerRegistrationPage = (req, res) => {
    return res.render("seller-registration", {});
}

const homePage = (req, res) => {
    return res.render("index", {
        role: req.session.user.role,
        username: req.session.user.username,
    });
}

const accountPage = (req, res) => {
    return res.render("account", {
        role: req.session.user.role,
        username: req.session.user.username,
    });
}

module.exports = {
    buyerLoginPage,
    buyerRegistrationPage,
    sellerLoginPage,
    sellerRegistrationPage,
    homePage,
    accountPage
};