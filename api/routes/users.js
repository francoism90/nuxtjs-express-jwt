module.exports = ({ router, auth }) => {
  router.all("*", auth.verifyJWTMiddleware);

  router.get("/", (req, res) => {
    // reg.user can be used to obtain token data

    res.status(200).json({
      success: true,
      data: "Super secret data!"
    });
  });

  return router;
};
