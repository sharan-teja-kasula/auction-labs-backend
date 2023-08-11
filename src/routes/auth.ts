import express, { Request, Response } from "express";
import validator from "validator";

import otpService from "../services/otp";
import userController from "../controllers/user";

import constants from "../constants";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || !validator.isEmail(email))
      return res.status(422).send({ msg: "Invalid email!" });

    if (typeof password !== "string" || password?.length < 8)
      return res.status(422).send({ msg: "Minimum password length is 8!" });

    const { user, token } = await userController.verifyUserPassword(
      email,
      password,
      true
    );

    if (!user)
      return res.status(422).send({ msg: "Incorrect email or password!" });

    res.status(200).send({ data: user, token });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.post("/otp/:requestType", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { requestType } = req.params;

    if (typeof email !== "string" || !validator.isEmail(email))
      return res.status(422).send({ msg: "Invalid email!" });

    const user = await userController.checkEmail(email);

    const { REQUEST_TYPES } = constants.OTP_CONSTS;
    const { ALL_VALUES, FORGOT_PASSWORD, REGISTER } = REQUEST_TYPES;

    if (!ALL_VALUES.includes(requestType))
      return res.status(422).send({ msg: "Invalid request type!" });

    if (requestType === FORGOT_PASSWORD && !user)
      return res.status(422).send({ msg: "Email not registered yet!" });

    if (requestType === REGISTER && user)
      return res.status(422).send({ msg: "Email already registered!" });

    await otpService.sendOTP(email, requestType);
    res.status(200).send({ msg: "OTP sent successfully!" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { displayName, email, password, otp } = req.body;
    const { REQUEST_TYPES } = constants.OTP_CONSTS;
    const { REGISTER } = REQUEST_TYPES;

    if (typeof displayName !== "string" || displayName?.length <= 3)
      return res.status(422).send({ msg: "Name minimum length is 4!" });

    if (typeof email !== "string" || !validator.isEmail(email))
      return res.status(422).send({ msg: "Invalid email!" });

    if (typeof password !== "string" || password?.length < 8)
      return res.status(422).send({ msg: "Minimum password length is 8!" });

    if (typeof otp !== "string")
      return res.status(422).send({ msg: "Invalid OTP!" });

    if (!otpService.checkOTP(email, REGISTER, otp))
      return res.status(422).send({ msg: "Invalid or expired OTP!" });

    const user = await userController.checkEmail(email);
    if (user) return res.status(422).send({ msg: "User already exists!" });

    const response = await userController.save(displayName, email, password);
    if (!response)
      return res.status(422).send({ msg: "Something went wrong!" });

    otpService.deleteOTP(email, REGISTER);

    res.status(200).send({ msg: "User successfully registered!" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.post("/forgotpassword", async (req: Request, res: Response) => {
  try {
    const { email, password, otp } = req.body;
    const { REQUEST_TYPES } = constants.OTP_CONSTS;
    const { FORGOT_PASSWORD } = REQUEST_TYPES;

    if (typeof email !== "string" || !validator.isEmail(email))
      return res.status(422).send({ msg: "Invalid email!" });

    if (typeof password !== "string" || password?.length < 8)
      return res.status(422).send({ msg: "Minimum password length is 8!" });

    if (typeof otp !== "string")
      return res.status(422).send({ msg: "Invalid OTP!" });

    if (!otpService.checkOTP(email, FORGOT_PASSWORD, otp))
      return res.status(422).send({ msg: "Invalid or expired OTP!" });

    const user = await userController.checkEmail(email);
    if (!user)
      return res.status(422).send({ msg: "Email not registered yet!" });

    const response = await userController.updatePassword(email, password);
    otpService.deleteOTP(email, FORGOT_PASSWORD);

    if (!response)
      return res.status(422).send({ msg: "Unable to update password!" });

    res.status(200).send({ msg: "Password updated successfully!" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

export default router;
