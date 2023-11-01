import { FC } from "react";
import { Transaction } from "../../types";
import {
  getAmericanDate,
  getDateFromString,
  getTranslatedType,
  showErrorMessage,
} from "../../utils";
import {
  Button,
  DialogClose,
  Flex,
  TextArea,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import "./TransactionForm.css";

type TransactionWithNullableValue = Omit<Transaction, "id" | "value"> & {
  value: number | null;
};

type TransactionFormProps = {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
};

const currentDate = new Date();

const defaultValues = {
  description: "",
  type: "",
  referenceDate: currentDate,
  value: null,
};

export const TransactionForm: FC<TransactionFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    getValues,
    reset,
  } = useForm<TransactionWithNullableValue>({
    defaultValues,
    mode: "all",
  });

  const errorsValues = Object.values(errors);

  const formError = Boolean(errorsValues.length);

  const validateForm = (newTransaction: TransactionWithNullableValue) => {
    if (formError) {
      return showErrorMessage(errorsValues.map((e) => e.message).join(". "));
    }

    reset(defaultValues);
    onSubmit({ ...newTransaction, value: Number(newTransaction.value) });
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(validateForm)}
      className="flex flex-col gap-3"
    >
      <TextArea
        placeholder="Descrição da transação"
        {...register("description", { required: "Descrição é obrigatório" })}
        className={
          errors.description ? "textarea-description-error" : undefined
        }
      />

      <TextFieldInput
        placeholder="Valor da transação"
        type="number"
        {...register("value", {
          required: "Valor é obrigatório",
          valueAsNumber: true,
        })}
        className={errors.value ? "!border-rose-600" : undefined}
      />

      <Controller
        name="type"
        rules={{ required: "Tipo é obrigatório" }}
        control={control}
        render={({ field }) => {
          const isCredit = field.value === "credit";
          const isDebit = field.value === "debit";
          return (
            <Flex onBlur={field.onBlur} gap="1" ref={field.ref}>
              <Button
                type="button"
                onClick={() => field.onChange("credit")}
                className={`grow ${
                  isCredit ? "!bg-green-600" : "!bg-zinc-800"
                }`}
              >
                <ArrowUpIcon color={isCredit ? "white" : "green"} />
                {getTranslatedType("credit")}
              </Button>

              <Button
                type="button"
                onClick={() => field.onChange("debit")}
                className={`grow ${isDebit ? "!bg-red-600" : "!bg-zinc-800"}`}
              >
                <ArrowDownIcon color={isDebit ? "white" : "red"} />
                {getTranslatedType("debit")}
              </Button>
            </Flex>
          );
        }}
      />

      <Controller
        name="referenceDate"
        rules={{ required: "Data é obrigatório" }}
        control={control}
        render={({ field }) => (
          <TextFieldRoot>
            <input
              {...field}
              className={`input-date rt-TextFieldInput rt-r-size-2 rt-variant-surface ${
                errors.referenceDate ? "!border-rose-600" : ""
              }`}
              type="date"
              max={getAmericanDate(currentDate)}
              value={
                getValues().referenceDate
                  ? getAmericanDate(getValues().referenceDate)
                  : ""
              }
              onChange={(e) => {
                const date = getDateFromString(e.target.value);
                const isInvalidDate = date.toString() === "Invalid Date";

                if (isInvalidDate) {
                  field.onChange("");
                } else {
                  field.onChange(date);
                }
              }}
            />

            <div className="rt-TextFieldChrome" />
          </TextFieldRoot>
        )}
      />

      <DialogClose className=" h-6" disabled={formError || !isValid}>
        <Button type="submit">Cadastrar</Button>
      </DialogClose>
    </form>
  );
};
