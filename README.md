# Tech Blog App

Tech Blog App is a full-stack web application built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **Vanilla JavaScript**. for creating, reading, updating, and deleting blogs. Users can register, log in, manage their profiles, and write or edit their own blog posts. The platform features a modern UI with search, tags, and date formatting for posts.

Deployed on Render: [https://tech-blog-app-wwk6.onrender.com/](https://tech-blog-app-wwk6.onrender.com/)

---

## Features

- User authentication (register, login, logout), passwords are hashed with bcrypt
- Password change and profile deletion
- **CRUD operations** for blogs (Create, Read, Update, Delete)
- Display the latest 4 blogs on the homepage
- Blog tags and search functionality
- **User session management** with cookies
- Frontend built using **EJS templates** and vanilla JS
- Responsive UI
- Date formatting using dayjs

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS, Vanilla JavaScript
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Passport.js, bcrypt, Middleware for validation and error handling
- **Deployment:** Render.com

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DariaSK18/tech-blog-app.git
cd tech-blog-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add:

```bash
MONGO_URI=your_mongodb_connection_string
COOKIE_SECRET=your_random_cookie_secret
PORT=3000
```

4. Start the server:

```bash
npm start
```

5. Open your browser and go to http://localhost:3000

## Future Improvements

- Add pagination for blog posts
- Enable image uploads for blogs
- Comments for blogs

## Author

Daria Steblovska

- Contact: [darias1896.96@gmail.com](mailto:darias1896.96@gmail.com)