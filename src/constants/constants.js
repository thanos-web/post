export const AVATAR_ASTRONR = 'https://avatars.githubusercontent.com/u/71390642?v=4'
export const AVATAR_NATALIFISH = 'https://avatars.githubusercontent.com/u/117448872?v=4'

export const AVATAR_THANOSWEB = 'https://avatars.githubusercontent.com/u/56111364?v=4'
export const AVATAR_EKIDVU = 'https://avatars.githubusercontent.com/u/117511273?v=4'
export const baseURL = 'https://api.react-learning.ru';

export const emailPattern = {
    required: {
        value: true,
        message: 'Поле для ввода обязательно'
    },
    pattern: {
        message: 'Email в формате expamle@example.ru',
        value: /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    }
}
export const passwordPattern = {
    required: {
        value: true,
        message: 'Поле для ввода обязательно'
    },
    pattern: {
        message: 'Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру',
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    }
}

export const userAgreement = 'Регистрируясь на сайте, вы соглашаетесь с Правилами сайта, Политикой конфиденциальности и соглашаетесь на информационную рассылку.'