import { FC } from "react";
import { Transaction } from "../../types";
import { format } from "date-fns";

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

          <span>{transaction.type === "credit" ? "Crédito" : "Débito"} - </span>

          <span>{format(transaction.referenceDate, "dd/MM/yyyy")} - </span>

          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(transaction.value)}
          </span>
        </li>
      ))}
    </ol>
  </>
);
