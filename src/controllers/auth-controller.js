const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/user-service")

exports.register = async (req, res, next) => {
  try {
      const { email, password } = req.body;

      // Logic
      //check email or password has received
      //check type of email and password are string?
      //check email unique
      //hashed password
      //get hashed in database
  
      if(!email || !password) {
          return createError(400, 'Email and password required');
      }
  
      if(typeof email !== 'string' || typeof password !== 'string') {
          return createError(400, 'Email or password is invalid');
      }
  
      const isUserExist = await userService.getUserByEmail(email);
    
      if(isUserExist) {
          return createError(400, 'User already exist');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await userService.createUser(email, hashedPassword);
  
      res.json({ email, password });
  } catch (err) {
      next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
      const { email, password } = req.body;

      //Logic
      //receive email and password
      //check email and password have already in database
      //check password is match
      //send token

      if(!email || !password) {
          return createError(400, 'Email or password is invalid');
      }

      if(typeof email !== 'string' || typeof password !== 'string') {
          return createError(400, 'Email or password is invalid');
      }
      
      const isUserExist = await userService.getUserByEmail(email);

      if(!isUserExist) {
          return createError(400, 'Email or password is invalid');
      }

      const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);

      if(!isPasswordMatch) {
          return createError(400, 'Email or password is invalid');
      }

      const token = jwt.sign({id: isUserExist.id}, process.env.JWT_SECRET, 
          {expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.json({ token });
  } catch  (err) {
      next(err);
  }
};

exports.forgetPassword = (req, res, next) => {
  const { email } = req.body;
  // gen token -> สร้าง link -> ส่ง email
  res.json({ email });
};
// https://api.codecamp.com/auth/forget-password/kdjfkdjfkdjkfjd
exports.verifyForgetPassword = (req, res, next) => {
  const { token } = req.params;
  // logic check token
  // redirect reset password -> ติด token
  res.json({ token });
};

exports.resetPassword = (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  // check token
  // เปลี่ยน Password
  // เก็บ password ใหม่ ลง db
  res.json({ token, password });
};
