type TFormValidators = {
  websiteRegex: RegExp
  onlyLettersRegex: RegExp
  emailRegex: RegExp
}

export const formRegex = {
  name: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,29}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}
