import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const privateKeyPath = path.join(__dirname, "../../certs/private.key");
const privateKey = fs.readFileSync(privateKeyPath);

const publicKeyPath = path.join(__dirname, "../../certs/public.key");
const publicKey = fs.readFileSync(publicKeyPath);
const encryptionAlgorithm = "RS256";

import { JwtUserInfo } from "../types/interfaces";

const tokenService = {
  decryptToken: (token: string): JwtUserInfo => {
    try {
      const decoded = jwt.verify(token, publicKey, {
        algorithms: [encryptionAlgorithm],
      });
      return decoded as JwtUserInfo;
    } catch (err) {
      throw err;
    }
  },

  generateToken: (userInfo: JwtUserInfo): string => {
    try {
      const token = jwt.sign(userInfo, privateKey, {
        algorithm: encryptionAlgorithm,
        expiresIn: "7 days",
      });

      return token;
    } catch (err) {
      throw err;
    }
  },
};

export default tokenService;
