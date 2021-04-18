const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const tryCatch = require("../utils/tryCatch");
const errorClass = require("../utils/errorClass");
const cookie = require("cookies");

const jwttoken = (data) => {
  return jwt.sign({ id: data.id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.signup = tryCatch(async (req, res, next) => {
  console.log(req.body);
  // const { firstname, lastname, , password, email } = req.body;
  const newUser = await User.create(req.body);
  const token = jwttoken(newUser);
  res.cookie("jwt", token, {
    expire: process.env.EXPIRES_IN,
    httpOnly: true,
    secure: false,
  });

  return res.status(201).json({
    status: "success",
    token,
    user: newUser,
  });
});

exports.signupAsAdmin = tryCatch(async (req, res, next) => {
  // const { firstname, lastname, , password, email } = req.body;
  const newUser = await User.create(req.body);
  newUser.isAdmin = true;
  await newUser.save();
  console.log(newUser);
  const token = jwttoken(newUser);
  res.cookie("jwt", token, {
    expire: process.env.EXPIRES_IN,
    httpOnly: true,
    secure: false,
  });

  return res.status(201).json({
    status: "success",
    token,
    admin: newUser,
  });
});

exports.signin = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(req.body);

  if (!email || !password) {
    return next(new errorClass("please enter email and password", 401));
  }
  // const user = await User.findOne({ $or:[{ email:nameOREmail,username:nameOREmail }]}).select("+password");
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user || !(await user.checkPassword(user.password, password))) {
    return next(new errorClass("Invalid username or password", 401));
  }
  const token = jwttoken(user);
  res.cookie("jwt", token, {
    expire: process.env.EXPIRES_IN,
    httpOnly: true,
    secure: false,
  });

  return res.status(200).json({
    status: "success",
    token,
    user: user,
  });
});

exports.protect = tryCatch(async (req, res, next) => {
  console.log(req.headers);

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.params) {
    token = req.params.token;
  }

  if (!token) {
    return next(new errorClass("please!log in or check your token", 401));
  }

  const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

  const freshUser = await User.findById(verifiedToken.id);
  if (!freshUser) {
    return next(new errorClass("this user is no longer exist", 401));
  }
  req.user = freshUser;
  next();
});
exports.isLoogedIn = tryCatch(async (req, res, next) => {
  let token;
  if (req.params.token) {
    token = req.params.token;
  }
  if (!token) {
    return next();
  }

  const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
  const freshUser = await User.findById(verifiedToken.id);
  if (!freshUser) {
    return next();
  }
  req.user = freshUser;
  next();
});

exports.logout = tryCatch(async (req, res, next) => {
  return res.cookie("jwt", "logout", {
    httpOnly: true,
    expire: 1500,
    secure: false,
  });
});
