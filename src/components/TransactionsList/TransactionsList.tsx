import { FC } from "react";
import { Transaction } from "../../types";
import {
  getBrazilianDate,
  getBrazilianValue,
  getTranslatedType,
} from "../../utils";

type TransactionsListProps = {
  transactions: Transaction[];
};

export const TransactionsList: FC<TransactionsListProps> = ({
  transactions,
}) => (
  <>
    <h1>Lista de transações</h1>

    <ol>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <span>{transaction.id} - </span>

          <span>{transaction.description} - </span>

          <span>{getTranslatedType(transaction.type)} - </span>

          <span>{getBrazilianDate(transaction.referenceDate)} - </span>

          <span>{getBrazilianValue(transaction.value)}</span>
        </li>
      ))}
    </ol>
  </>
);
