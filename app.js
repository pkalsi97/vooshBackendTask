require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRouter = require('./routes/authRoutes');
const pageRouter = require('./routes/pageRoutes');
const profileRouter = require('./routes/profileRoutes');

const { sequelize } = require('./models');
require('./utils/passport-setup');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', (req, res) => res.redirect('/login'));

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/', profileRouter);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => console.error('Failed to sync db: ' + err.message));
