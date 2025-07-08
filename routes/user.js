const { User } = require("../db/mongo");
const { Course } = require("../db/mongo");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const router = Router();
const { jwtSecret } = require("../config");

// router to signup the user
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({ username, password });

  if (existingUser) {
    res.status(400).json({ status: "User already exist" });
  } else {
    await User.create({ username: username, password: password });
    res.status(200).json({ status: "User created successfully" });
  }
});

// router to signin the user
router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username, password });

  if (user) {
    const token = jwt.sign({ username: username }, jwtSecret);

    res.status(200).json({ token: token });
  } else {
    res.status(400).json({ status: "Admin not found" });
  }
});

// router to get all the courses that is globally available
router.get("/courses", async (req, res) => {
  const response = await Course.find({});
  res.status(200).json({ response });
});

// router to implement buy logic
router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;

  await User.updateOne(
    { username: req.username },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  res.status(200).json({ status: "Purchase Successfull" });
});

// router to get information about the purchases courses
router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.username;

  const user = await User.findOne({ username });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({ courses: courses });
});

module.exports = router;
