# CourSell - Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

_A robust and scalable backend API for managing online courses and sales. CourSell provides endpoints for user authentication, course creation, enrollment, and sales tracking. It uses JSON Web Tokens (JWT) for secure authentication and stores all data persistently in MongoDB._

## ⚙️ Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** NoSQL database for flexible data storage.
- **Mongoose:** MongoDB object data modeling (ODM) for Node.js.

## 🛠️ Installation

Follow these steps to get CourSell up and running on your local machine.

### ✅ Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm (comes with Node.js)

### 🔗 API Endpoints

All API endpoints are prefixed with `/`.

#### Admin Routes

These routes are for administrative purposes, such as creating and managing courses. A valid JSON Web Token (JWT) is required in the `Authorization` header for protected routes.

---

##### `POST /admin/signup`

Creates a new admin account.

- **Request Body:**
  ```json
  {
    "username": "admin_username",
    "password": "admin_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Admin created successfully"
  }
  ```

---

##### `POST /admin/signin`

Logs in an admin account and returns a JWT.

- **Request Body:**
  ```json
  {
    "username": "admin_username",
    "password": "admin_password"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

---

##### `POST /admin/courses`

Creates a new course.

- **Headers:**
  - `Authorization`: `your-jwt-token`
- **Request Body:**
  ```json
  {
    "title": "New Course Title",
    "description": "A comprehensive description of the new course.",
    "price": 199.99,
    "imageLink": "[https://example.com/course-image.jpg](https://example.com/course-image.jpg)"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Course created successfully",
    "courseId": "newly-created-course-id"
  }
  ```

---

##### `GET /admin/courses`

Returns a list of all courses created by the admin.

- **Headers:**
  - `Authorization`: `your-jwt-token`
- **Response:**
  ```json
  {
    "courses": [
      {
        "id": "course-id-1",
        "title": "Course Title 1",
        "description": "Description of course 1.",
        "price": 99.99,
        "imageLink": "[https://example.com/image1.jpg](https://example.com/image1.jpg)",
        "published": true
      },
      {
        "id": "course-id-2",
        "title": "Course Title 2",
        "description": "Description of course 2.",
        "price": 149.99,
        "imageLink": "[https://example.com/image2.jpg](https://example.com/image2.jpg)",
        "published": false
      }
    ]
  }
  ```

#### User Routes

These routes are for users to interact with the platform, such as signing up, Browse courses, and making purchases.

---

##### `POST /users/signup`

Creates a new user account.

- **Request Body:**
  ```json
  {
    "username": "user_username",
    "password": "user_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created successfully"
  }
  ```

---

##### `POST /users/signin`

Logs in a user account and returns a JWT.

- **Request Body:**
  ```json
  {
    "username": "user_username",
    "password": "user_password"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

---

##### `GET /users/courses`

Lists all available courses.

- **Headers:**
  - `Authorization`: `your-jwt-token`
- **Response:**
  ```json
  {
    "courses": [
      {
        "id": "course-id-1",
        "title": "Course Title 1",
        "description": "Description of course 1.",
        "price": 99.99,
        "imageLink": "[https://example.com/image1.jpg](https://example.com/image1.jpg)",
        "published": true
      },
      {
        "id": "course-id-2",
        "title": "Course Title 2",
        "description": "Description of course 2.",
        "price": 149.99,
        "imageLink": "[https://example.com/image2.jpg](https://example.com/image2.jpg)",
        "published": true
      }
    ]
  }
  ```

---

##### `POST /users/courses/:courseId`

Purchases a course. Replace `:courseId` in the URL with the actual ID of the course.

- **Headers:**
  - `Authorization`: `your-jwt-token`
- **Response:**
  ```json
  {
    "message": "Course purchased successfully"
  }
  ```

---

##### `GET /users/purchasedCourses`

Lists all courses purchased by the authenticated user.

- **Headers:**
  - `Authorization`: `your-jwt-token`
- **Response:**
  ```json
  {
    "purchasedCourses": [
      {
        "id": "course-id-1",
        "title": "Purchased Course Title 1",
        "description": "Description of purchased course 1.",
        "price": 99.99,
        "imageLink": "[https://example.com/image1.jpg](https://example.com/image1.jpg)",
        "published": true
      }
    ]
  }
  ```

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sapyyy/CourSell.git
    cd CourSell
    ```

2.  **Install dependencies:**

    ```bash
    npm install express
    npm install jsonwebtoken
    npm install mongoose
    ```

3.  **Create a `config` file:**
    In the root directory of the project, create a file named `config.js` and add the following environment variables. Replace the placeholder values with your actual credentials.

    ```env
    module.exports = {
    jwtSecret: "your_random_password.",
    mongoURI: "your_mongodb_uri_here.",
    PORT: "any_port_you_like_in_here.",
    };
    ```

    - `PORT`: The port your Express app will run on.
    - `mongoURI`: Your MongoDB connection string.
    - `jwtSecret`: A strong, random string used to sign and verify your JWTs. **Keep this secret!**

4.  **Run the application:**

    ```bash
    node index.js
    ```

    The API will now be running at `http://localhost:5000` (or whatever port you specified in your `config.js` file).

5.  **Completed:**
    Now you have your CourSell API running on your local machine. Give this repo a ⭐ if this was useful. Thanks!
