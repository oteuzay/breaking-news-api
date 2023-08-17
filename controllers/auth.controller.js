const authService = require("../services/auth.service");

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const signIn = await authService.signIn(email, password);

    res.status(200).json({
      token: signIn,
    });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const author = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
    };

    const createAuthor = await authService.signUp(author);

    res.status(201).json({
      message: "Author successfully created.",
      author: createAuthor,
    });
  } catch (err) {
    next(err);
  }
};
