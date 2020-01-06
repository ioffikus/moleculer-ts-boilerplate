export const INVALID_TOKEN = {
  type: 'E_INVALID_TOKEN',
  code: 403,
  message: 'Не валидный или просроченный токен',
};

export const NOT_GRANTED = {
  type: 'E_NOT_GRANTED',
  code: 403,
  message: 'Недостаточно прав для доступа к ресурсу',
};
