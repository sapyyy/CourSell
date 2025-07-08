const mongoose = require("mongoose");
const { mongoURI } = require("../config");

// connecting to the db
mongoose.connect(mongoURI);

// defining schemas for admin, user and course
const Admin = mongoose.model("Admin", {
  username: String,
  password: String,
});

const User = mongoose.model("User", {
  username: String,
  password: String,
  // creating a rel with the Course schema/table
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Course = mongoose.model("Course", {
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

module.exports = {
  Admin,
  User,
  Course,
};
