const jwt = require("jsonwebtoken");

const secret = "mysecretsdontmess";
const expiration = "6h";

module.exports = {
  authMiddleware(req, res, next) {
    // Accept token from ALL possible locations
    let token =
      req.headers.authorization ||
      req.headers.Authorization ||
      req.body.token ||
      req.query.token;

    // If no token -> exit early
    if (!token) {
      console.log("🚫 No token found in request");
      return res.status(401).json({ message: "No token provided" });
    }

    // If token comes as "Bearer <token>"
    if (token.startsWith("Bearer ")) {
      token = token.split(" ").pop().trim();
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });

      // Attach user data to request
      req.user = data;

      next();
    } catch (err) {
      console.log("❌ Invalid token:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  },

  signToken({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
