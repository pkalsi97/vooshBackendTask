const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

function generateAuthToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

exports.registerUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await UserModel.create({
            email,
            password: hashedPassword
        });
        const token = generateAuthToken(newUser);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Email already exists or registration failed' });
    }
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ success: false, message: 'Authentication failed', info });
        }
        req.login(user, { session: false }, (error) => {
            if (error) {
                return res.send(error);
            }
            const token = generateAuthToken(user);
            res.json({ success: true, token });
        });
    })(req, res, next);
};

exports.githubAuthentication = passport.authenticate('github');

exports.githubAuthCallback = (req, res) => {
    passport.authenticate('github', (err, user, info) => {
        if (err || !user) {
            return res.redirect('/login');
        }
        const token = generateAuthToken(user);
        res.redirect(`/dashboard?token=${token}`);
    })(req, res);
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.getDashboardPage = (req, res) => {
    res.render('dashboard', { user: req.user });
};
