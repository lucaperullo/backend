import jwt from "jsonwebtoken";

export default async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = await jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: true,
      message: "Your session is not valid",
      data: error,
    });
  }
}
