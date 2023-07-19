const removeCookie = (req, res, statusCode, success, message) => {
  const token = req.cookies.token;

  res
    .status(statusCode)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({
      success,
      message,
    });
};

export default removeCookie;
