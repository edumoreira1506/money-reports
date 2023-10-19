import {
  Button,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
} from "@radix-ui/themes";
import { TransactionForm } from "../TransactionForm";
import { Transaction } from "../../types";
import { FC } from "react";

type FormModalProps = {
  onCreateTransaction: (transaction: Omit<Transaction, "id">) => void;
};

export const FormModal: FC<FormModalProps> = ({ onCreateTransaction }) => {
  return (
    <DialogRoot>
      <DialogTrigger>
        <Button>Nova Transação</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-3 bottom-0 fixed">
        <Flex justify={"between"}>
          <DialogTitle className=" flex">Nova Transação</DialogTitle>

          <DialogClose>
            <Button variant="ghost" color="gray">
              X
            </Button>
          </DialogClose>
        </Flex>

        <TransactionForm onSubmit={onCreateTransaction} />
      </DialogContent>
    </DialogRoot>
  );
};
