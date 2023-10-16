import { FC, forwardRef } from "react";
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
import { Controller, Noop, useForm } from "react-hook-form";

import "./TransactionForm.css";
import { SelectRootProps } from "@radix-ui/themes/dist/cjs/components/select";

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
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm<TransactionWithNullableValue>({
    defaultValues,
    mode: "all",
  });

  const validateForm = (newTransaction: TransactionWithNullableValue) => {
    const errorsValues = Object.values(errors);

    if (errorsValues.length) {
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
      <Text>Nova transação</Text>

      <TextArea
        placeholder="Descrição da transação"
        {...register("description", { required: true })}
        className={
          errors.description ? "textarea-description-error" : undefined
        }
      />

      <TextFieldInput
        placeholder="Valor da transação"
        type="number"
        {...register("value", { required: true, valueAsNumber: true })}
        className={errors.value ? "!border-rose-600" : undefined}
      />

      <Controller
        name="type"
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <SelectItem
            ref={field.ref}
            onValueChange={field.onChange}
            value={field.value}
            hasError={Boolean(errors.type)}
            onBlur={field.onBlur}
          />
        )}
      />

      <Controller
        name="referenceDate"
        rules={{ required: true }}
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

      <Button type="submit">Salvar</Button>
    </form>
  );
};

const SelectItem = forwardRef<
  HTMLButtonElement,
  SelectRootProps & {
    hasError: boolean;
    onBlur: Noop;
  }
>(({ value, onValueChange, hasError, onBlur }, ref) => (
  <Select.Root value={value} onValueChange={onValueChange} name="type">
    <Select.Trigger
      placeholder="Tipo da transação"
      ref={ref}
      onBlur={onBlur}
      className={hasError ? "select-type-error" : undefined}
    />

    <Select.Content>
      <Select.Item value="credit">{getTranslatedType("credit")}</Select.Item>
      <Select.Item value="debit">{getTranslatedType("debit")}</Select.Item>
    </Select.Content>
  </Select.Root>
));
