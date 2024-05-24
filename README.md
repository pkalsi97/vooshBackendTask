
# Node.js Authentication and Profile Management System
![Alt Text](https://drive.google.com/uc?export=view&id=18MO6t9PqG1mvzkqbHHN9L0PeX2gEKUN_)
## Features

- User Registration and Login
- Password Encryption with bcrypt
- JWT-based Authentication
- GitHub OAuth Integration
- Profile Management (update name, bio, phone, email, password, photo, and profile visibility)
- View User Profiles (public and private)
- Admin Privileges to View All Profiles
- Secure Database Connection with SSL

## Folder Structure

```
/my-project
├── controllers
│   ├── authController.js
│   ├── pageController.js
│   └── profileController.js
├── middleware
│   └── authenticateToken.js
├── models
│   └── userModel.js
├── public
│   └── css
│       └── style.css
├── routes
│   ├── authRoutes.js
│   ├── pageRoutes.js
│   └── profileRoutes.js
├── utils
│   ├── database.js
│   └── passport-setup.js
├── views
│   ├── dashboard.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   ├── register.ejs
│   ├── userProfile.ejs
│   └── profiles.ejs
├── .env
├── app.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/my-project.git
   cd my-project
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file with the following content:
   ```env
   PORT=3000
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=your_database_port
   SSL_MODE=REQUIRED
   SESSION_SECRET=your_session_secret
   JWT_SECRET=your_jwt_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. Run the application:
   ```sh
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`.

## Usage

### Authentication

- **Register**: Access the register page at `/register`.
- **Login**: Access the login page at `/login`.

### Profile Management

- **View Profile**: Access your profile at `/profile`.
- **Update Profile**: Update your profile information on the same page.
- **View All Profiles**: Admin users can view all profiles at `/profiles`.

### GitHub OAuth

- **Login/Register with GitHub**: Use the GitHub OAuth buttons on the login and register pages to authenticate via GitHub.

## Code Overview

### `controllers/`

- **authController.js**: Handles user registration and login, including GitHub OAuth.
- **pageController.js**: Renders the login, register, and dashboard pages.
- **profileController.js**: Manages user profile updates and viewing.

### `middleware/`

- **authenticateToken.js**: Middleware for JWT authentication.

### `models/`

- **userModel.js**: Sequelize model for the User table.

### `routes/`

- **authRoutes.js**: Routes for authentication (`/register`, `/login`, `/auth/github`, `/auth/github/callback`).
- **pageRoutes.js**: Routes for rendering pages (`/login`, `/register`, `/dashboard`).
- **profileRoutes.js**: Routes for profile management (`/profile`, `/user/:id`, `/profiles`).

### `utils/`

- **database.js**: Sequelize database configuration.
- **passport-setup.js**: Passport.js configuration for local and GitHub strategies.

### `views/`

- **dashboard.ejs**: Dashboard page for authenticated users.
- **login.ejs**: Login page.
- **profile.ejs**: Profile page for viewing and updating user profiles.
- **register.ejs**: Registration page.
- **userProfile.ejs**: Individual user profile page.
- **profiles.ejs**: Page for viewing all user profiles (admin only).

### `app.js`

Main application entry point. Sets up Express.js server, connects to the database, and initializes routes and middleware.

## Dependencies

- Express.js
- Sequelize
- MySQL2
- EJS
- bcryptjs
- jsonwebtoken
- passport
- passport-local
- passport-github
- dotenv
- body-parser


