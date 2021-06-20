import express from "express";
import safe from "../../guard/auth.js";
import userRoutes from "./profile/userRoutes.js";
import postRoutes from "./post/postRoutes.js";
import verifyToken from "../../core/guardCore.js";

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by jwt-key
// router.use('/', verifyToken);
/*-------------------------------------------------------------------------*/

router.use("/", safe); //we dont need to verify for the login becouse we re finding the only one user with that username/email and password
router.use("/users", verifyToken, userRoutes); //verifyToken is checking if the token is the one that we need (for example  - password : "12345" ==> will generate a random token that will be valid only for the id we provided by searching for username and password is present in our database )
router.use("/posts", verifyToken, postRoutes);

export default router;
