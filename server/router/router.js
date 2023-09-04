const router = require("express").Router();
const UserSchema = require("../model/userSchema");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../env");

//register for post
router.post("/register", async (req, res) => {
  //validation before getting the data from user
  const { error } = await registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  //Checking the mail is already exist
  const email = await UserSchema.findOne({ email: req.body.email });
  if (email) return res.status(400).json("Mail is already exists");

  //Changing the normal password into hashed
  const Salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, Salt);

  const User = new UserSchema({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await User.save();
    res.status(200).json(User);
  } catch (err) {
    res.status(401).json({ Error: err });
  }
});

router.get("/data", async (req, res) => {
  try {
    const User = await UserSchema.find();
    res.status(200).json(User);
  } catch (err) {
    res.status(400).json("Not found any data");
  }
});

router.post("/login", async (req, res) => {
  //check the email is registered
  const { error } = await loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  //checking the email is exists
  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Email is not found");

    //compare the password
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json("password or email is wrong");

    //    return res.status(200).json("successfully login ")
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
    res.header("auth-token", token).send(token);
    console.log(token);
  } catch (err) {
    res.status(401).json("Some Internal error", err);
  }
});


router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserSchema.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    // Generate a random OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
  
    // Store the OTP and its expiration time in the user's record
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 600000; // OTP expires in 10 minutes
  

  
    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Your SMTP server's hostname
      port: 465, // Port number (usually 587 for TLS or 465 for SSL)
      secure: true, // Set to true if using SSL
      auth: {
        user: EMAIL, // Use the provided email
        pass: PASSWORD, // Use the provided password
      },
    });

    const mailOptions = {
      
      to: user.email,
      from: "your-email@example.com",
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:5173/reset-password/${token}\n\n
        If you did not request this, please ignore this email, and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send reset email." });
      } else {
        res.status(200).json({ message: "Password reset email sent." });
      }
    });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Failed to reset password." });
  }
});

// Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
  try {
    const newPassword = req.body.password; // Get the new password from the request body

    const user = await UserSchema.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset link is invalid or has expired." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Failed to reset password." });
  }
});

// router.post('/reset-password', async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const user = await UserSchema.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: 'User not found.' });
//   }

//   // Verify OTP and expiration time
//   if (user.resetPasswordOTP !== otp || user.resetPasswordExpires < Date.now()) {
//     return res.status(400).json({ message: 'Invalid or expired OTP.' });
//   }

//   // Update the user's password
//   const salt = crypto.randomBytes(16).toString('hex');
//   const hashedPassword = crypto
//     .pbkdf2Sync(newPassword, salt, 1000, 64, 'sha512')
//     .toString('hex');

//   user.password = hashedPassword;
//   user.resetPasswordOTP = null;
//   user.resetPasswordExpires = null;

//   await user.save();

//   res.status(200).json({ message: 'Password reset successfully.' });
// });

router.get("/reset-password/:token", async (req, res) => {
  try {
    await UserSchema.find();
    res.status(200).json(UserSchema);
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});

module.exports = router;
