const { Admin } = require("../db/mongo");
const { Course } = require("../db/mongo");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { jwtSecret } = require("../config");

// route to handle signup for admin
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingAdmin = await Admin.findOne({ username, password });

  if (existingAdmin) {
    res.status(400).json({ status: "Admin already exist" });
  } else {
    await Admin.create({ username: username, password: password });
    res.status(200).json({ status: "Admin created successfully" });
  }
});

// route to handle signin for admin
router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await Admin.findOne({ username, password });

  if (user) {
    const token = jwt.sign({ username: username }, jwtSecret);

    res.status(200).json({ token: token });
  } else {
    res.status(400).json({ status: "Admin not found" });
  }
});

// route to create courses for the admin
router.post("/courses", adminMiddleware, async (req, res) => {
  const bearer = req.headers.authorization;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  // validate the bearer token
  const token = jwt.verify(bearer, jwtSecret);

  if (token) {
    const newCourse = await Course.create({
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
    });

    res.status(200).json({ status: "Course created", courseId: newCourse._id });
  } else {
    res.status(400).send("jwt error");
  }
});

// route get all the courses of the admin
router.get("/courses", adminMiddleware, async (req, res) => {
  const response = await Course.find({});
  res.status(200).json({ course: response });
});

module.exports = router;
