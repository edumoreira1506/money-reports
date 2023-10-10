import { FC, useState } from "react";
import { format } from "date-fns";
import { Transaction } from "../../types";

type TransactionFormProps = {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
};

const currentDate = new Date();

export const TransactionForm: FC<TransactionFormProps> = ({ onSubmit }) => {
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState("");
  const [referenceDate, setReferenceDate] = useState(currentDate);

  const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type !== "credit" && type !== "debit")
      return window.alert("Tipo inválido");

    if (!value) return window.alert("Valor não pode ser vazio");

    if (!description) return window.alert("Descrição não pode ser vazio");

    if (!referenceDate) return window.alert("Data não pode ser vazio");

    if (referenceDate > new Date())
      return window.alert("Data não pode ser no futuro");

    onSubmit({
      description,
      type,
      value,
      referenceDate,
    });

    setValue(0);
    setType("");
    setDescription("");
    setReferenceDate(currentDate);
  };

  return (
    <form action="" onSubmit={validateForm}>
      <input
        type="number"
        value={value === 0 ? "" : value}
        onChange={(e) => setValue(Number(e.target.value))}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Selecionar...</option>
        <option value="credit">Crédito</option>
        <option value="debit">Débito</option>
      </select>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        cols={30}
        rows={10}
      />

      <input
        onChange={(e) =>
          setReferenceDate(new Date(`${e.target.value}T00:00:00`))
        }
        type="date"
        value={format(referenceDate, "yyyy-MM-dd")}
        max={format(currentDate, "yyyy-MM-dd")}
      />

      <button type="submit">Salvar</button>
    </form>
  );
};
