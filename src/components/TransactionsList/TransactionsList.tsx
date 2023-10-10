import { FC } from "react";
import { Transaction } from "../../types";

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
          {transaction.id} - {transaction.description}
        </li>
      ))}
    </ol>
  </>
);
