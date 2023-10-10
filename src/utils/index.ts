import { format } from "date-fns";

export const getTranslatedType = (transactionType: string) =>
  transactionType === "credit" ? "Crédito" : "Débito";

export const getBrazilianDate = (rawDate: Date) =>
  format(rawDate, "dd/MM/yyyy");

export const getAmericanDate = (rawDate: Date) => format(rawDate, "yyyy-MM-dd");

export const getBrazilianValue = (numberValue: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);

export const getDateFromString = (rawString: string) =>
  new Date(`${rawString}T00:00:00`);
