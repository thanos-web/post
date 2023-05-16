export const baseUrl = 'https://api.react-learning.ru';

export const Email_Pattern = {
  required: {
    value: true,
    message: 'Обязательное поле'
  },
  pattern: {
    message: 'Email не соотвествует формату электронной почты',
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  }
}

export const Password_Pattern = {
  required: {
    value: true,
    message: 'Обязательное поле'
  },
  pattern: {
    message: 'Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру',
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  }
}

export const User_Pattern = {
  required: {
      value: true,
      message: 'Обязательное поле'
  },
}
export const User_Agreement = 'Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.'

export const Limit = 12

export const Required_Pattern = {
  required: {
      value: true,
      message: 'Обязательное поле'
  }
}