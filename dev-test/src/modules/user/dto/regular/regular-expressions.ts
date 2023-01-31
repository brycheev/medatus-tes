export const IsPasswordValid =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const IsEmailValid = /^[^`'"]{1,63}@[a-zA-Z0-9-.]{1,191}[^`'"]{0,63}$/;
