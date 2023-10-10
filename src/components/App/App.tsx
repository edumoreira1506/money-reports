import { useCallback, useState } from "react";
import { TransactionForm } from "../TransactionForm";
import { TransactionsList } from "../TransactionsList";
import { Transaction } from "../../types";

export function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const onCreateTransaction = useCallback(
    (newTransaction: Omit<Transaction, "id">) => {
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        {
          ...newTransaction,
          id: prevTransactions.length.toString(),
        },
      ]);
    },
    []
  );

  return (
    <>
      <TransactionForm onSubmit={onCreateTransaction} />
      <TransactionsList transactions={transactions} />
    </>
  );
}
