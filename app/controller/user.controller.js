class UserController {
  userProfile = (req, res) => {
    const { email, name } = req.user;

    res.json({
      status: true,
      result: { email, name },
      msg: "Profile fetched successfully",
    });
  };
}
module.exports = UserController;
