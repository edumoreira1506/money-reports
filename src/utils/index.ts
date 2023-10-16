import { format } from "date-fns";
import { toast } from "react-toastify";

export const getTranslatedType = (transactionType: string) =>
  transactionType === "credit" ? "Crédito" : "Débito";

export const getBrazilianDate = (rawDate: Date) =>
  format(rawDate, "dd/MM/yyyy");

export const getAmericanDate = (rawDate: Date) => {
  try {
    return format(rawDate, "yyyy-MM-dd");
  } catch {
    console.error("Error parsing date", rawDate);

    return undefined;
  }
};

export const getBrazilianValue = (numberValue: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);

export const getDateFromString = (rawString: string) =>
  new Date(`${rawString}T00:00:00`);

export const showErrorMessage = (errorMessage: string) =>
  toast.error(errorMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
