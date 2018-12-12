module.exports = ({ router, auth, models }) => {
  router.get("/signup", function(req, res) {
    const testUser = new models.User({
      email: "admin",
      password: "demo"
    });

    res.status(200).json(testUser.save());
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    models.User.findByEmail(email)
      .then(user =>
        !user ? Promise.reject(new Error("User not found.")) : user
      )
      .then(user => auth.checkUserAuthentication(password, user))
      .then(user => {
        res.status(200).json({
          success: true,
          token: auth.createJWToken({ id: user.id, email: user.email })
        });
      })
      .catch(err => {
        res
          .status(401)
          .json({ message: err || "Invalid user/password given." });
      });
  });

  return router;
};
