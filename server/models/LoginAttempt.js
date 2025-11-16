import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  blockedUntil: { type: Date, default: null },
  lastAttemptAt: { type: Date, default: Date.now },
});
const LoginAttempt = mongoose.model("LoginAttempt", loginAttemptSchema);
export default LoginAttempt;
