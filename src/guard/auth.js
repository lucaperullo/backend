import jwt from "jsonwebtoken";
import express from "express";
import UserModel from "../database/mongo/models/UserModel.js";
import { asyncHandler } from "../core/asyncHandler.js";
import passport from "passport";

import pdf from "html-pdf";
const safe = express.Router();
safe.get(
  "/:id/pdf",
  asyncHandler(async (req, res, next) => {
    const user = await UserModel.findById(req.params.id);
    const html = `<div><h1 style="text-align:center; color:#0073b1">Linkedin</h1>
        <div style="display:flex; justify-content:center; background-color: #3689d1;padding:100px;
        background-image: url("https://www.transparenttextures.com/patterns/connected.png")">
    
        <div >
          <h1>CV</h1>
        <div style="display:flex">
          <img style="margin-right:10px; border-radius:50%" heigth=100 src=${user.image}/> <p>${user.area}</>
        </div>
          <h2>${user.name} ${user.surname}</h2>
          <hr />
          <br>
          <h4 class="head">Experiences :</h4>
          <ul style="list-style:none">
            <li>${user.experiences}</li>
    
          </ul>
          <h4>About me : </h4>
          <p>${user.bio}</p>
    
        </div>
        <div ></div>
        <div >
    
        </div>
              </div>`;
    const options = { format: "Letter" };
    res.setHeader("Content-Disposition", "attachment; filename=cv.pdf");
    res.set("Content-Type", "application/pdf");
    pdf.create(html, options).toStream(function (err, stream) {
      if (err) {
        console.log(err);
      }
      stream.pipe(res);
    });
  })
);

safe.post(
  "/register", //creating a new user
  asyncHandler(async (req, res, next) => {
    const newUser = await UserModel.create(req.body);
    if (newUser) {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      const access_token = await jwt.sign(
        { sub: newUser._id },
        process.env.JWT_ACCESS_TOKEN
      );
      res.status(201).send({
        message: `User created with this ID => ${newUser._id}`,
        access_token: `${access_token}`,
      });
    }
  })
);
safe.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    console.log({ user: req.body.username, pw: req.body.password });

    // const check = await UserModel.find({ password: password });
    // const check1 = await UserModel.find({ email: email });
    // const check2 = await UserModel.find({ username: username });
    // const user = (check1 || check2) && check;

    const user = await UserModel.find({
      $and: [
        {
          $or: [{ username: req.body.username }, { email: req.body.username }],
        },
        { password: req.body.password },
      ],
    });
    if (user.length === 1) {
      const access_token = await jwt.sign(
        { sub: user },
        process.env.JWT_ACCESS_TOKEN
      );
      return res.json({
        status: true,
        message: "login success",
        data: { access_token },
      });
    } else {
      res.status(404).send("User not found");
    }
  })
);

safe.get(
  "/google/auth",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
safe.get(
  "/googleRedirect",
  passport.authenticate("google"),
  asyncHandler(async (req, res, next) => {
    try {
      // res.send(req.user.tokens)
      // res.cookie("accessToken", req.user.tokens.accessToken, { sameSite: "lax", httpOnly: true })

      // // LOCAL ENVIRONMENT --> sameSite:"lax", PRODUCTION ENVIRONMENT (with 2 different domains) --> sameSite:"none", secure: true
      // res.cookie("refreshToken", req.user.tokens.refreshToken, { sameSite: "lax", httpOnly: true })
      res.status(200).redirect("http://localhost:3000");
    } catch (error) {
      next(error);
    }
  })
);

export default safe;
