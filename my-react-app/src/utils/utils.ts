export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
  if (!email) {
    return "Email cannot be empty.";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Password cannot be empty.";
  } 
  // else if (password.length < 8) {
  //   return "Password must be at least 8 characters long.";
  // }
  return "";
};