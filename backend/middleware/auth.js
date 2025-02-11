import { User } from "../models/User.js";

// 인증 처리
let auth = (req, res, next) => {
  let token = req.cookies.accessToken;
  User.findByToken(token, (err, user) => {
    if (err) {
      console.error("Auth middleware error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ isAuth: false, success: false, message: "Unauthorized" });
    }

    req.token = token;
    req.user = user;
    next();
  });
};

export { auth };
