import { FC, useState } from "react";
import { Transaction } from "../../types";
import {
  getAmericanDate,
  getDateFromString,
  getTranslatedType,
  showErrorMessage,
} from "../../utils";
import {
  Button,
  Select,
  Text,
  TextArea,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";

import "./TransactionForm.css";

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
      return showErrorMessage("Tipo inválido");

    if (!value) return showErrorMessage("Valor não pode ser vazio");

    if (!description) return showErrorMessage("Descrição não pode ser vazio");

    if (!referenceDate) return showErrorMessage("Data não pode ser vazio");

    if (referenceDate > new Date())
      return showErrorMessage("Data não pode ser no futuro");

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
    <form action="" onSubmit={validateForm} className="flex flex-col gap-3">
      <Text>Nova transação</Text>

      <TextArea
        required
        placeholder="Descrição da transação"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
      />

      <TextFieldInput
        required
        type="number"
        value={value === 0 ? "" : value}
        onChange={(e) => setValue(Number(e.target.value))}
        name="value"
        placeholder="Valor da transação"
      />

      <Select.Root
        required
        defaultValue=""
        name="type"
        value={type}
        onValueChange={(newType) => setType(newType)}
      >
        <Select.Trigger placeholder="Tipo da transação" />

        <Select.Content>
          <Select.Item value="credit">
            {getTranslatedType("credit")}
          </Select.Item>
          <Select.Item value="debit">{getTranslatedType("debit")}</Select.Item>
        </Select.Content>
      </Select.Root>

      <TextFieldRoot>
        <input
          required
          className="-translate-x-1 input-date rt-TextFieldInput rt-r-size-2 rt-variant-surface"
          name="referenceDate"
          onChange={(e) => setReferenceDate(getDateFromString(e.target.value))}
          type="date"
          value={getAmericanDate(referenceDate)}
          max={getAmericanDate(currentDate)}
        />

        <div className="rt-TextFieldChrome" />
      </TextFieldRoot>

      <Button type="submit">Salvar</Button>
    </form>
  );
};
