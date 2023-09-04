const Joi = require("@hapi/joi");

const registerValidation = async (data) => {
  const Schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(10).required(),
  });
  return Schema.validate(data);
};

const loginValidation = async (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(10).required(),
  });
  return Schema.validate(data)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
