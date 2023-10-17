import { FC } from "react";
import { Transaction } from "../../types";
import { getBrazilianDate, getBrazilianValue } from "../../utils";
import { Card, Text } from "@radix-ui/themes";

export const TransactionDetail: FC<Transaction> = ({
  description,
  type,
  referenceDate,
  value,
}) => {
  const isDebit = type === "debit";
  const textColorClass = isDebit ? "text-red-600" : "text-emerald-600";

  return (
    <Card className="p-2 !bg-[#29292E]">
      <Text className="block text-zinc-400">{description}</Text>
      <Text className={`block !mt-1 text-xl font-bold ${textColorClass}`}>
        {isDebit && "- "}
        {getBrazilianValue(value)}
      </Text>
      <Text className="block !mt-3 w-full text-right text-zinc-400">
        {getBrazilianDate(referenceDate)}
      </Text>
    </Card>
  );
};
