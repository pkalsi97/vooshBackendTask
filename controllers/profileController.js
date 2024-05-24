const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getProfilePage = async (req, res) => {
    res.render('profile', { user: req.user });
};

exports.updateUserProfile = async (req, res) => {
    const { name, bio, phone, email, password, photoUrl, profileVisibility } = req.body;
    try {
        const user = await UserModel.findByPk(req.user.id);
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 12);
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (phone) user.phone = phone;
        if (photoUrl) user.photoUrl = photoUrl;
        if (profileVisibility) user.profileVisibility = profileVisibility;
        
        await user.save();
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
};

exports.viewUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        if (user.profileVisibility === 'private' && req.user.role !== 'admin' && req.user.id !== user.id) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        res.render('userProfile', { user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve user profile' });
    }
};

exports.viewAllUserProfiles = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        if (req.user.role === 'admin') {
            return res.render('profiles', { users });
        }

        const publicUsers = users.filter(user => user.profileVisibility === 'public');
        res.render('profiles', { users: publicUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve profiles' });
    }
};
