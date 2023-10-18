import { useCallback, useState } from "react";
import { TransactionsList } from "../TransactionsList";
import { Transaction } from "../../types";
import { FormModal } from "../FormModal";

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
    <div className="p-6 flex flex-col gap-6">
      <FormModal onCreateTransaction={onCreateTransaction} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}
