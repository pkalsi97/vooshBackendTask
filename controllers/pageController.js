exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.getDashboardPage = (req, res) => {
    res.render('dashboard', { user: req.user });
};
