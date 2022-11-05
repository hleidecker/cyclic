//const User = require("../models/User");

exports.getAllUsers = async (req, res, next) => {
  try {
    //const [users, _] = await User.findAll();

    res.status(200).json({ count: users.length, users });
  } catch (error) {
    next(error);
  }
};

exports.createNewUser = async (req, res, next) => {
  try {
    let { sub } = req.sub;
    //let user = new User(sub);
    //user = await user.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};

exports.getUserBySub = async (req, res, next) => {
  try {
    let userSub = req.params.sub;

    //let [user, _] = await User.findBySub(userSub);

    res.status(200).json({ user: user[0] });
  } catch (error) {
    next(error);
  }
};