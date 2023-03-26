import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config.js";

export const isLoggedIn = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    const user = jwt.verify(accessToken, jwtSecret);

    if (!accessToken || !user) {
      return res.status(401).send({ error: "User unauthorised" }).end();
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(401).send({ error: "Invalid Access Token" }).end();
  }
};
