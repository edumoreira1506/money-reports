import { FC } from "react";
import { Transaction } from "../../types";
import { TransactionDetail } from "../TransactionDetail";

type TransactionsListProps = {
  transactions: Transaction[];
};

export const TransactionsList: FC<TransactionsListProps> = ({
  transactions,
}) => (
  <>
    <h1>Lista de transações</h1>

    <ol className="flex flex-col gap-3">
      {transactions
        .sort((a, b) => b.referenceDate.getTime() - a.referenceDate.getTime())
        .map((transaction) => (
          <li key={transaction.id}>
            <TransactionDetail
              value={transaction.value}
              type={transaction.type}
              referenceDate={transaction.referenceDate}
              id={transaction.id}
              description={transaction.description}
            />
          </li>
        ))}
    </ol>
  </>
);
