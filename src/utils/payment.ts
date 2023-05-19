import { VacancyType } from "../api/types";

export const payment = (vacancy: VacancyType): string => {
  let res = "";
  const { payment_from, payment_to, currency, agreement } = vacancy;

  if (payment_from !== 0 && payment_to !== 0) {
    res +=
      payment_from === payment_to
        ? `${payment_to} ${currency}`
        : `${payment_from} - ${payment_to} ${currency}`;
  }

  if (payment_from === 0 && payment_to === 0) {
    res += agreement ? `по договоренности` : `не указана`;
  }

  if (
    (payment_from === 0 && payment_to !== 0) ||
    (payment_from !== 0 && payment_to === 0)
  ) {
    if (payment_from === 0 && payment_to !== 0)
      res += `до ${payment_to} ${currency}`;
    if (payment_from !== 0 && payment_to === 0)
      res += `от ${payment_from} ${currency}`;
  }

  return res;
};
