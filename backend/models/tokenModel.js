const mongoose = require("mongoose");
const crypto = require("crypto");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: +process.env.RESET_TOKEN_EXPIRES_IN,
  },
});

// Encrypt and hash the password
tokenSchema.methods.encryptToken = async function (resetToken) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(
    "aes-256-ctr",
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
    iv,
  );
  let encrypted = cipher.update(resetToken);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

// Decrypt and hash the password
tokenSchema.methods.decryptToken = async function (encryptedToken) {
  const decodedToken = decodeURIComponent(encryptedToken);
  let textParts = decodedToken.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
