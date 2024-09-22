const validateEmail = function (email) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const errorMessage = "Invalid Email";
  return { isValid, errorMessage };
};

const validatePassword = function (password) {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let errorMessage = "";
  if (!hasMinLength) errorMessage += "8+ ch, ";
  if (!hasUpperCase) errorMessage += "1 cap, ";
  if (!hasLowerCase) errorMessage += "1 small, ";
  if (!hasNumber) errorMessage += "1 num,";
  if (!hasSpecialChar) errorMessage += "1 special ch";

  const isValid =
    hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  return {
    isValid,
    errorMessage: isValid ? "" : errorMessage.trim().replace(/,\s*$/, ""), // Removes trailing comma and space
  };
};

const validateRepeatPassword = function (value, values) {
  const isValid = value === values.password;
  const errorMessage = "Passwords donot match";
  return { isValid, errorMessage };
};

const validateUserName = function (username) {
  const isValid = username.length > 0;
  const errorMessage = "Username cannot be empty";
  return { isValid, errorMessage };
};

export {
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  validateUserName,
};
