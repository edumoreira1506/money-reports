import { useState } from "react";
import { format } from "date-fns";

export function TransactionForm() {
  const [value, setValue] = useState<number>();
  const [type, setType] = useState<string>();
  const [description, setDescription] = useState("");
  const [referenceDate, setReferenceDate] = useState(new Date());

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Salvando transação");

    console.log({
      description,
      type,
      value,
      referenceDate,
    });
  };

  return (
    <form action="" onSubmit={onSubmit}>
      <input
        type="number"
        value={value}
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
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
