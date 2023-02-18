const { UserModel } = require("../models/users.model");

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    console.log('User Not Found');
    return res.redirect('/');
  }
  if (user.password !== password) {
    console.log('Passwords Dont Match');
    return res.redirect('/');
  }
  req.session.user = user;
  req.session.save(err => {
    if (err) console.log('session error => ', err);
    else res.redirect('/profile');
  });
};

const registerController = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.redirect('/');
    }
    const newuser = await UserModel.create(req.body);
    req.session.user = newuser;
    req.session.save(err => {
      if (err) console.log('session error => ', err);
      else {
        res.redirect('/profile')
      };
    });
  }
  catch(error) {
    console.log(error);
  }
};

const logoutController = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    else {
      res.clearCookie('start-solo');
      res.redirect('/');
    }
  })
};

module.exports = {
  loginController,
  registerController,
  logoutController,
}