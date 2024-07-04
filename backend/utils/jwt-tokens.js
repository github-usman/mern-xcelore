import { cookieExpire } from "../config/env.config.js";
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const maxAge = cookieExpire * 24 * 60 * 60 * 1000;
  // options for cookie
  const options = {
    maxAge: maxAge,
    httpOnly: true,
    secure: true,
    sameSite: 'None', 

  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
