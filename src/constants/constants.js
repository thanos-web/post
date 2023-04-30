export const Email_Pattern = {
  required: {
    value: true,
    message: 'Поле обязательно для ввода'
  },
  pattern: {
    message: 'Email в формате example@example.com',
    value: /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  }
}

export const Password_Pattern = {
  required: {
    value: true,
    message: 'Поле обязательно для ввода'
  },
  pattern: {
    message: 'Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру',
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  }
}

export const User_Pattern = {
  required: {
      value: true,
      message: 'Обязательное поле для ввода'
  },
}
export const User_Agreement = 'Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.'

export const Limit = 9

export const Required_Pattern = {
  required: {
      value: true,
      message: 'Обязательное поле для ввода'
  }
}