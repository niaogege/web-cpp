const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

const secret = crypto.createHmac("sha256", "abcdefg").update("").digest("hex");

const payload = {
  username: "cpp",
  password: 123456,
  iat: Date.now(),
};
const token = jwt.sign(payload, secret);
const res = jwt.verify(token, secret);

console.log(token, "token");

console.log(res, "res");
